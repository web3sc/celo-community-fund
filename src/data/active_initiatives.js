//Add a new initiative
//1. Add the initiative address
//2. Add the amount approved for the initiative
//3. Add the proposal link
//4. Add the initiative to the fundData array

// Initiate Flow
// Draft -> Active Initiative -> Completed Initiative

import { drafts_object } from "./drafts";
import { completed_initiatives } from "./completed_initiatives";
import { community_fund, initiative_available_celo_color  } from "./data";

//1. Initiative Address 
const CC_ADDRESS = "0x275D5828bF7e5aaf51Bf8EF2f0668ac4a98F0d23";
const OCELOT_ADDRESS = "0x0D8b5f1CD567656b6Ad4c88e8F082F1f694e5Bb5";
const COMMUNITY_APPRECIATION_GIFTS_ADDRESS = "0x5374cF78F82E3610f9678bD7AF617785FF6c578a";
const CCF1_ADDRESS = "0x2f90Bb1CAF4079192481B1A7F3088220d291456D";
const AFRICA_DAO_ADDRESS =  "0xc59533fd060e38230100F3577eF5ad9467ae2594"; //take this info from the github mainnet.json

//2. Spend Approval Amounts
const CC_APPROVAL = 4000000;
const OCELOT_APPROVAL = 3000000;
const COMMUNITY_APPRECIATION_GIFTS_APPROVAL = 15000;
const CCF1_APPROVAL = 665387;
const AFRICA_DAO_APPROVAL = 550000

//3. Add Proposal link
const cc_proposal = "https://celo.stake.id/#/proposal/60"
const ocelot_proposal = "https://celo.stake.id/#/proposal/43"
const community_appreciation_gifts_proposal = "https://celo.stake.id/#/proposal/25"
const ccf1_proposal = "https://celo.stake.id/#/proposal/18"
const africa_dao_proposal = "https://celo.stake.id/#/proposal/85"

//4. Add Initiative to fund array
var cc = { title: "Climate Collective", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved:CC_APPROVAL, address: CC_ADDRESS, proposal: cc_proposal, used:0 }
var ocelot = { title: "Ocelot", value: 0, amount:0, color: initiative_available_celo_color,label:'', approved:OCELOT_APPROVAL, address: OCELOT_ADDRESS, proposal: ocelot_proposal, used:0 }
var community_appreciation_gifts = { title: "Community Appreciation Gifts", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: COMMUNITY_APPRECIATION_GIFTS_APPROVAL, address: COMMUNITY_APPRECIATION_GIFTS_ADDRESS, proposal: community_appreciation_gifts_proposal, used:0 }
var ccf1 = { title: "CCF1", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: CCF1_APPROVAL, address: CCF1_ADDRESS, proposal: ccf1_proposal, used:0 }
var africa_dao = { title: "AFRICA_DAO", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: AFRICA_DAO_APPROVAL, address: AFRICA_DAO_ADDRESS, proposal: africa_dao_proposal, used:0 }

//5. Add Initiative to fundData array
var initiatives = [  ocelot, cc, community_appreciation_gifts, ccf1, africa_dao, drafts_object  ].concat(community_fund).concat(completed_initiatives)

export {initiatives}