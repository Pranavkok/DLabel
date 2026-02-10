"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useWriteContract, usePublicClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

export default function EarningsPage() {
    const { token } = useAuth();
    const [earningsData, setEarningsData] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);

    // We use writeContractAsync for imperative calls
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();

    useEffect(() => {
        if (!token) return;
        Promise.all([
            api.user.earnings(token),
            api.user.transactions(token),
        ]).then(([e, t]) => {
            setEarningsData(e);
            setTransactions(t.transactions);
        }).catch(console.error)
            .finally(() => setLoading(false));
    }, [token]);

    async function handleClaim() {
        if (!token || claiming || !publicClient) return;
        setClaiming(true);
        try {
            const res = await api.user.claim(token);

            if (!res.claims || res.claims.length === 0) {
                alert("No claims available");
                setClaiming(false);
                return;
            }

            let completed = 0;
            const total = res.claims.length;

            for (const claim of res.claims) {
                // Call smart contract
                const txHash = await writeContractAsync({
                    address: CONTRACT_ADDRESS,
                    abi: CONTRACT_ABI,
                    functionName: "claimTokens",
                    args: [claim.datasetId, BigInt(claim.amountInWei), BigInt(claim.nonce), claim.signature as `0x${string}`],
                });

                // Wait for confirmation
                await publicClient.waitForTransactionReceipt({ hash: txHash });

                // Confirm with backend
                await api.transactions.confirm(token, claim.transactionId, txHash);

                completed++;
            }

            // Refresh data
            const [e, t] = await Promise.all([
                api.user.earnings(token),
                api.user.transactions(token)
            ]);
            setEarningsData(e);
            setTransactions(t.transactions);

            alert(`Successfully claimed ${completed} datasets!`);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Claim failed");
        } finally {
            setClaiming(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!earningsData) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">My Earnings</h1>

            {/* Earnings overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-6 animate-slide-up">
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">Total Earned</p>
                    <p className="text-3xl font-bold mt-2 gradient-text">{earningsData.totalEarned.toFixed(4)} ETH</p>
                    <p className="text-xs text-muted mt-1">
                        {earningsData.tier} · {earningsData.multiplier}x multiplier
                    </p>
                </div>
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">Claimed</p>
                    <p className="text-3xl font-bold mt-2 text-success">{earningsData.tokensClaimed.toFixed(4)} ETH</p>
                </div>
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">Pending Claim</p>
                    <p className="text-3xl font-bold mt-2 gradient-text-warm">{earningsData.pendingClaim.toFixed(4)} ETH</p>
                    {earningsData.pendingClaim > 0 && (
                        <button
                            onClick={handleClaim}
                            disabled={claiming}
                            className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-hover glow-primary disabled:opacity-50"
                        >
                            {claiming
                                ? "Processing Claims..."
                                : "Claim ETH →"}
                        </button>
                    )}
                </div>
            </div>

            {/* Earnings by post */}
            {earningsData.byPost?.length > 0 && (
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <h2 className="text-lg font-semibold mb-4">Earnings by Dataset</h2>
                    <div className="space-y-3">
                        {earningsData.byPost.map((p: any) => (
                            <div key={p.postId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium">{p.datasetName}</p>
                                    <p className="text-xs text-muted">{p.verifiedLabels} verified labels</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Transaction History */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
                {transactions.length === 0 ? (
                    <p className="text-sm text-muted text-center py-8">No transactions yet</p>
                ) : (
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${tx.status === "COMPLETED" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                                        }`}>
                                        {tx.status === "COMPLETED" ? "✓" : "⏳"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{tx.type}</p>
                                        <p className="text-xs text-muted">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">{tx.amount.toFixed(4)} ETH</p>
                                    {tx.transactionHash && (
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline"
                                        >
                                            View on Etherscan ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
