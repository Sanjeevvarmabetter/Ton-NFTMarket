import React, { useState } from "react";
import TonWeb from "tonweb";

// Ensure Buffer is available in the browser
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(null);

  // Connect to Tonkeeper wallet
  const connectToWallet = async () => {
    try {
      if (window.ton) {
        // TonWeb instance for interaction
        const tonweb = new TonWeb(window.ton);

        // Request wallet address using TonWeb from the window object (Tonkeeper integration)
        const wallet = await tonweb.wallet.create({ publicKey: "0QD_0cdNA9pPwvv2zx6dax6C58HyM987CMndum3tmegDoy0o" });
        const address = await wallet.getAddress();

        // Set wallet connected state and address
        setWalletConnected(true);
        setWalletAddress(address.toString(true, true, false)); // Display human-readable address
      } else {
        alert("Tonkeeper wallet is not installed!");
      }
    } catch (err) {
      console.error("Error connecting to wallet:", err);
      setError("Failed to connect to wallet. Please ensure Tonkeeper is installed.");
    }
  };

  return (
    <div className="App">
      <h1>Connect to Tonkeeper Wallet</h1>
      {!walletConnected ? (
        <button onClick={connectToWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected to: {walletAddress}</p>
          <button onClick={() => setWalletConnected(false)}>Disconnect</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
