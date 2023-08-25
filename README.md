# Celo Community Fund Status

## Overview 

This repository is to keep a canonical history of the Celo Community Fund status and intiatives that have utilized the fund. Previously, the data was segregated and hard to decifer current initiatives that were in draft proposal phase, intiatives that had spend approval and the remaining funds available to them. It was also difficult to have a high level overview of the total funds.

## What is the fund?

The Community Fund provides for general upkeep of the Celo platform. CELO holders decide how to allocate these funds through governance proposals. Funds might be used to pay bounties for bugs or vulnerabilities, security audits, or grants for protocol development.

The Community Fund receives assets from three sources:

- The Community Fund obtains a desired epoch reward defined as a fraction of the total desired epoch rewards (governable, initially planned to be 25%). This amount is subject to adjustment up or down in the event of under- or over-spending against the epoch rewards target schedule. The Community Fund epoch rewards may be redirected to bolster the Reserve.

- The Community Fund is the default destination for slashed assets.
- The Community Fund also receives the 'base' portion of transaction fees.


## History


|  №  |      Name       | Date | Amount | Webpage | Status |
|:---:|:---------------:|:------:|:-----:|:------:|:------:|
| 1 | CCF1 | 2020-12-01 | 665,387 | [site](https://celocommunityfund.org/) | Complete |
| 2 | Community Appreciation Gifts | 2020-01-27 | 15000 | N/A | Complete |
| 3 | Ocelot | 2021-12 | 3,000,000 | [site](http://ocelot.xyz/) | Ongoing |
| 4 | Climate Collective | 2022-06-11 | 4,000,000 | [site](https://climatecollective.org/) | Ongoing |
| 5 | Prezenti | 2022-06-11 | 800,000 | [site](https://prezenti.xyz) | Ongoing |
| 3 | Africa DAO |  550,000 | [forum post](https://forum.celo.org/t/celo-africa-regional-dao-proposal/4054) | Ongoing |

## Drafts

|  №  |      Name       |  Amount | Webpage | Status |
|:---:|:---------------:|:-----:|:------:|:------:|
| 1 | India DAO Chitty | 270,000 | [forum post](https://forum.celo.org/t/celo-indiadao-regional-dao-proposal/4207) | Forum |
| 2 | India DAO Monish | 80,000 | [forum post]() | Forum |
| 3 | LATAM DAO  | 903,000 | [forum post](https://forum.celo.org/t/latam-w3-dao-proposal/4494) | Forum |


## Adding an Intiative
To add an intiative, navigate to the appropriate file in the `src/data` directory. There are 3 files each with instructions at the top:

- draft_initiatives
- active_initiatives
- completed_initiatives

## Webpage

> Note: the page factors in both CELO and cEUR which are the tokens that have substantial value.

[celocommunityfund.xyz](https://www.celocommunityfund.xyz) shows the current balance of the funds available in the [celo governance address](https://explorer.celo.org/mainnet/address/0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972/coin-balances#address-tabs)(Celo Community Fund) and displays a pie chart with a high level breakdown of its contents and their percentage relevant to the total amount. This consists of 3 elements:

1. The currently available funds that are not allocated
2. The currently available funds that are allocated via spend approvals to their respective addresses
3.  An aggregate of the draft proposals anticipating to go to governance(this is taking away from no 1 above)

### Info

Clicking the info button at the top right gives a more detailed overview of each of the items. Including:

- What is the Celo Community Fund
- The estimated replish rate per day of the fund
- Each of the initiatives including total amount approved, available amount left and a link to the respective governance proposal.

## Automation


## Contributing

This is a community run project, all contributions are welcome. If you have feedback or a request please submit an issue. If you want to add additional information or correct information please submit a PR

## Pay it Forward

If you find this useful please support and vote for [TPT](https://www.thecelo.com/groupDetail/thepassivetrust)(The Passive Trust) Celo validator group.