const hre = require("hardhat");

async function main() {
    const PaymentRequest = await hre.ethers.getContractFactory("PaymentRequest");
    const paymentRequest = await PaymentRequest.deploy();
    await paymentRequest.deployed();
    console.log("Contract deployed at:", paymentRequest.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
