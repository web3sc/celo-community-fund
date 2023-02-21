
//Addresses
const CELO_TOKEN = "0x471EcE3750Da237f93B8E339c536989b8978a438";
const CEUR_TOKEN = "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73"
const GOVERNANCE_ADDRESS = "0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972";
const CC_ADDRESS = "0x275D5828bF7e5aaf51Bf8EF2f0668ac4a98F0d23";
const OCELOT_ADDRESS = "0x0D8b5f1CD567656b6Ad4c88e8F082F1f694e5Bb5";
const PREZENTI_ADDRESS = "0xda2069f47D252121c2288301D6EF50B87220A693";
const COMMUNITY_APPRECIATION_GIFTS_ADDRESS = "0x5374cF78F82E3610f9678bD7AF617785FF6c578a";
const CCF1_ADDRESS = "0x2f90Bb1CAF4079192481B1A7F3088220d291456D";

//Pending Proposals Amounts
const AFRICA_DAO =  428000; //TBD
const INDIA_DAO_CHITTY = 270000;
const INDIA_DAO_MONISH = 80000;
const LATAM_DAO = 0; //TBD

//spend approvals
const PREZENTI_APPROVAL = 800000;
const OCELOT_APPROVAL = 3000000;
const CC_APPROVAL = 4000000;
const COMMUNITY_APPRECIATION_GIFTS_APPROVAL = 15000;
const CCF1_APPROVAL = 665387;

//proposals
const community_fund_explorer = "https://explorer.celo.org/mainnet/address/0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972/coin-balances#address-tabs"
const ocelot_proposal = "https://celo.stake.id/#/proposal/43"
const prezenti_proposal = "https://celo.stake.id/#/proposal/61"
const cc_proposal = "https://celo.stake.id/#/proposal/60"
const community_appreciation_gifts_proposal = "https://celo.stake.id/#/proposal/25"
const ccf1_proposal = "https://celo.stake.id/#/proposal/18"


//colors
var available_funds_color = "#FCFF52";
var allocated_funds_color = "#56DF7C";
var pending_funds_color = "#9B9B9B";

//FUND and ALLOCATIONS
var community_fund_celo= { title: "Community Fund", value: 0, amount:0, color: available_funds_color,label:'',approved:0, address: GOVERNANCE_ADDRESS, proposal: community_fund_explorer, used:0}
//var community_fund_eur= { title: "Community Fund cEUR", value: 0, amount:0, color: available_funds_color,label:'',approved:0, address: GOVERNANCE_ADDRESS, proposal: community_fund_explorer}
var prezenti = { title: "Prezenti", value: 0, amount:0, color: allocated_funds_color,label:'', approved:PREZENTI_APPROVAL, address: PREZENTI_ADDRESS, proposal: prezenti_proposal, used:0   }
var ocelot = { title: "Ocelot", value: 0, amount:0, color: allocated_funds_color,label:'', approved:OCELOT_APPROVAL, address: OCELOT_ADDRESS, proposal: ocelot_proposal, used:0 }
var cc = { title: "Climate Collective", value: 0, amount:0, color: allocated_funds_color, label:'', approved:CC_APPROVAL, address: CC_ADDRESS, proposal: cc_proposal, used:0 }
var community_appreciation_gifts = { title: "Community Appreciation Gifts", value: 0, amount:0, color: allocated_funds_color, label:'', approved: COMMUNITY_APPRECIATION_GIFTS_APPROVAL, address: COMMUNITY_APPRECIATION_GIFTS_ADDRESS, proposal: community_appreciation_gifts_proposal, used:0 }
var ccf1 = { title: "CCF1", value: 0, amount:0, color: allocated_funds_color, label:'', approved: CCF1_APPROVAL, address: CCF1_ADDRESS, proposal: ccf1_proposal, used:0 }


//Drafts
var india_dao_chitty = { title: "India DAO Chitty", value: INDIA_DAO_CHITTY, color: pending_funds_color,label:'', approved:0, proposal: "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0064.md", draft: true }
var india_dao_monish = { title: "India DAO Monish", value: INDIA_DAO_MONISH, color: pending_funds_color,label:'', approved:0, draft: true}
var africa_dao = { title: "Africa DAO", value: AFRICA_DAO, color: pending_funds_color,label:'', approved:0, draft: true }
var latam_dao = { title: "Latam DAO", value: LATAM_DAO, color: pending_funds_color,label:'', approved:0, draft: true }
var drafts = { title: "Drafts", value: 1, amount: INDIA_DAO_CHITTY + INDIA_DAO_MONISH + AFRICA_DAO, color: pending_funds_color,label:'', approved:0, draft: true }


var fund = [  ocelot, cc, ccf1, community_appreciation_gifts, prezenti, drafts, community_fund_celo ] //community_fund should always be last//, community_fund_eur

//Estimated Replensh Rate
//Quick and dirty estimate based on current rate of spending by looking at one day
//TODO: Make this more accurate by looking at the 90 day average
const REPL_RATE = 18000;



const getFundData = () => {
    return fund;
}

const getDraftsData = () => {
    return [india_dao_chitty, india_dao_monish, africa_dao, latam_dao];
}


export {CELO_TOKEN,
        CEUR_TOKEN,
        GOVERNANCE_ADDRESS,
        CC_ADDRESS,
        OCELOT_ADDRESS,
        PREZENTI_ADDRESS,
        COMMUNITY_APPRECIATION_GIFTS_ADDRESS,
        CCF1_ADDRESS,
        AFRICA_DAO,
        INDIA_DAO_CHITTY,
        INDIA_DAO_MONISH,
        LATAM_DAO,
        REPL_RATE,
        community_fund_celo,
        //community_fund_eur,
        prezenti,
        ocelot,
        cc,
        community_appreciation_gifts,
        ccf1,
        drafts,
        available_funds_color,
        allocated_funds_color,
        pending_funds_color,
        getFundData,
        getDraftsData
    }