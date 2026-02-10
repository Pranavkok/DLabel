"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserDashboard() {
    const { token, user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.user.dashboard(token).then(setData).catch(console.error).finally(() => setLoading(false));
        }
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return <p className="text-muted">Failed to load dashboard</p>;

    const { stats, earnings, overview } = data;

    const statCards = [
        { label: "Total Labeled", value: stats.labelsSubmitted, icon: "🏷", color: "from-primary to-primary/50" },
        { label: "Total Verified", value: stats.verificationsDone, icon: "✓", color: "from-secondary to-secondary/50" },
        { label: "Reputation", value: data.user.reputation, icon: "⭐", color: "from-warning to-warning/50" },
        { label: "Token Balance", value: `${earnings.pendingClaim.toFixed(4)} ETH`, icon: "◈", color: "from-success to-success/50" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back
                    {data.user.name ? `, ${data.user.name}` : ""}
                </h1>
                <p className="text-muted mt-1">
                    <span className="font-mono text-xs bg-surface px-2 py-1 rounded-lg">
                        {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
                    </span>
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div
                        key={card.label}
                        className="glass rounded-2xl p-5 hover:bg-card-hover transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-muted font-medium uppercase tracking-wider">{card.label}</p>
                                <p className="text-2xl font-bold mt-2">{card.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Accuracy & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Accuracy Card */}
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.35s" }}>
                    <h3 className="text-sm font-medium text-muted mb-4">Accuracy</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface)" strokeWidth="6" />
                                <circle
                                    cx="40" cy="40" r="34" fill="none" stroke="url(#gradient)" strokeWidth="6"
                                    strokeDasharray={`${Number(stats.accuracy) * 2.136} 213.6`}
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--color-primary)" />
                                        <stop offset="100%" stopColor="var(--color-secondary)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold">{stats.accuracy}%</span>
                            </div>
                        </div>
                        <div className="text-sm space-y-1">
                            <p><span className="text-success">✓</span> {stats.labelsVerifiedCorrect} correct</p>
                            <p><span className="text-danger">✗</span> {stats.labelsVerifiedIncorrect} incorrect</p>
                        </div>
                    </div>
                </div>

                {/* Earnings Overview */}
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    <h3 className="text-sm font-medium text-muted mb-4">Earnings</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Total Earned</span>
                            <span className="font-semibold">{earnings.totalEarned.toFixed(4)} ETH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Claimed</span>
                            <span className="font-semibold text-success">{earnings.tokensClaimed.toFixed(4)} ETH</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Pending</span>
                            <span className="font-bold gradient-text">{earnings.pendingClaim.toFixed(4)} ETH</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.45s" }}>
                    <h3 className="text-sm font-medium text-muted mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link
                            href="/user/label"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-sm font-medium hover:border-primary/40 transition-all"
                        >
                            <span>🏷</span> Start Labeling
                            {overview.availablePosts > 0 && (
                                <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                    {overview.availablePosts} available
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/user/verify"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 text-sm font-medium hover:border-secondary/40 transition-all"
                        >
                            <span>✓</span> Verify Labels
                        </Link>
                        <Link
                            href="/user/earnings"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 text-sm font-medium hover:border-success/40 transition-all"
                        >
                            <span>◈</span> Claim Earnings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
