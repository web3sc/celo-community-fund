//Add a completed initiative
//1. Add the initiative address
//2. Add the amount approved for the initiative
//3. Add the proposal link
//4. Add the initiative to the fundData array

// Initiate Flow
// Draft -> Active Initiative -> Completed Initiative

import { initiative_available_celo_color  } from "./data";


//1. Initiative Address 
const PREZENTI_ADDRESS = "0xda2069f47D252121c2288301D6EF50B87220A693";
const CELO_AIRDROP_ADDRESS = "0x7BDee323f5227F214EDFC3aE4BD4eBC032B59c82"

//2. Spend Approval Amounts
const PREZENTI_APPROVAL = 800000;
const CELO_AIRDROP_APPROVAL = 200000;


//3. Add Proposal link
const prezenti_proposal = "https://celo.stake.id/#/proposal/61"
const celo_airdrop_proposal = "https://celo.stake.id/#/proposal/16"



//4. Add Initiative to fund array
var prezenti = { title: "Prezenti", value: 0, amount:0, color: initiative_available_celo_color,label:'', approved:PREZENTI_APPROVAL, address: PREZENTI_ADDRESS, proposal: prezenti_proposal, used:0   }
var celo_airdrop = { title: "Celo Airdrop", value: 0, amount:0, color: initiative_available_celo_color,label:'', approved:CELO_AIRDROP_APPROVAL, address: CELO_AIRDROP_ADDRESS, proposal: celo_airdrop_proposal, used:0   }


//5. Add Initiative to fundData array
var completed_initiatives = [  prezenti, celo_airdrop ]

export {completed_initiatives}