import {CELO_TOKEN,
    GOVERNANCE_ADDRESS,
    CC_ADDRESS,
    OCELOT_ADDRESS,
    PREZENTI_ADDRESS,
    AFRICA_DAO,
    INDIA_DAO_CHITTY,
    INDIA_DAO_MONISH,
    LATAM_DAO} from './data.js'
import Web3 from "web3";
import ContractKit from "@celo/contractkit";

const web3 = new Web3("https://forno.celo.org");
const kit = ContractKit.newKitFromWeb3(web3);




//Estimated Replensh Rate
//Quick and dirty estimate based on current rate of spending by looking at one day
//TODO: Make this more accurate by looking at the 90 day average
const REPL_RATE = 18000;




const getCeloCommunityFundStatus = async () => {

const celo = await kit._web3Contracts.getGoldToken()

let community_fund = await celo.methods.balanceOf(GOVERNANCE_ADDRESS)
let community_fund_result = parseInt(Web3.utils.fromWei(await community_fund.call()))

let Prezenti = await celo.methods.allowance(GOVERNANCE_ADDRESS, PREZENTI_ADDRESS)
let prezenti_result = parseInt(Web3.utils.fromWei(await Prezenti.call()))

let Ocelot = await celo.methods.allowance(GOVERNANCE_ADDRESS, OCELOT_ADDRESS)
let ocelot_result = parseInt(Web3.utils.fromWei(await Ocelot.call()))

let CC = await celo.methods.allowance(GOVERNANCE_ADDRESS,CC_ADDRESS )
let cc_result = parseInt(Web3.utils.fromWei(await CC.call()))

 console.log("-------Community Fund-------")
 console.log( "Community Fund: " + community_fund_result)
 console.log("Prezenti: " + prezenti_result)
 console.log("Ocelot: " + ocelot_result)
 console.log("CC: " + cc_result)
 console.log("--------------------")
 console.log("-------Drafts-------")
 console.log("India DAO Chitty: " + INDIA_DAO_CHITTY)
 console.log("India DAO Monish: " + INDIA_DAO_MONISH)
 console.log("Africa DAO: " + AFRICA_DAO)
 console.log("Latam DAO: " + LATAM_DAO)
 console.log("--------------------")
 console.log("Estimated Replenish Rate: " + REPL_RATE + " per day")



 console.log("Total Remaining(not including drafts): " + (community_fund_result - (prezenti_result + ocelot_result + cc_result)))  

}



getCeloCommunityFundStatus()