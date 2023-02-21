import React from 'react';
import { useCallback, useEffect } from 'react'
import logo from './images/celo_logo.png';
import symbol from './images/celo_symbol.png';
import './App.css';
//import { PieChart } from "react-minimal-pie-chart";
import { ResponsiveSunburst } from '@nivo/sunburst'
import Table from './components/Table';
import Modal from 'react-modal';
import { useCelo } from '@celo/react-celo';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {
  GOVERNANCE_ADDRESS,
  CC_ADDRESS,
  OCELOT_ADDRESS,
  COMMUNITY_APPRECIATION_GIFTS_ADDRESS,
  REPL_RATE,
  available_funds_color,
  allocated_funds_color,
  pending_funds_color,
  getFundData,
  getDraftsData } from './utils/data';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const chartData = {
  "name": "Celo Community Fund",
  "color": "hsl(325, 70%, 50%)",
  "children": [
    {
      "name": "Contract Balance",
      "color": "hsl(243, 70%, 50%)",
      "children": [

      ]
    },
    {
      "name": "Contract Utilized ",
      "color": "hsl(98, 70%, 50%)",
      "children": [
      ]
    },]
  }

  
//Populate with spent funds
// {
//   "name": "rgb",
//   "color": "hsl(322, 70%, 50%)",
//   "loc": 54596
// },




function App() {
  const { kit } = useCelo();
  const [table, setTable] = React.useState([])
  const [data, setData] = React.useState([])
  //const [communityFund, setCommunityFund] = React.useState(0)
  const [communityFundCelo, setCommunityFundCelo] = React.useState(0)
  //const [communityFundEur, setCommunityFundEur] = React.useState(0)
  //const [communityFundEurInCelo, setCommunityFundEurInCelo] = React.useState(0)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  let fundData = getFundData();
  let draftsData = getDraftsData();
 
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Approved',
        accessor: 'approved',
        Cell: ({row, value}) => (row.original.draft) ? <span style={{color:'#E70532'}}>{row.original.approved}</span> : <span>{value}</span>, 
      },
      {
        Header: 'Available',
        accessor: 'available',
      },
      {
        Header: 'Proposal',
        accessor: 'proposal',
        Cell: props => <a href={props.value}>Link</a>
      },
    ],
    []
  )


  const populateData = useCallback(async () => {
    let celo = await kit.contracts.getGoldToken()
    let populatedData = [];
    let tableData = [];

    //Community Fund CELO and cEUR
    let community_fund = await celo.balanceOf(GOVERNANCE_ADDRESS)
    let community_fund_celo_result = getCeloValue(community_fund.c[0])
    setCommunityFundCelo(community_fund_celo_result)



    fundData.forEach( async(fund) => {
      let initative_available = 0 
      //Update Commmunity Fund CELO Available
      if(fund.title === 'Community Fund'){
        fund.available = community_fund_celo_result - initative_available
        console.log('fund.available', fund.available)
      }else if(fund.title !== 'Drafts'){
      let allowance_available = await celo.allowance(GOVERNANCE_ADDRESS, fund.address)
      fund.available = getCeloValue(allowance_available.c[0])
      fund.used = fund.approved - fund.available
    }else if(fund.title === 'Drafts'){
      fund.available = fund.amount
    }

    //Add available funds to chart
    if(chartData.children[0].children.find((child) => child.name === fund.title) === undefined){
      chartData.children[0].children.push({ name: fund.title, loc: fund.available })
      initative_available = initative_available + fund.available
      }
      //Add utilized funds to chart
      if(chartData.children[1].children.find((child) => child.name === fund.title) === undefined){
      chartData.children[1].children.push({ name: fund.title, loc: fund.used })
      }


    console.log('chartData', chartData)
    if(fund.title !== 'Drafts'){
      tableData.push({ name: fund.title, approved: fund.approved, available: fund.amount, proposal: fund.proposal })
    }
    })




    
    setData(populatedData)
    setTable(tableData)
  } , []);



  useEffect(() => {
    populateData()
    let interval = setInterval(() => {
    populateData()
  }, 10000);
  return () => clearInterval(interval);
  }, []);



  function getCeloValue(amount){
    return Math.round(amount / 10**4)
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal'>
          <button onClick={closeModal}><CloseIcon/></button>
          <h2 className='modal-title'>Celo Community Fund</h2>
          
          <div>
            <p>The Community Fund provides for general upkeep of the Celo platform. CELO holders decide how to allocate these funds through governance proposals. Funds might be used to pay bounties for bugs or vulnerabilities, security audits, or grants for protocol development.</p>
            <p> The Community Fund receives assets from three sources:</p>
            <ul>
              <li>The Community Fund obtains a desired epoch reward defined as a fraction of the total desired epoch rewards (governable, initially planned to be 25%). This amount is subject to adjustment up or down in the event of under- or over-spending against the epoch rewards target schedule. The Community Fund epoch rewards may be redirected to bolster the Reserve.</li>
              <li>The Community Fund is the default destination for slashed assets.</li>
              <li>The Community Fund also receives the 'base' portion of transaction fees.</li>
            </ul>
          </div>

          <div>
            <hr/>
            <h3>Est Replenish Rate: ~{REPL_RATE.toLocaleString()} CELO daily</h3>
            <hr/>
            <p>* All values below in CELO</p>

          </div>
        <div className="modal-table">
        <Table columns={columns} data={table}/>
        </div>  
        </div>

      </Modal>
      <header className="App-header">
      

      <div >
        <img className='celo-logo' src={logo} alt="Celo" />
        <button className='info' onClick={openModal}><InfoIcon  /></button>
      </div>
      <div className="App-header">
      <h3 >Community Fund Status</h3>
      
      {/* <h4  ><p className='amount-disclaimer'>(Combined total in cUSD)</p>{parseInt(communityFund).toLocaleString() +  ' '} <span><img className='symbol' alt="Celo cUSD Symbol" src={cusd}></img></span><hr/></h4>  */}
      {/* add below for cEUR -  <span> | </span>{'  ' + communityFundEur.toLocaleString() + ' '}  <span><img className='symbol' alt="Celo cEUR Symbol" src={ceur}></img></span> */}
      <h4  >{communityFundCelo.toLocaleString() +  '  '}<span><img className='symbol' alt="Celo Currency Symbol" src={symbol}></img></span></h4> 
      <a href='https://explorer.celo.org/mainnet/address/0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972' target='_blank' className='tooltip'><span class="tooltiptext">View Governance Contract</span>
      <div className='pie-chart'>
      <div style={{ height: '50vh',width: '100%', color: 'black', textAlign:'center' }}>
        <ResponsiveSunburst
        data={chartData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{ theme: 'background' }}
        colors={{ scheme: 'nivo' }}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.1
                ]
            ]
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.4
                ]
            ]
        }}
    />
    </div>
      </div>
      </a>
      </div>
      <div className='legend'>
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundColor: allocated_funds_color }} />
              <td>Intiative Assets Available</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: pending_funds_color }} />
              <td>Draft Proposals Assets</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: available_funds_color }} />
              <td>Fund Assets Available</td>
            </tr>

          </tbody>
        </table>
      </div>
      <div  className='footer-container' >
        {/* Add your footer link here */}
        <a className='footer' href="https://www.web3socialcapital.xyz" >Made with <span role="img">❤️</span> by <span className='w3text'>w3sc</span> </a>
        <p className='donate'>If you find this valuable please support us by voting for the validator group - <a className='TPT' href='https://www.thecelo.com/groupDetail/thepassivetrust'>The Passive Trust</a></p>
      </div>


      </header>
    </div>
  );
}

export default App;
