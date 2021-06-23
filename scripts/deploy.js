const hre = require("hardhat");

async function main() {

  // passing in the Greeter contract using ether's getConrtactFactory method
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  // set the string argument for the contructor function in the contract using ether's deploy method
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
