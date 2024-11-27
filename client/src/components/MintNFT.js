import React, { useState } from "react";
import TonWeb from "tonweb"; // TON Web library

const tonweb = new TonWeb(); // Initialize TON Web client

const MintNFT = ({ nftMarketAddress, userAddress, imageUrl }) => {
    const [isMinting, setIsMinting] = useState(false);
    const [mintError, setMintError] = useState(null);

    const mintNFT = async () => {
        if (!imageUrl) {
            alert("Image URL is required to mint NFT");
            return;
        }

        setIsMinting(true);
        setMintError(null);

        try {
            const contract = tonweb.contract(nftMarketAddress); // Define contract at market address
            const wallet = new TonWeb.wallet.all.v3R2({ publicKey: userAddress });

            // Mint transaction payload
            const mintTransaction = {
                to: contract.address,
                value: tonweb.utils.toNano("0.1"), // Adjust value as needed
                bounce: false,
                body: new TonWeb.boc.Cell() // Replace with actual minting data (e.g., the image hash)
            };

            // Call contract method for minting
            await contract.methods.mint(userAddress).send(mintTransaction);
            console.log("Minting success!");
        } catch (error) {
            setMintError(error.message);
            console.error("Minting failed:", error);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div>
            <button onClick={mintNFT} disabled={isMinting}>
                {isMinting ? "Minting..." : "Mint NFT"}
            </button>
            {mintError && <p style={{ color: "red" }}>{mintError}</p>}
        </div>
    );
};

export default MintNFT;
