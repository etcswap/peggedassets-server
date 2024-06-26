const sdk = require("@defillama/sdk");
import { sumSingleBalance } from "../helper/generalUtil";
import {
  ChainBlocks,
  PeggedIssuanceAdapter,
  Balances,  ChainContracts,
} from "../peggedAsset.type";
import { getTotalSupply as tezosGetTotalSupply } from "../helper/tezos";


const chainContracts: ChainContracts = {
  tezos: {
    issued: ["KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV"],
  },
};

async function tezosMinted(tokenID: string) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    const totalSupply = await tezosGetTotalSupply(tokenID);
    sumSingleBalance(balances, "peggedUSD", totalSupply, "issued", false);
    return balances;
  };
}

const adapter: PeggedIssuanceAdapter = {
  tezos: {
    minted: tezosMinted(chainContracts.tezos.issued[0]),
  },
};

export default adapter;
