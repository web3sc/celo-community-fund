import React from 'react';
import { useCallback, useEffect } from 'react'
import logo from './images/celo_logo.png';
import symbol from './images/celo_symbol.png';
import './App.css';
import { ResponsiveSunburst } from '@nivo/sunburst'
import Table from './components/Table';
import Modal from 'react-modal';
import { useCelo } from '@celo/react-celo';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {
  GOVERNANCE_ADDRESS,
  REPL_RATE,
  contract_celo_color,
  contract_celo_spent_color,
  contract_celo_available_color,
  pending_drafts_celo_color,
  initiate_spent_celo_color,
  initiative_available_celo_color,
  chartData } from './data/data';
import { initiatives } from './data/active_initiatives';
import { drafts } from './data/drafts';



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






function App() {
  const { kit } = useCelo();
  const [initativeAvailable, setInitiativeAvailable] = React.useState(0)
  const [table, setTable] = React.useState([])
  const [communityFundCelo, setCommunityFundCelo] = React.useState(0)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  let fundData = initiatives;
  let draftsData = drafts;
 
  
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
    let tableData = [];
    let initative_available = 0;



    //Community Fund CELO and cEUR
    let community_fund = await celo.balanceOf(GOVERNANCE_ADDRESS)
    let community_fund_celo_result = getCeloValue(community_fund.c[0])
    setCommunityFundCelo(community_fund_celo_result)



    await Promise.all(fundData.map( async(fund) => {
      
      //Update Commmunity Fund CELO Available
      if(fund.title === 'Community Fund'){
        fund.amount = community_fund_celo_result
        fund.available = community_fund_celo_result - initativeAvailable;
        fund.color = contract_celo_available_color
      }else if(fund.title !== 'Drafts'){
        let allowance_available = await celo.allowance(GOVERNANCE_ADDRESS, fund.address)
        let available = getCeloValue(allowance_available.c[0])
        fund.available = available
        fund.used = fund.approved - fund.available
        fund.color = initiative_available_celo_color
        initative_available = initative_available + available 
        setInitiativeAvailable(initative_available)
      }else if(fund.title === 'Drafts'){
        fund.available = fund.amount
        fund.color = pending_drafts_celo_color
        initative_available = initative_available + fund.available 
      }

    

      //Add available funds to chart
      if(chartData.children[0].children.find((child) => child.name === fund.title) === undefined){
        chartData.children[0].children.push((fund.color !== undefined) ? { name: fund.title, color:fund.color, loc: fund.available } :{ name: fund.title, loc: fund.available })
      }

      //Add utilized funds to chart
      if(chartData.children[1].children.find((child) => child.name  === fund.title + ' Spent' ) === undefined && fund.title !== 'Drafts' && fund.title !== 'Community Fund'){
        chartData.children[1].children.push({ name: fund.title + ' Spent', color: initiate_spent_celo_color, loc: fund.used })
      }

      //Add funds to table
      if(fund.title !== 'Drafts' && fund.title !== 'Community Fund'){
        tableData.push({ name: fund.title, approved: fund.approved.toLocaleString(), available: fund.available.toLocaleString(), proposal: fund.proposal })
      }

    }));

    //Add Drafts to table
    draftsData.forEach((draft) => {
      tableData.push({ name: draft.title, approved: draft.value.toLocaleString(), available: 0, proposal: draft.proposal, draft:true  })
    })

    //Update Community Fund CELO Utilized
    chartData.children[0].children.find((child) => child.name === 'Community Fund').loc = community_fund_celo_result - initativeAvailable
    tableData.unshift({ name: 'Community Fund', approved: community_fund_celo_result.toLocaleString(), available: (community_fund_celo_result - initative_available).toLocaleString(), proposal: fundData[fundData.length - 1].proposal })
    setInitiativeAvailable(initative_available)
    setTable(tableData)
  } , []);



  useEffect(() => {
    populateData().then(() => {populateData()})
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
      
      <h4  ><p className='amount-disclaimer'>Contract Balance   |   Funds Available</p>{communityFundCelo.toLocaleString() +  '  '}<span><img className='symbol' alt="Celo Currency Symbol" src={symbol}></img></span><span> | </span>{'  ' + (communityFundCelo - initativeAvailable).toLocaleString() + ' '}  <span><img className='symbol' alt="Celo Symbol" src={symbol}></img></span></h4> 
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
        colors={ [  contract_celo_color, contract_celo_spent_color ] }
        childColor={(parent, child) => {
                return child.data.color
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
              <td style={{ backgroundColor: contract_celo_color }} />
              <td>Contract Celo</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: contract_celo_spent_color }} />
              <td>Contract Celo Lifetime Spent</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: contract_celo_available_color }} />
              <td>Contract Celo Available</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: initiative_available_celo_color }} />
              <td>Intitative Celo Available</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: pending_drafts_celo_color }} />
              <td>Draft Proposals Celo</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: initiate_spent_celo_color }} />
              <td>Intiative Celo Spent</td>
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
