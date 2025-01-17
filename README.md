**# Decentralized Payment Request System#**

## 📌 Project Overview

The **Decentralized Payment Request System** is a blockchain-based smart contract that allows users to request payments from other addresses securely. Once the owner of the requested wallet approves the request, the requested amount is transferred automatically. This system removes the need for intermediaries, ensuring a transparent, secure, and decentralized method of handling payment requests.

## 🚀 Features

- **Secure Payment Requests** – Users can request payments from any address.
- **Owner Approval Mechanism** – Only the owner of the requested address can approve and send payments.
- **Direct Fund Transfer** – Approved requests instantly transfer funds.
- **MetaMask Integration** – Users can interact seamlessly using their MetaMask wallet.
- **Minimal UI (React-based)** – Easy-to-use frontend interface.

## 🏗️ Project Structure**
```sh
Decentralized-Payment-Request/
│── contracts/
│ ├── PaymentRequest.sol # Smart Contract
│
│── frontend/
│ ├── src/
│ │ ├── App.js # React UI
│
│── scripts/
│ ├── deploy.js # Deploy contract
│
│── hardhat.config.js # Hardhat config
│── package.json # Dependencies
│── README.md # Documentation

```

### 📝 Smart Contract (`PaymentRequest.sol`)

The Solidity contract manages:

1. **Creating Payment Requests**
2. **Approving Requests & Transferring Funds**
3. **Retrieving Pending Requests**

### 📌 Contract Methods

| Function Name                                  | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- |
| `createRequest(address owner, uint256 amount)` | Users request payment from a specific address. |
| `approveRequest(uint256 requestIndex)`         | Owner approves the request and sends funds.    |
| `getRequests(address owner)`                   | Fetches pending requests for an address.       |

## 🖥️ Frontend (`App.js`)

The React-based UI allows users to:

- Connect their wallet using MetaMask
- Request payments from any address
- Approve and send payments directly
- View pending payment requests

## 🔧 Setup & Deployment

### 1️⃣ Install Dependencies

npm install --save ethers hardhat

### 2️⃣ Compile & Deploy Smart Contract

npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

### 3️⃣ Start Frontend

cd frontend
npm start

### 🎯 Advantages & Benefits
✅ Decentralized – No central authority controls payments.
✅ Trustless – Transactions execute only when both parties agree.
✅ Transparent – All transactions are stored on the blockchain.
✅ Gas Efficient – Uses optimized Solidity code for minimal gas fees.
✅ Easy Integration – Can be extended to work with any ERC-20 tokens.
