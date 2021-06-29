import testTokenAbi from "./testToken.json"

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

async function superfluid() {

  const testTokenAddress = "0x31948408B43D7732DC6ec5771f587c71f9b2ec91"
  const testTokenContract = new web3.eth.Contract(testTokenAbi, testTokenAddress);

  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["fUSDCx", "fUSDC"]
  });
  await sf.initialize()

  const walletAddress = await window.ethereum.request({
    method: 'eth_requestAccounts',
    params: [
      {
        eth_accounts: {}
      }
    ]
  });

  // Jorge's wallet
  const jorgeWallet = walletAddress[0];
  // Convert USDx into test tokens (fUSDx)
  let usdcx = sf.tokens.fUSDCx;
// Minting fake USDx
  await testTokenContract.methods.mint(jorgeWallet, web3.utils.toWei("0.01", "ether")).send({ from: jorgeWallet });


  // Wrapping token
  const usdcxWrapper = await sf.getERC20Wrapper(usdc);
  // Sending wrapped token
  usdcx = await sf.contracts.ISuperToken.at(usdcxWrapper.wrapperAddress);
  // Approve the transaction of fake token


  await testTokenContract.methods.approve(usdcx.address, "1" + "0".repeat(42)).send({ from: jorgeWallet });
  // convert to supertoken
  await usdcx.upgrade(web3.utils.toWei("0.01", "ether"), { from: jorgeWallet });

  const jorge = sf.user({
    address: jorgeWallet,
    token: '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a'
  });

  await jorge.flow({
    recipient: '0x2880627569ffA41965536CE20B0596009eDfA744', //To Jorge
    flowRate: "1"//'385802469135802'
  });

}

superfluid();