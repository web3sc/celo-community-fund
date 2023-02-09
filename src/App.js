import React from 'react';
import { useMemo, useRef } from 'react'
import logo from './images/celo_logo.png';
import './App.css';
import { PieChart } from "react-minimal-pie-chart";
import ReactTableUI from 'react-table-ui'
import Modal from 'react-modal';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
const data = [  { title: "Community Fund", value: 50, color: "#FCFF52",label:'50' },  { title: "Draft Proposals", value: 25, color: "#9B9B9B" },  { title: "Ocelot", value: 15, color: "#56DF7C" },   { title: "Prezenti", value: 5, color: "#56DF7C" },   { title: "Climate Collective", value: 5, color: "#56DF7C" }];

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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const tableInstanceRef = useRef(null)

  const tableData = useMemo(
    () => [
      { name: 'Ocelot', approved: 3000000, available: 0 },
      { name: 'Climate Collective', approved: 4000000, available: 0 },
      { name: 'Prezenti', approved: 800000, available: 0 },
    ],
    []
  )


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
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
              <td style={{ backgroundColor: "#56DF7C" }} />
              <td>Celo Available</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#9B9B9B" }} />
              <td>Draft Proposals</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#FCFF52" }} />
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
