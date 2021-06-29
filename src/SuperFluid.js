const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

async function superfluid() {
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["fDAI", "fDAIx"],
  });

  await sf.initialize();

  // const dai = await TestToken.at(sf.tokens.fDAI.address);
  const daix = sf.tokens.fDAIx;
  const dai = sf.tokens.fDAI;

  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });

  const shihyu = sf.user({
    address: walletAddress[0],
    token: "0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a",
  });

  await shihyu.flow({
    recipient: "0xCD9672C666a0e50cd596cda50932B913393754B8", //To Jorge
    flowRate: "0", //'385802469135802'
  });

  const details = await shihyu.details();
}

superfluid();
