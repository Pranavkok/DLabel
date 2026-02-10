"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function UserSignIn() {
    const { connectors, connect } = useConnect();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { loginUser, isAuthenticated, role } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && role === "user") {
            router.push("/user/dashboard");
        }
    }, [isAuthenticated, role, router]);

    // Auto-authenticate when wallet connected
    useEffect(() => {
        if (isConnected && address && !isAuthenticated) {
            handleAuth(address);
        }
    }, [isConnected, address]);

    async function handleAuth(walletAddress: string) {
        setLoading(true);
        setError("");
        try {
            const res = await api.auth.connectWallet(walletAddress);
            loginUser(res.token, res.user);
            router.push("/user/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to connect");
            disconnect();
        } finally {
            setLoading(false);
        }
    }

    const injectedConnector = connectors.find((c) => c.id === "injected" || c.name === "MetaMask");

    return (
        <div className="min-h-screen bg-grid flex items-center justify-center relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md px-6 animate-slide-up">
                {/* Back link */}
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block">
                    ← Back to home
                </Link>

                <div className="glass rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                            DL
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
                        <p className="text-sm text-muted">
                            Sign in with MetaMask to start labeling data and earning ETH
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
                            {error}
                        </div>
                    )}

                    {/* Connect Button */}
                    {injectedConnector && (
                        <button
                            onClick={() => connect({ connector: injectedConnector })}
                            disabled={loading || isConnected}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold transition-all btn-hover glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                    </svg>
                                    Connect MetaMask
                                </>
                            )}
                        </button>
                    )}

                    {!injectedConnector && (
                        <div className="text-center text-sm text-muted py-4">
                            <p className="mb-2">MetaMask not detected</p>
                            <a
                                href="https://metamask.io/download/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                Install MetaMask →
                            </a>
                        </div>
                    )}

                    {/* Separator */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted">or</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Company link */}
                    <Link
                        href="/auth/company"
                        className="w-full flex items-center justify-center px-6 py-3 rounded-xl border border-border hover:border-border-hover text-sm font-medium text-muted hover:text-foreground transition-all"
                    >
                        Sign in as Company →
                    </Link>
                </div>

                {/* Network info */}
                <p className="text-center text-xs text-muted mt-6">
                    Connected to <span className="text-primary">Sepolia Testnet</span>
                </p>
            </div>
        </div>
    );
}
