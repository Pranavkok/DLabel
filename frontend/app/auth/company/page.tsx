"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CompanySignIn() {
    const { loginCompany, isAuthenticated, role } = useAuth();
    const router = useRouter();
    const [tab, setTab] = useState<"login" | "register">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Register form
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regWallet, setRegWallet] = useState("");

    useEffect(() => {
        if (isAuthenticated && role === "company") {
            router.push("/company/dashboard");
        }
    }, [isAuthenticated, role, router]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.auth.companyLogin(email, password);
            loginCompany(res.token, res.company);
            router.push("/company/dashboard");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.auth.companyRegister({
                email: regEmail,
                password: regPassword,
                name: regName,
                walletAddress: regWallet,
            });
            loginCompany(res.token, res.company);
            router.push("/company/dashboard");
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-grid flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md px-6 animate-slide-up">
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block">
                    ← Back to home
                </Link>

                <div className="glass rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                            DL
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Company Portal</h1>
                        <p className="text-sm text-muted">
                            Create datasets and get labeled AI training data
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 p-1 rounded-xl bg-surface mb-6">
                        <button
                            onClick={() => { setTab("login"); setError(""); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "login" ? "bg-card text-foreground" : "text-muted hover:text-foreground"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setTab("register"); setError(""); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "register" ? "bg-card text-foreground" : "text-muted hover:text-foreground"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login form */}
                    {tab === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                                    placeholder="company@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold transition-all btn-hover glow-primary disabled:opacity-50"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    )}

                    {/* Register form */}
                    {tab === "register" && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Company Name</label>
                                <input
                                    type="text"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                                    placeholder="Acme AI Labs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                                    placeholder="admin@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Password</label>
                                <input
                                    type="password"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm transition-colors"
                                    placeholder="Min 6 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted mb-1.5 font-medium">Wallet Address</label>
                                <input
                                    type="text"
                                    value={regWallet}
                                    onChange={(e) => setRegWallet(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm font-mono transition-colors"
                                    placeholder="0x..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold transition-all btn-hover glow-primary disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </form>
                    )}

                    {/* Separator */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted">or</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <Link
                        href="/auth/user"
                        className="w-full flex items-center justify-center px-6 py-3 rounded-xl border border-border hover:border-border-hover text-sm font-medium text-muted hover:text-foreground transition-all"
                    >
                        Sign in as Labeler →
                    </Link>
                </div>
            </div>
        </div>
    );
}
