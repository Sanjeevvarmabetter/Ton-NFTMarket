import React, { useState } from "react";
import { TonConnect } from "@tonconnect/sdk";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    const tonConnect = new TonConnect({
      manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
    });

    try {
      const wallet = await tonConnect.connect();
      setWalletAddress(wallet?.address);
      console.log("Wallet connected:", wallet);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>NFT Marketplace</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0088cc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Connect to Tonkeeper
      </button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
    </div>
  );
};

export default App;
