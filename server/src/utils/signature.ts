import { ethers } from "ethers";

export async function generateClaimSignature(
    userWallet: string,
    datasetId: string,
    amountInWei: bigint,
    nonce: number
): Promise<string> {
    const privateKey = process.env.BACKEND_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("BACKEND_PRIVATE_KEY not set in environment variables");
    }

    const backendWallet = new ethers.Wallet(privateKey);

    const messageHash = ethers.solidityPackedKeccak256(
        ["address", "string", "uint256", "uint256"],
        [userWallet, datasetId, amountInWei, nonce]
    );

    return await backendWallet.signMessage(ethers.getBytes(messageHash));
}
