"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function CompanyProfile() {
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [wallet, setWallet] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!token) return;
        api.company.profile(token).then((data) => {
            setProfile(data);
            setName(data.name || "");
            setWallet(data.walletAddress || "");
        }).catch(console.error).finally(() => setLoading(false));
    }, [token]);

    async function handleSave() {
        if (!token) return;
        setSaving(true);
        try {
            const updated = await api.company.updateProfile(token, {
                name: name || undefined,
                walletAddress: wallet || undefined,
            });
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

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Company Profile</h1>

            {/* Avatar & Info */}
            <div className="glass rounded-2xl p-8 text-center animate-slide-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">
                    {(profile.name || "C").charAt(0).toUpperCase()}
                </div>

                {editing ? (
                    <div className="max-w-sm mx-auto space-y-4">
                        <div>
                            <label className="block text-xs text-muted mb-1.5 font-medium text-left">Company Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-1.5 font-medium text-left">Wallet Address</label>
                            <input
                                type="text"
                                value={wallet}
                                onChange={(e) => setWallet(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm font-mono"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm text-muted hover:text-foreground transition-all">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium disabled:opacity-50">
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold">{profile.name}</h2>
                        <p className="text-sm text-muted mt-1">{profile.email}</p>
                        <p className="text-xs text-muted font-mono mt-1">{profile.walletAddress}</p>
                        <button onClick={() => setEditing(true)} className="mt-3 text-xs text-primary hover:underline">
                            Edit Profile
                        </button>
                    </>
                )}
            </div>

            {/* Details */}
            <div className="glass rounded-2xl p-6 space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-sm font-medium text-muted mb-2">Account Details</h3>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Email</span>
                    <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Wallet</span>
                    <span className="font-mono text-xs">{profile.walletAddress}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted">Member Since</span>
                    <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
