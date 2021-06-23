# Notes

## Installation

- npx create-react-app

- install dependencies

  - ethers

  - hardhat

  - @nomiclabs/hardhat-waffle

  - chai

  - @nomiclabs/hardhat-ethers

  - dotenv

- npx hardhat

- create sample project

- install .gitignore

## Setup

- go to hardhat.config.js 

  - update Solidity version

  - set path of artifacts that gets compiled to src directory to be able to import from react app - add under module.exports

``` 
 paths: {
    artifacts: "./src/artifacts",
  },
  ```

  - config hardhat settings for local network

  ``` networks: {
        hardhat: {
          chainId: 1337
        }
  }
```

## Write contract

## Compile

compile the contract to get the abi

```sh
$ npx hardhat compile
```
## Deploy - localhost

- run ```$ npx hardhat node``` to generate a hardhat local testing environment
- deploy contract ```$ npx hardhat run scripts/deploy.js --network localhost```


## Connect to Metamask

- import account with private key

## Connect React-App

- ``` npm start```

- in App.js

``` 
import {useState} from "react";
import {ethers} from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
```

- store deployed contract address in a variable in App.js as a string

``` const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

- set state 

- create an async function to fetch greeting - getting the function from the contract

- create an async function to set the greeting and updating the value - getting the function from the contract
 
- create a function to request account - connects to Metamask wallet

## Code the front end

- button for getting the greeting

- button for setting the greeting (once button is clicked, reset the input to blank by assigning setting the state to empty string)

- create an input button (assing value attribute to orginal state -> empty string)

## Deploy testnet (Rinkeby/Ropsten)

- get eth from testnet facuet

- run ethereum node using Infura (alchemy is another option)

- congifure network in .config file

```
  ropsten: {
    url: "ENDPOINT FROM INFURA",
    accounts: [`0x{PRIVATE ACCOUNT KEY}`]
  }
```

- run 
```
npx hardhat run scripts/deploy.js --network ropsten
```

- check on etherscan (network) that transaction went through

## SIDE NOTE

- make sure to switch accounts in metamask when testing between different networks!