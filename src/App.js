import React from 'react';
import { useCallback, useEffect } from 'react'
import logo from './images/celo_logo.png';
import symbol from './images/celo_symbol.png';
import ceur from './images/ceur.png';
import './App.css';
import { PieChart } from "react-minimal-pie-chart";
import Table from './components/Table';
import Modal from 'react-modal';
import { useCelo } from '@celo/react-celo';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import BigNumber from 'bignumber.js';
import {
  CEUR_TOKEN,
  GOVERNANCE_ADDRESS,
  CC_ADDRESS,
  OCELOT_ADDRESS,
  PREZENTI_ADDRESS,
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






function App() {
  const { kit } = useCelo();
  const [table, setTable] = React.useState([])
  const [data, setData] = React.useState([])
  const [communityFund, setCommunityFund] = React.useState(0)
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
    //let reserve = await kit.contracts.getContract('ExchangeEUR')
    let populatedData = [];
    let tableData = [] 
    console.log('looping through funds')
    //Community Fund CELO
    let community_fund = await celo.balanceOf(GOVERNANCE_ADDRESS)
    let community_fund_celo_result = getCeloValue(community_fund.c[0])
    let community_fund_eur_result = getCeloValue(community_fund.c[1])
    setCommunityFund(community_fund_celo_result)

    //Exchange CELO <> cEUR
    //let exchange_rate = await reserve.getExchangeRate()
    //console.log('eur-exchange', reserve)

    // let community_fund_eur_celo_quote = await reserve.quoteStableSell(community_fund_eur_result)
    // console.log('exchange quote', community_fund_eur_celo_quote)
    // let community_fund_celo_eur_xchange = getCeloValue(community_fund_eur_celo_quote.c[0])
    // console.log('exchange rate', community_fund_celo_eur_xchange)
    
    //Prezenti
    let Prezenti = await celo.allowance(GOVERNANCE_ADDRESS, PREZENTI_ADDRESS)
    let prezenti_result = getCeloValue(Prezenti.c[0])

    //Ocelot
    let Ocelot = await celo.allowance(GOVERNANCE_ADDRESS, OCELOT_ADDRESS)
    let ocelot_result = getCeloValue(Ocelot.c[0])
    
    //Climate Collective
    let CC = await celo.allowance(GOVERNANCE_ADDRESS,CC_ADDRESS )
    let cc_result = getCeloValue(CC.c[0])

    let drafts = fundData.find((fund) => fund.title === 'Drafts').amount

    let community_fund_celo_remainding = Math.round(community_fund_celo_result - (prezenti_result + ocelot_result + cc_result + drafts))
    let community_fund_celo_remaining_percentage = Math.round((community_fund_celo_remainding / community_fund_celo_result) * 100)
    let prezenti_remaining_percentage = Math.round((prezenti_result / community_fund_celo_result) * 100)
    let ocelot_remaining_percentage = Math.round((ocelot_result / community_fund_celo_result) * 100)
    let cc_remaining_percentage = Math.round((cc_result / community_fund_celo_result) * 100)
    let drafts_remaining_percentage = Math.round((drafts / community_fund_celo_result) * 100)
    

    fundData.forEach((fund) => {
      if(fund.title === 'Community Fund CELO'){
        fund.approved = community_fund_celo_result.toLocaleString() 
        fund.amount = community_fund_celo_remainding.toLocaleString()
        fund.value = community_fund_celo_remaining_percentage
      } else if(fund.title === 'Community Fund cEUR'){
        fund.amount = community_fund_celo_result.toLocaleString()
        fund.value = 100
      } else if(fund.title === 'Prezenti'){
        fund.amount = prezenti_result
        fund.value = prezenti_remaining_percentage
      } else if(fund.title === 'Ocelot'){
        fund.amount = ocelot_result.toLocaleString()
        fund.value = ocelot_remaining_percentage
      } else if(fund.title === 'Climate Collective'){
        fund.amount = cc_result.toLocaleString()
        fund.value = cc_remaining_percentage
      } else if(fund.title === 'Drafts'){
        fund.value = drafts_remaining_percentage
      }

      if(fund.title !== 'Drafts'){
        tableData.push({ name: fund.title, approved: fund.approved, available: fund.amount, proposal: fund.proposal })
        }

      if( fund.amount !== 0){
        populatedData.push(fund)
      }
    })

    draftsData.forEach((draft) => {
      tableData.push({ name: draft.title, approved: draft.approved, available: draft.amount, proposal: draft.proposal })
    })

    

  
    
    setData(populatedData)
    setTable(tableData)
  } , [fundData, draftsData]);



  useEffect(() => {
    populateData()
    let interval = setInterval(() => {
    populateData()
  }, 10000);
  return () => clearInterval(interval);
  }, [ populateData]);



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
      <p className='title'>Community Fund Status</p> 
      <h4  >{communityFund.toLocaleString() +  ' '}<span><img className='dollars' className='symbol' alt="Celo Currency Symbol" src={symbol}></img></span><span> | </span> <span>2,000,000 </span> <span><img className='symbol' alt="Celo cEUR Symbol" src={ceur}></img></span></h4>
      <div className='pie-chart'>
      <PieChart
        data={data}
        segmentsShift={1}
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              dominant-baseline="central"
              text-anchor="middle"
              style={{
                  fill: '#000', pointerEvents: 'none', fontSize: '2px'
              }}>
              <tspan x={x} y={y} dx={dx} dy={dy}>{dataEntry.title + ' ' + dataEntry.value + '%'}</tspan>

          </text>
      )}
        labelStyle={(index) => ({
          fontSize: '2px',
        })}
        animation
        animationDuration={500}
        animationEasing="ease-out"
        viewBoxSize={[110, 110]}
        center={[55, 55]}
      />
      </div>
      </div>
      <div className='legend'>
        {/* Add your legend here */}
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundColor: allocated_funds_color }} />
              <td>Celo Available</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: pending_funds_color }} />
              <td>Draft Proposals</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: available_funds_color }} />
              <td>Fund Celo Available</td>
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
