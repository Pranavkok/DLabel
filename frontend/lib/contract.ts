export const CONTRACT_ADDRESS = "0x245425bA042CF55D9B6e3526bF48e67B1F44F9cf" as const;

export const CONTRACT_ABI = [
    {
        inputs: [{ internalType: "string", name: "datasetId", type: "string" }, { internalType: "uint256", name: "amount", type: "uint256" }, { internalType: "uint256", name: "nonce", type: "uint256" }, { internalType: "bytes", name: "signature", type: "bytes" }],
        name: "claimTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "datasetId", type: "string" }, { internalType: "uint256", name: "durationDays", type: "uint256" }],
        name: "createDataset",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "datasetId", type: "string" }],
        name: "getDatasetInfo",
        outputs: [{ internalType: "address", name: "company", type: "address" }, { internalType: "uint256", name: "totalLocked", type: "uint256" }, { internalType: "uint256", name: "totalClaimed", type: "uint256" }, { internalType: "uint256", name: "remaining", type: "uint256" }, { internalType: "uint256", name: "deadline", type: "uint256" }, { internalType: "bool", name: "active", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getContractBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "datasetId", type: "string" }],
        name: "withdrawUnused",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
