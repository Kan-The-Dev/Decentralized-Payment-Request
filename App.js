import { useState } from "react";
import { ethers } from "ethers";
import paymentRequestABI from "./PaymentRequest.json"; // Add ABI after deployment

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [owner, setOwner] = useState("");
    const [amount, setAmount] = useState("");
    const [requests, setRequests] = useState([]);

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Install MetaMask");
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setProvider(web3Provider);
        setSigner(web3Provider.getSigner());
    };

    const requestPayment = async () => {
        if (!signer) return alert("Connect wallet first!");
        const contract = new ethers.Contract(contractAddress, paymentRequestABI.abi, signer);
        const tx = await contract.createRequest(owner, ethers.utils.parseEther(amount));
        await tx.wait();
        alert("Payment request sent!");
    };

    const approveRequest = async (index, requestAmount) => {
        if (!signer) return alert("Connect wallet first!");
        const contract = new ethers.Contract(contractAddress, paymentRequestABI.abi, signer);
        const tx = await contract.approveRequest(index, { value: ethers.utils.parseEther(requestAmount) });
        await tx.wait();
        alert("Request approved & funds sent!");
    };

    const fetchRequests = async () => {
        if (!signer) return;
        const contract = new ethers.Contract(contractAddress, paymentRequestABI.abi, provider);
        const userAddress = await signer.getAddress();
        const userRequests = await contract.getRequests(userAddress);
        setRequests(userRequests);
    };

    return (
        <div>
            <h1>Decentralized Payment Request</h1>
            <button onClick={connectWallet}>Connect Wallet</button>

            <h3>Request Payment</h3>
            <input type="text" placeholder="Owner Address" onChange={(e) => setOwner(e.target.value)} />
            <input type="number" placeholder="Amount (ETH)" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={requestPayment}>Request Payment</button>

            <h3>Pending Requests</h3>
            <button onClick={fetchRequests}>Load Requests</button>
            {requests.map((req, index) => (
                <div key={index}>
                    <p>Amount: {ethers.utils.formatEther(req.amount)} ETH</p>
                    <button onClick={() => approveRequest(index, ethers.utils.formatEther(req.amount))}>
                        Approve & Pay
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;
