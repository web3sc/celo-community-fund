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
const PREZENTI_ADDRESS = "0xda2069f47D252121c2288301D6EF50B87220A693";
const CHAINLINK_ADDRESS = "0x46421b8EF42b67Ae4E24BE599bD78144e5e12088"
const LATAM_DAO_ADDRESS = "0x38DBAB5C651F352C8f5F765fDA292E9B92d850Ff"
const CELO_TRIBE_ADDRESS = "0x81bC5B8F34CF959105c793F776971FA8A7BB2a25"
const KOREA_DAO_ADDRESS = "0xF737369f79291d8e4aB273bBE5A4669381Cb4715"
const EUROPE_DAO_ADDRESS = "0x4763a32d5256EDA615fd5c07b0e333C7Baa4D628"
const MOBILE_FIRST_COMMUNITY_ADDRESS = "0xA7AF94d898fc31A43D163201cE44b4Fa944a79EE"


//2. Spend Approval Amounts
const CC_APPROVAL = 4000000;
const OCELOT_APPROVAL = 3000000;
const COMMUNITY_APPRECIATION_GIFTS_APPROVAL = 15000;
const CCF1_APPROVAL = 665387;
const AFRICA_DAO_APPROVAL = 550000
const PREZENTI_SECOND_ROUND = 1600000; 
const PREZENTI_APPROVAL = 800000;
const CHAINLINK_APPROVAL = 5980313;
const LATAM_DAO_APPROVAL = 903000; //605K at Celo average rice of 90 days
const CELO_TRIBE_APPROVAL = 70000;
const KOREA_DAO_APPROVAL = 333030;
const EUROPE_DAO_APPROVAL = 440000;
const MOBILE_FIRST_COMMUNITY_APPROVAL = 120000;


//3. Add Proposal link
const cc_proposal = "https://celo.stake.id/#/proposal/60"
const ocelot_proposal = "https://celo.stake.id/#/proposal/43"
const community_appreciation_gifts_proposal = "https://celo.stake.id/#/proposal/25"
const ccf1_proposal = "https://celo.stake.id/#/proposal/18"
const africa_dao_proposal = "https://celo.stake.id/#/proposal/85"
const prezenti_proposal = "https://celo.stake.id/#/proposal/89"
const chainlink_proposal = "https://celo.stake.id/#/proposal/88"
const latam_dao_proposal = "https://celo.stake.id/#/proposal/96"
const celo_tribe_proposal = "https://celo.stake.id/#/proposal/101"
const korea_dao_proposal = "https://celo.stake.id/#/proposal/120"
const europe_dao_proposal = "https://celo.stake.id/#/proposal/115"
const mobile_first_community_proposal = "https://celo.stake.id/#/proposal/123"




//4. Add Initiative to fund array
var cc = { title: "Climate Collective", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved:CC_APPROVAL, address: CC_ADDRESS, proposal: cc_proposal, used:0 }
var ocelot = { title: "Ocelot", value: 0, amount:0, color: initiative_available_celo_color,label:'', approved:OCELOT_APPROVAL, address: OCELOT_ADDRESS, proposal: ocelot_proposal, used:0 }
var community_appreciation_gifts = { title: "Community Appreciation Gifts", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: COMMUNITY_APPRECIATION_GIFTS_APPROVAL, address: COMMUNITY_APPRECIATION_GIFTS_ADDRESS, proposal: community_appreciation_gifts_proposal, used:0 }
var ccf1 = { title: "CCF1", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: CCF1_APPROVAL, address: CCF1_ADDRESS, proposal: ccf1_proposal, used:0 }
var africa_dao = { title: "Africa DAO", value: 0, amount:0, color: initiative_available_celo_color, label:'', approved: AFRICA_DAO_APPROVAL, address: AFRICA_DAO_ADDRESS, proposal: africa_dao_proposal, used:0 }
var prezenti_second_round = { title: "Prezenti", value: 0, color: initiative_available_celo_color, label:'', approved: PREZENTI_SECOND_ROUND + PREZENTI_APPROVAL, address: PREZENTI_ADDRESS, proposal: prezenti_proposal, used:0 }
var chainlink = { title: "Chainlink", value: 0, color: initiative_available_celo_color, label:'', approved: CHAINLINK_APPROVAL, address: CHAINLINK_ADDRESS, proposal: chainlink_proposal, used:0 }
var latam_dao = { title: "Latam DAO", value: 0, color: initiative_available_celo_color, label:'', approved: LATAM_DAO_APPROVAL, address: LATAM_DAO_ADDRESS, proposal: latam_dao_proposal }
var celo_tribe = { title: "Celo Tribe", value: 0, color: initiative_available_celo_color, label:'', approved: CELO_TRIBE_APPROVAL, address: CELO_TRIBE_ADDRESS, proposal: celo_tribe_proposal }
var korea_dao = { title: "Asia DAO", value: 0, color: initiative_available_celo_color, label:'', approved: KOREA_DAO_APPROVAL, address: KOREA_DAO_ADDRESS, proposal: korea_dao_proposal}
var europe_dao = { title: "Europe DAO", value: 0, color: initiative_available_celo_color, label:'', approved:EUROPE_DAO_APPROVAL, address: EUROPE_DAO_ADDRESS, proposal: europe_dao_proposal}
var mobile_first_community = { title: "Mobile First Community", value: 0, color: initiative_available_celo_color, label:'', approved:MOBILE_FIRST_COMMUNITY_APPROVAL, address: MOBILE_FIRST_COMMUNITY_ADDRESS, proposal: mobile_first_community_proposal}

//5. Add Initiative to fundData array
var initiatives = [  ocelot, cc, community_appreciation_gifts, ccf1, africa_dao, prezenti_second_round, chainlink, latam_dao, celo_tribe, korea_dao, europe_dao, mobile_first_community, drafts_object  ].concat(community_fund).concat(completed_initiatives)

export {initiatives}