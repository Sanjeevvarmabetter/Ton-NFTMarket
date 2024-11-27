import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import MintNFT from "./MintNFT";

const NFTCollection = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [nftMarketAddress, setNftMarketAddress] = useState("8d1498caca347e96cfc191af194394073b0f82abdabe3aa3ffde32e86425306a");
    const [userAddress, setUserAddress] = useState("0QD_0cdNA9pPwvv2zx6dax6C58HyM987CMndum3tmegDoy0o"); // Example user address

    const handleUploadSuccess = (url) => {
        setImageUrl(url);
        console.log("Image uploaded successfully:", url);
    };

    return (
        <div>
            <h2>My NFT Collection</h2>

            {!imageUrl && (
                <ImageUpload onUploadSuccess={handleUploadSuccess} />
            )}

            {imageUrl && (
                <div>
                    <h3>Preview</h3>
                    <img src={imageUrl} alt="NFT Preview" style={{ maxWidth: "300px" }} />
                    <MintNFT nftMarketAddress={nftMarketAddress} userAddress={userAddress} imageUrl={imageUrl} />
                </div>
            )}
        </div>
    );
};

export default NFTCollection;
