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

//2. Spend Approval Amounts
const PREZENTI_APPROVAL = 800000;


//3. Add Proposal link
const prezenti_proposal = "https://celo.stake.id/#/proposal/61"



//4. Add Initiative to fund array
var prezenti = { title: "Prezenti", value: 0, amount:0, color: initiative_available_celo_color,label:'', approved:PREZENTI_APPROVAL, address: PREZENTI_ADDRESS, proposal: prezenti_proposal, used:0   }


//5. Add Initiative to fundData array
var completed_initiatives = [  prezenti  ]

export {completed_initiatives}