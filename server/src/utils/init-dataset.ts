
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const ABI = [
    "function owner() view returns (address)",
    "function createDataset(string datasetId, uint256 durationDays) payable",
    "function datasets(string id) view returns (address company, uint256 totalLocked, uint256 labelingPool, uint256 verificationPool, uint256 totalClaimed, uint256 deadline, bool active)",
    "function getContractBalance() view returns (uint256)"
];

const PRIVATE_KEY = process.env.BACKEND_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

async function main() {
    if (!PRIVATE_KEY || !CONTRACT_ADDRESS) {
        console.error("Missing env vars");
        return;
    }

    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const datasetId = "cdcf12c1-ca4b-4a3a-a7d4-dd90e26dd07b"; // The ID from your error
    const amountToFund = ethers.parseEther("0.001"); // 0.001 ETH

    try {
        console.log(`Checking dataset: ${datasetId}`);
        const ds = await contract.datasets(datasetId);
        console.log("Current Dataset State:", ds);

        // Check active status (last element in struct)
        // Ethers v6 returns a Result object which is array-like.
        // If active is false, we need to create it.
        // Since we can't easily access by name without full ABI json, we use index.
        // Struct: (address company, uint256 totalLocked, ..., bool active)
        // active is usually the last boolean.

        // Let's rely on the output. If it's all zeros/false, we need to create.
        // ds[6] should be active boolean if ABI matches.

        let isActive = false;
        try {
            isActive = ds.active || ds[6];
        } catch (e) {
            isActive = false;
        }

        if (isActive) {
            console.log("Dataset is already active.");
            const balance = await contract.getContractBalance();
            console.log("Contract Balance:", ethers.formatEther(balance));
            if (balance < 1000000000n) { // Check if very low
                console.log("Contract balance is low, maybe refill?");
            }
            return;
        }

        console.log("\nDataset not active. Attempting to create and fund it...");
        console.log("Funding with 0.001 ETH...");

        const tx = await contract.createDataset(datasetId, 30, { value: amountToFund });
        console.log("Transaction sent:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);

        console.log("\nVerifying...");
        const newDs = await contract.datasets(datasetId);
        console.log("New Dataset State:", newDs);

    } catch (e) {
        console.error("Error:", e);
    }
}

main();
