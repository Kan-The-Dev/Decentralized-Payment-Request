import { useState } from "react";
import { ethers } from "ethers";
import paymentRequestABI from "../contracts/PaymentRequest.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS";

function ApproveRequest({ provider }) {
    const [requestIndex, setRequestIndex] = useState("");

    const approvePayment = async () => {
        if (!provider) return alert("Please connect a wallet");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, paymentRequestABI.abi, signer);
        const tx = await contract.approveRequest(requestIndex);
        await tx.wait();
        alert("Request approved!");
    };

    return (
        <div>
            <h3>Approve Payment</h3>
            <input type="number" placeholder="Request Index" onChange={(e) => setRequestIndex(e.target.value)} />
            <button onClick={approvePayment}>Approve</button>
        </div>
    );
}

export default ApproveRequest;
