"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CompanyDashboard() {
    const { token } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.company.dashboard(token).then(setData).catch(console.error).finally(() => setLoading(false));
        }
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return <p className="text-muted">Failed to load dashboard</p>;

    const { company, stats } = data;

    const statCards = [
        { label: "Total Posts", value: stats.totalPosts, icon: "▤", color: "from-primary to-primary/50" },
        { label: "Active Posts", value: stats.activePosts, icon: "⚡", color: "from-secondary to-secondary/50" },
        { label: "Total Images", value: stats.totalImages, icon: "🖼", color: "from-accent to-accent/50" },
        { label: "ETH Locked", value: `${stats.totalEthLocked.toFixed(4)} ETH`, icon: "🔒", color: "from-warning to-warning/50" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {company.name}</h1>
                    <p className="text-sm text-muted mt-1">{company.email}</p>
                </div>
                <Link
                    href="/company/posts?create=true"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-hover glow-primary"
                >
                    + Create Post
                </Link>
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

            {/* Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.35s" }}>
                    <h3 className="text-sm font-medium text-muted mb-4">Labeling Progress</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="text-muted">Labeled</span>
                                <span className="font-semibold">{stats.labeledImages} / {stats.totalImages}</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                                    style={{ width: stats.totalImages > 0 ? `${(stats.labeledImages / stats.totalImages) * 100}%` : "0%" }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1.5">
                                <span className="text-muted">Verified</span>
                                <span className="font-semibold">{stats.verifiedImages} / {stats.totalImages}</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-success to-success/70 transition-all duration-500"
                                    style={{ width: stats.totalImages > 0 ? `${(stats.verifiedImages / stats.totalImages) * 100}%` : "0%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    <h3 className="text-sm font-medium text-muted mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Completed Datasets</span>
                            <span className="font-semibold text-success">{stats.completedPosts}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Active Datasets</span>
                            <span className="font-semibold text-secondary">{stats.activePosts}</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Total ETH Locked</span>
                            <span className="font-bold gradient-text">{stats.totalEthLocked.toFixed(4)} ETH</span>
                        </div>
                    </div>
                    <Link
                        href="/company/posts"
                        className="mt-4 w-full flex items-center justify-center py-2.5 rounded-xl border border-border hover:border-border-hover text-sm font-medium text-muted hover:text-foreground transition-all"
                    >
                        View All Posts →
                    </Link>
                </div>
            </div>
        </div>
    );
}
