import React from "react";
import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="/manifest.json">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
        {/* Navbar */}
        <nav style={{ width: "100%", padding: "10px 20px", backgroundColor: "#282c34", color: "white" }}>
          <h1 style={{ margin: 0 }}>My TON App</h1>
        </nav>

        {/* Connect Button */}
        <div style={{ marginTop: "20px" }}>
          <TonConnectButton />
        </div>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
