//Add a new draft initiative
//1. Add the initiative address
//2. Add the amount approved for the initiative
//3. Add the proposal link(if available)
//4. Add the initiative as a draft
//5. Add the initiative to the drafts object
//6. Add the initiative to the drafts array

// Initiate Flow
// Draft -> Active Initiative -> Completed Initiative

import { pending_drafts_celo_color  } from "./data";

//1. Initiative Address 


//2. Spend Approval Amounts
//Pending Proposals Amounts
const AFRICA_DAO =  550000; //TBD
const INDIA_DAO_CHITTY = 270000;
const INDIA_DAO_MONISH = 80000;
const LATAM_DAO = 0; //TBD


//3. Add Proposal link
const india_dao_chitty_proposal = "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0064.md"

//4. Add Initiative to drafts
var india_dao_chitty = { title: "India DAO Chitty", value: INDIA_DAO_CHITTY, color: pending_drafts_celo_color,label:'', approved:0, proposal: india_dao_chitty_proposal, draft: true }
var india_dao_monish = { title: "India DAO Monish", value: INDIA_DAO_MONISH, color: pending_drafts_celo_color,label:'', approved:0, draft: true}
var africa_dao = { title: "Africa DAO", value: AFRICA_DAO, color: pending_drafts_celo_color,label:'', approved:0, draft: true }
var latam_dao = { title: "Latam DAO", value: LATAM_DAO, color: pending_drafts_celo_color,label:'', approved:0, draft: true }


//5. Add Initiative to drafts object
var drafts_object = { title: "Drafts", value: 1, amount: INDIA_DAO_CHITTY + INDIA_DAO_MONISH + AFRICA_DAO, color: pending_drafts_celo_color,label:'', approved:0, draft: true }


//6. Add Initiative to drafts array
var drafts = [  india_dao_chitty, india_dao_monish, africa_dao, latam_dao  ]

export {drafts, drafts_object}