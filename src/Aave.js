import { signTypedData_v4 } from 'eth-sig-util'
import { fromRpcSig } from 'ethereumjs-util'
import aTokenAbi from "./aToken.json" // This file is missing!!! We should find it or generate it somehow

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

const aTokenAddress = "0xFF3c8bc103682FA918c954E84F5056aB4DD5189d" // aUSDT address
const aTokenContract = new web3.eth.Contract(aTokenAbi, aTokenAddress)
const privateKey = 'YOUR PRIVATE KEY'; // TODO Private key of the address owner (probably organisation)
const owner = "YOUR ADDRESS" // TODO Address owner (probably organisation)
const chainId = 42; // Kovan
const spender = "0xcac717c3E6B3ad53FfFc924869C5EEb8B012F0a9" // Contract address
const value = 1000000;
const nonce = 1;
const deadline = 1640930400000;

async function permit() {

    const permitParams = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      primaryType: "Permit",
      domain: {
        name: "aUSDT",
        version: "1",
        chainId: chainId,
        verifyingContract: aTokenAddress,
      },
      message: {
        owner,
        spender,
        value,
        nonce,
        deadline,
      },
    }
    
    const signature = signTypedData_v4(
      Buffer.from(privateKey, "hex"),
      { data: permitParams }
    )
    
    const { v, r, s } = fromRpcSig(signature)
    
    await aTokenContract.methods
        .permit(
          owner,
          spender,
          value,
          deadline,
          v,
          r,
          s
        )
        .send({ from: owner })
        .catch((e) => {
          console.log('error' + e.toString())
    })
}

permit();