import { ethers } from "hardhat"
import { createClient, getClient, Execute } from "@reservoir0x/reservoir-kit-client";

async function main() {

  createClient({
    apiBase: "https://api-goerli.reservoir.tools",
    apiKey: process.env.RESERVOIR_API_KEY,
    source: "Lux.Market"
  });

  const TOKEN_CONTRACT = '0x85A760FeFAc2A9765a62A79407c6e60BCbeee3AA'
  const BENEFICIARY = "0xaF609ef0f3b682B5992c7A2Ecc0485afD4816d54"
  const CONTROLLED_VERA_COIN = '0x883B256EeD86a9A603C0F98eD7CDE252ce497930'
  const VERA_COIN = '0x0df62d2cd80591798721ddc93001afe868c367ff'
  const VERA = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  const ONE_POUND = "28083000000000000"
  const TEN_POUNDS = "280830000000000000"
  const HUNDRED_POUNDS = "2808300000000000000"
  const TWO_THOUSAND = "56166000000000000000"
  
  const wait = (ms: number) => new Promise(
    (resolve, reject) => setTimeout(resolve, ms)
  );
  
  const list_nfts = async ( start_id: number, end_id: number, poundage: number, priceWei: string) => {
    for (let idx = start_id; idx < end_id; idx++) {
      console.log("LISTING: ",idx)
      const [signer] = await ethers.getSigners();
      console.log(signer)
      console.log('token contract: ', TOKEN_CONTRACT)
      await getClient()?.actions.listToken({
        listings: [{  
                token: `${TOKEN_CONTRACT}:${idx}`,  
                weiPrice: priceWei,
                orderbook: "reservoir",  
                orderKind: "seaport"
                // currency: VERA
                // automatedRoyalties: false,
                // fees: [`${BENEFICIARY}:400`]
        }],
        signer,
        onProgress: (steps: Execute['steps']) => {
          console.log(steps)
          console.log(steps[0].items)
          console.log(steps[1].items)
        }
      })
        .then(()=>(console.log('LISTED: ', idx)))
        .catch(()=>{console.log('listToken failed')})
      // console.log("currancy: CONTROLLED_VERA_COIN")
      console.log("priceWei: ", priceWei)
      console.log('WAITING')
      await wait(1000);
      console.log('READY')
    }
  } 

  await list_nfts(0, 4, 1, ONE_POUND)
    .then(()=>console.log("one pound done bish"))
    .catch(()=>console.log('failed'))  
  // console.log("list_nfts for 1 completed")
  // console.log("one pound done bish")

  await list_nfts(1000, 1001, 10, TEN_POUNDS)
  .then(()=>console.log("ten pounds done"))
  .catch(()=>console.log('ten pound failed'))  
  
  await list_nfts(1100, 1101, 100, HUNDRED_POUNDS)
  .then(()=>console.log("hundred pounds done"))
  .catch(()=>console.log('hundred pound failed'))  
  // console.log("hundred pounds DONE")

  await list_nfts(1110, 1111, 2000, TWO_THOUSAND) 
  .then(()=>console.log("two thousand pounds done"))
  .catch(()=>console.log('two thousand pound failed'))  
  // console.log("two thousand pounds DONE LFG!!!")
}

main()
.then(()=>console.log('LFG'))
.catch((err)=>console.log('err:', err))
