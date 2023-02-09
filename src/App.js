import React from 'react';
import { useMemo, useRef, useEffect } from 'react'
import logo from './images/celo_logo.png';
import './App.css';
import { PieChart } from "react-minimal-pie-chart";
import ReactTableUI from 'react-table-ui'
import Modal from 'react-modal';
import { useCelo } from '@celo/react-celo';
import Web3 from 'web3';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {CELO_TOKEN,
  GOVERNANCE_ADDRESS,
  CC_ADDRESS,
  OCELOT_ADDRESS,
  PREZENTI_ADDRESS,
  AFRICA_DAO,
  INDIA_DAO_CHITTY,
  INDIA_DAO_MONISH,
  LATAM_DAO,
  REPL_RATE,
  available_funds_color,
  allocated_funds_color,
  pending_funds_color,
  getFundData,
  getTableData } from './utils/data';

const BigNumber = require('bignumber.js');
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
  let subtitle;
  const [table, setTable] = React.useState([])
  const [data, setData] = React.useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const tableInstanceRef = useRef(null)

  useEffect(() => {

    let fundData = getFundData();
    

    async function populateData(){
      let celo = await kit.contracts.getGoldToken()
      
      //Community Fund
      let community_fund = await celo.balanceOf(GOVERNANCE_ADDRESS)
      let community_fund_result = getCeloValue(community_fund.c[0])
      
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

      let community_fund_remainding = (community_fund_result - (prezenti_result + ocelot_result + cc_result + drafts))
      let community_fund_remaining_percentage = (community_fund_remainding / community_fund_result) * 100
      let community_fund_allocated_percentage = (100 - community_fund_remaining_percentage)
      let prezenti_remaining_percentage = (prezenti_result / community_fund_result) * 100
      let ocelot_remaining_percentage = (ocelot_result / community_fund_result) * 100
      let cc_remaining_percentage = (cc_result / community_fund_result) * 100
      let drafts_remaining_percentage = (drafts / community_fund_result) * 100

      console.log('community_fund_remainding', community_fund_remainding)
      console.log('community_fund_remaining_percentage', community_fund_remaining_percentage)
      console.log('community_fund_allocated_percentage', community_fund_allocated_percentage)
      console.log('prezenti_remaining_percentage', prezenti_remaining_percentage)
      console.log('ocelot_remaining_percentage', ocelot_remaining_percentage)
      console.log('cc_remaining_percentage', cc_remaining_percentage)
      console.log('drafts_remaining_percentage', drafts_remaining_percentage)
      

      fundData.forEach((fund) => {
        if(fund.title === 'Community Fund'){
          fund.approved = community_fund_result 
          fund.amount = community_fund_remainding
          fund.value = community_fund_allocated_percentage
        } else if(fund.title === 'Prezenti'){
          fund.amount = prezenti_result
          fund.value = prezenti_remaining_percentage
        } else if(fund.title === 'Ocelot'){
          fund.amount = ocelot_result
          fund.value = ocelot_remaining_percentage
        } else if(fund.title === 'Climate Collective'){
          fund.amount = cc_result
          fund.value = cc_remaining_percentage
        } else if(fund.title === 'Drafts'){
          fund.value = drafts_remaining_percentage
        }
      })

    }

    setData(fundData);

    //TODO: Get better table package
    async function getTableData(){


      // let tableData = [
      //   { name: 'Community Fund', approved: community_fund_result, available: community_fund_result - (prezenti_result + ocelot_result + cc_result) },
      //   { name: 'Ocelot', approved: 3000000, available: ocelot_result },
      //   { name: 'Climate Collective', approved: 4000000, available: cc_result },
      //   { name: 'Prezenti', approved: 800000, available: prezenti_result },
      // ]

      // console.log('tableData', tableData)
  
      // setTable(tableData);
  
    }



    getTableData()

  }, []);




  // const tableData = useMemo(
  //   () => table,
  //   [table]
  // )

  const tableData = useMemo(
    () => [
      { name: 'Ocelot', approved: 3000000, available: 0 },
      { name: 'Climate Collective', approved: 4000000, available: 0 },
      { name: 'Prezenti', approved: 800000, available: 0 },
    ],
    []
  )

  function getCeloValue(amount){
    return amount / 10**4
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
          <ReactTableUI
            title='Fund Allocation'
            data={tableData}
            tableInstanceRef={tableInstanceRef}
            maxHeight={10}
          />
          
        </div>

      </Modal>
      <header className="App-header">
      

      <div >
        <img className='celo-logo' src={logo} alt="Celo" />
        <button className='info' onClick={openModal}><InfoIcon  /></button>
      </div>
      <div className="App-header">
      <p className='title'>Community Fund Status</p> 
      <PieChart
        data={data}
        style={{ height: "60vh", width: "60vw" }}
        segmentsShift={1}
        label={({ dataEntry }) => dataEntry.title}
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
      <div className='legend'>
        {/* Add your legend here */}
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundColor: available_funds_color }} />
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
        <a className='footer' href="https://www.web3socialcapital.xyz" >Made with ❤️ by <span className='w3text'>w3sc</span> </a>
        <p className='donate'>If you find this valuable please support us by voting for the validator group - <a className='TPT' href='https://www.thecelo.com/groupDetail/thepassivetrust'>The Passive Trust</a></p>
      </div>


      </header>
    </div>
  );
}

export default App;
