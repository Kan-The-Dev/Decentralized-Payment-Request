import { useState } from "react";
import { ethers } from "ethers";
import paymentRequestABI from "../contracts/PaymentRequest.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS";

function RequestForm({ provider }) {
    const [owner, setOwner] = useState("");
    const [amount, setAmount] = useState("");

    const requestPayment = async () => {
        if (!provider) return alert("Please connect a wallet");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, paymentRequestABI.abi, signer);
        const tx = await contract.createRequest(owner, ethers.utils.parseEther(amount));
        await tx.wait();
        alert("Payment request sent!");
    };

    return (
        <div>
            <h3>Request Payment</h3>
            <input type="text" placeholder="Owner Address" onChange={(e) => setOwner(e.target.value)} />
            <input type="number" placeholder="Amount (ETH)" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={requestPayment}>Request Payment</button>
        </div>
    );
}

export default RequestForm;
