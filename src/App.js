import React from 'react';
import { useCallback, useEffect } from 'react'
import logo from './images/celo_logo.png';
import symbol from './images/celo_symbol.png';
import './App.css';
import { PieChart } from "react-minimal-pie-chart";
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
    //let euro = await kit.contracts.getContract('StableTokenEUR')
    //let exchange = await kit.contracts.getExchange()
    //let euroExchange = await kit.contracts.getContract('ExchangeEUR')
    let populatedData = [];
    let tableData = [];

    //Community Fund CELO and cEUR
    let community_fund = await celo.balanceOf(GOVERNANCE_ADDRESS)
    let community_fund_celo_result = getCeloValue(community_fund.c[0])
    //let community_fund_eur = await euro.balanceOf(GOVERNANCE_ADDRESS)
    //let community_fund_eur_result = getCeloValue(community_fund_eur.c[0])
    //setCommunityFundEur(community_fund_eur_result)
    setCommunityFundCelo(community_fund_celo_result)

    //Exchange CELO <> cEUR
    // let community_fund_eur_celo_quote = await euroExchange.quoteStableSell(community_fund_eur_result)
    // let community_fund_eur_in_celo = community_fund_eur_celo_quote.c[0]
    // setCommunityFundEurInCelo(community_fund_eur_in_celo)

    //Community Fund in cUSD
    //let community_fund_celo_in_cusd = await exchange.quoteGoldSell(community_fund_celo_result ) //+ community_fund_eur_in_celo
    //setCommunityFund(community_fund_celo_in_cusd);

    //Community Appreciation Gifts
    let Community_appreciation_gifts = await celo.allowance(GOVERNANCE_ADDRESS, COMMUNITY_APPRECIATION_GIFTS_ADDRESS)
    let community_appreciation_gifts_result = getCeloValue(Community_appreciation_gifts.c[0])

    //Ocelot
    let Ocelot = await celo.allowance(GOVERNANCE_ADDRESS, OCELOT_ADDRESS)
    let ocelot_result = getCeloValue(Ocelot.c[0])
    
    //Climate Collective
    let CC = await celo.allowance(GOVERNANCE_ADDRESS,CC_ADDRESS )
    let cc_result = getCeloValue(CC.c[0])


    //get percentage of funds
    let drafts = fundData.find((fund) => fund.title === 'Drafts').amount
    //community fund
    let community_fund_total_celo = community_fund_celo_result //+ community_fund_eur_in_celo
    let community_fund_celo_remainding = Math.round(community_fund_celo_result - (community_appreciation_gifts_result + ocelot_result + cc_result + drafts))
    let community_fund_celo_remaining_percentage = Math.round((community_fund_celo_remainding / community_fund_total_celo) * 100)
    //let community_fund_eur_in_celo_percentage = Math.round((community_fund_eur_in_celo / community_fund_total_celo) * 100)
    //initiatives
    let community_appreciation_gifts_percentage = Math.round((community_appreciation_gifts_result / community_fund_total_celo) * 100)
    //let prezenti_remaining_percentage = Math.round((prezenti_result / community_fund_total_celo) * 100)
    let ocelot_remaining_percentage = Math.round((ocelot_result / community_fund_total_celo) * 100)
    let cc_remaining_percentage = Math.round((cc_result / community_fund_total_celo) * 100)
    //drafts
    let drafts_remaining_percentage = Math.round((drafts / community_fund_total_celo) * 100)
    

    fundData.forEach((fund) => {
      if(fund.title === 'Community Fund CELO'){
        fund.approved = community_fund_celo_result.toLocaleString() 
        fund.amount = community_fund_celo_remainding.toLocaleString()
        fund.value = community_fund_celo_remaining_percentage
      } else if(fund.title === 'Community Appreciation Gifts'){
        fund.amount = community_appreciation_gifts_result
        fund.value = community_appreciation_gifts_percentage
      } else if(fund.title === 'Ocelot'){
        fund.amount = ocelot_result.toLocaleString()
        fund.value = ocelot_remaining_percentage
      } else if(fund.title === 'Climate Collective'){
        fund.amount = cc_result.toLocaleString()
        fund.value = cc_remaining_percentage
      } else if(fund.title === 'Drafts'){
        fund.value = drafts_remaining_percentage
      } 
      // else if (fund.title === 'Community Fund cEUR'){
      //   fund.approved = community_fund_eur_in_celo.toLocaleString()
      //   fund.amount = community_fund_eur_in_celo.toLocaleString()
      //   fund.value = community_fund_eur_in_celo_percentage
      // } 

      if(fund.title !== 'Drafts'){
        tableData.push({ name: fund.title, approved: fund.approved, available: fund.amount, proposal: fund.proposal })
        }

      if( fund.amount !== 0){
        populatedData.push(fund)
      }
    })

    draftsData.forEach((draft) => {
      tableData.push({ name: draft.title, approved: draft.value.toLocaleString(), available: draft.amount, proposal: draft.proposal, draft:true  })
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
