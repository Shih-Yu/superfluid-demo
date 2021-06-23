import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";

import  "./SuperFluid"

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greeting, setGreetingValue] = useState("");

  // connect to wallet of metamask user
  async function requestAccount() {
    // request account info from metamask wallet, prompt user to connect to metamask account if they haven't yet
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // get greeting from the contract
  async function fetchGreeting() {
    // checks that the window opened has metamask extension
    if (typeof window.ethereum !== "undefined") {
      // create a new instance of the provider using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // creating a new instance of a contract passing in the contract address(greeterAddress), contract abi(Greeter), and the provider(provider)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        // getting the value of the greet()function from the contract
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }


  // setting the greeting
  async function setGreeting() {
    // check that user typed in a greeting
    if (!greeting) return;
    // checks that window has metamask extension
    if (typeof window.ethereum !== "undefined") {
      // wait for user to enable account to be used
      await requestAccount();
      // create a new instance of proviver
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // get the signer from the provider to sign the transaction
      const signer = provider.getSigner();
      // create a new instance of the contract with the deployed contract address, the abi, the signer
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      // pass in the variable the user types into the form(from state)
      const transaction = await contract.setGreeting(greeting);
      // reset the input value to be blank
      setGreetingValue("");
      // waiting for the transaction to be confirmed on the blockchain
      await transaction.wait();
      // get the updated greeting
      fetchGreeting();
    }

  
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set Your Greeting"
          value={greeting}
          />
          <h1>{greeting}</h1>
      </header>
    </div>
  );
}

export default App;
