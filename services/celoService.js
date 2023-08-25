// services/celoService.js
const Web3 = require('web3');
const { GOVERNANCE_ADDRESS, node } = require('../src/data/data');

async function monitorCeloGovernanceContract() {

  const web3 = new Web3(node);
  const governanceContract = new web3.eth.Contract([], GOVERNANCE_ADDRESS);

 // Calculate the block number for 24 hours ago
 const currentBlockNumber = await web3.eth.getBlockNumber();
 const blocksPerDay = 24 * 60 * 60 / 5; // 5 seconds per block
 const fromBlock = Math.max(currentBlockNumber - blocksPerDay, 0);

 governanceContract.events.EventName({
   fromBlock: fromBlock
 }, function(error, event){ console.log(event); })
 .on('connected', function(subscriptionId){
     console.log(subscriptionId);
 })
 .on('data', function(event){
     console.log(event); // same results as the optional callback above
 })
 .on('changed', function(event){
     // remove event from local database
 })
 .on('error', console.error);

 // Rest of the code...
}

module.exports = monitorCeloGovernanceContract;