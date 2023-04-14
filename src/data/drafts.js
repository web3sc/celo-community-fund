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

//1. Initiative Address 0x8f51dc0791cddddce08052fff939eb7cf0c17856

//2. Spend Approval Amounts
//Pending Proposals Amounts
const INDIA_DAO_CHITTY = 270000;
const INDIA_DAO_MONISH = 80000;
const LATAM_DAO = 903000; //605K at Celo average rice of 90 days
const IMMUNEFI_BUG_BOUNTY = 1500000; //1.5m Celo ~$1m at 90d trailing


//3. Add Proposal link
const india_dao_chitty_proposal = "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0064.md"
const latam_dao_proposal = "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0076.md"
const immunefi_bug_bounty_proposal = "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0073.md"

//4. Add Initiative to drafts
var india_dao_chitty = { title: "India DAO Chitty", value: INDIA_DAO_CHITTY, color: pending_drafts_celo_color,label:'', approved:0, proposal: india_dao_chitty_proposal, draft: true }
var india_dao_monish = { title: "India DAO Monish", value: INDIA_DAO_MONISH, color: pending_drafts_celo_color,label:'', approved:0, draft: true}
var latam_dao = { title: "Latam DAO", value: LATAM_DAO, color: pending_drafts_celo_color,label:'', approved:0, draft: true, proposal: latam_dao_proposal }
var immunefi_bug_bounty = { title: "ImmuneFi Bug Bounty", value: IMMUNEFI_BUG_BOUNTY, color: pending_drafts_celo_color,label:'', approved:0, draft: true, proposal: immunefi_bug_bounty_proposal }

//5. Add Initiative to drafts object
var drafts_object = { title: "Drafts", value: 1, amount: INDIA_DAO_CHITTY + INDIA_DAO_MONISH + LATAM_DAO +IMMUNEFI_BUG_BOUNTY, color: pending_drafts_celo_color,label:'', approved:0, draft: true, type: "Drafts" }


//6. Add Initiative to drafts array
var drafts = [  india_dao_chitty, india_dao_monish, latam_dao, immunefi_bug_bounty  ]

export {drafts, drafts_object}
