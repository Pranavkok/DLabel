"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const { token, role } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!token) return;
        api.user.profile(token).then((data) => {
            setProfile(data);
            setName(data.name || "");
        }).catch(console.error).finally(() => setLoading(false));
    }, [token]);

    async function handleSave() {
        if (!token) return;
        setSaving(true);
        try {
            const updated = await api.user.updateProfile(token, { name });
            setProfile((prev: any) => ({ ...prev, ...updated }));
            setEditing(false);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!profile) return null;

    const tierColors: Record<string, string> = {
        Bronze: "text-warning",
        Silver: "text-muted",
        Gold: "text-warning",
        Platinum: "text-secondary",
        Diamond: "text-primary",
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Profile</h1>

            {/* Avatar & Basic Info */}
            <div className="glass rounded-2xl p-8 text-center animate-slide-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">
                    {(profile.name || "U").charAt(0).toUpperCase()}
                </div>
                {editing ? (
                    <div className="max-w-xs mx-auto space-y-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm text-center"
                            placeholder="Your name"
                        />
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="flex-1 py-2 rounded-xl border border-border text-sm text-muted hover:text-foreground transition-all">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-50">
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold">{profile.name || "Anonymous Labeler"}</h2>
                        <p className="text-xs text-muted font-mono mt-1">{profile.walletAddress}</p>
                        <button onClick={() => setEditing(true)} className="mt-3 text-xs text-primary hover:underline">
                            Edit Name
                        </button>
                    </>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="glass rounded-2xl p-5">
                    <p className="text-xs text-muted uppercase tracking-wider">Reputation</p>
                    <p className="text-2xl font-bold mt-1">{profile.reputation}</p>
                    <p className={`text-xs mt-1 ${tierColors[profile.tier] || "text-muted"}`}>
                        {profile.tier} Tier · {profile.multiplier}x
                    </p>
                </div>
                <div className="glass rounded-2xl p-5">
                    <p className="text-xs text-muted uppercase tracking-wider">Labels Submitted</p>
                    <p className="text-2xl font-bold mt-1">{profile.labelsSubmitted}</p>
                </div>
                <div className="glass rounded-2xl p-5">
                    <p className="text-xs text-muted uppercase tracking-wider">Verified Correct</p>
                    <p className="text-2xl font-bold mt-1 text-success">{profile.labelsVerifiedCorrect}</p>
                </div>
                <div className="glass rounded-2xl p-5">
                    <p className="text-xs text-muted uppercase tracking-wider">Verifications Done</p>
                    <p className="text-2xl font-bold mt-1 text-secondary">{profile.verificationsDone}</p>
                </div>
            </div>

            {/* Tokens */}
            <div className="glass rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-sm font-medium text-muted mb-4">Token Overview</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Total Earned</span>
                        <span className="font-semibold">{Number(profile.tokensEarned).toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Claimed</span>
                        <span className="font-semibold text-success">{Number(profile.tokensClaimed).toFixed(4)} ETH</span>
                    </div>
                </div>
            </div>

            {/* Member Since */}
            <div className="text-center text-xs text-muted animate-slide-up" style={{ animationDelay: "0.3s" }}>
                Member since {new Date(profile.createdAt).toLocaleDateString()}
                {profile.lastActive && ` · Last active ${new Date(profile.lastActive).toLocaleDateString()}`}
            </div>
        </div>
    );
}
