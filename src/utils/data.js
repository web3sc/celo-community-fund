
//Addresses
const CELO_TOKEN = "0x471EcE3750Da237f93B8E339c536989b8978a438";
const GOVERNANCE_ADDRESS = "0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972";
const CC_ADDRESS = "0x275D5828bF7e5aaf51Bf8EF2f0668ac4a98F0d23";
const OCELOT_ADDRESS = "0x0D8b5f1CD567656b6Ad4c88e8F082F1f694e5Bb5";
const PREZENTI_ADDRESS = "0xda2069f47D252121c2288301D6EF50B87220A693";

//Pending Proposals Amounts
const AFRICA_DAO = 0 ; //TBD
const INDIA_DAO_CHITTY = 270000;
const INDIA_DAO_MONISH = 80000;
const LATAM_DAO = 0; //TBD

//spend approvals
const PREZENTI_APPROVAL = 800000;
const OCELOT_APPROVAL = 3000000;
const CC_APPROVAL = 4000000;

//proposals
const community_fund_explorer = "https://explorer.celo.org/mainnet/address/0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972/coin-balances#address-tabs"
const ocelot_proposal = "https://celo.stake.id/#/proposal/43"
const prezenti_proposal = "https://celo.stake.id/#/proposal/61"
const cc_proposal = "https://celo.stake.id/#/proposal/60"


//colors
var available_funds_color = "#FCFF52";
var allocated_funds_color = "#56DF7C";
var pending_funds_color = "#9B9B9B";

//FUND and ALLOCATIONS
var community_fund= { title: "Community Fund", value: 0, amount:0, color: available_funds_color,label:'',approved:0, address: GOVERNANCE_ADDRESS, proposal: community_fund_explorer}
var prezenti = { title: "Prezenti", value: 0, amount:0, color: allocated_funds_color,label:'', approved:PREZENTI_APPROVAL.toLocaleString(), address: PREZENTI_ADDRESS, proposal: prezenti_proposal   }
var ocelot = { title: "Ocelot", value: 0, amount:0, color: allocated_funds_color,label:'', approved:OCELOT_APPROVAL.toLocaleString(), address: OCELOT_ADDRESS, proposal: ocelot_proposal }
var cc = { title: "Climate Collective", value: 0, amount:0, color: allocated_funds_color, label:'', approved:CC_APPROVAL.toLocaleString(), address: CC_ADDRESS, proposal: cc_proposal }


//Drafts
var india_dao_chitty = { title: "India DAO Chitty", value: INDIA_DAO_CHITTY, color: pending_funds_color,label:'', approved:0, proposal: "https://github.com/celo-org/governance/blob/main/CGPs/cgp-0064.md" }
var india_dao_monish = { title: "India DAO Monish", value: INDIA_DAO_MONISH, color: pending_funds_color,label:'', approved:0 }
var africa_dao = { title: "Africa DAO", value: AFRICA_DAO, color: pending_funds_color,label:'', approved:0 }
var latam_dao = { title: "Latam DAO", value: LATAM_DAO, color: pending_funds_color,label:'', approved:0 }
var drafts = { title: "Drafts", value: 1, amount: INDIA_DAO_CHITTY + INDIA_DAO_MONISH, color: pending_funds_color,label:'', approved:0 }


var fund = [ community_fund, prezenti, ocelot, cc, drafts ]

//Estimated Replensh Rate
//Quick and dirty estimate based on current rate of spending by looking at one day
//TODO: Make this more accurate by looking at the 90 day average
const REPL_RATE = 18000;



export const getFundData = () => {
    return fund;
}

export const getDraftsData = () => {
    return [india_dao_chitty, india_dao_monish, africa_dao, latam_dao];
}


export {CELO_TOKEN,
        GOVERNANCE_ADDRESS,
        CC_ADDRESS,
        OCELOT_ADDRESS,
        PREZENTI_ADDRESS,
        AFRICA_DAO,
        INDIA_DAO_CHITTY,
        INDIA_DAO_MONISH,
        LATAM_DAO,
        REPL_RATE,
        community_fund,
        prezenti,
        ocelot,
        cc,
        drafts,
        available_funds_color,
        allocated_funds_color,
        pending_funds_color
    }