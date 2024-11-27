import React, { useState } from "react";
import pinataSDK from "@pinata/sdk";

const pinata = pinataSDK("your_api_key", "your_secret_key"); // Add your Pinata API keys

const ImageUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(null);
    };

    const uploadImage = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await pinata.pinFileToIPFS(formData);
            const imageUrl = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
            onUploadSuccess(imageUrl);
            setUploading(false);
        } catch (err) {
            setError("Error uploading file to Pinata: " + err.message);
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
