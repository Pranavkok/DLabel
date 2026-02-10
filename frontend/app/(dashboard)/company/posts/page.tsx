"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CompanyPosts() {
    const { token } = useAuth();
    const searchParams = useSearchParams();
    const showCreate = searchParams.get("create") === "true";

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(showCreate);
    const [saving, setSaving] = useState(false);

    // Create form state
    const [datasetName, setDatasetName] = useState("");
    const [labels, setLabels] = useState("");
    const [instructions, setInstructions] = useState("");
    const [amountLocked, setAmountLocked] = useState("");
    const [verificationRequired, setVerificationRequired] = useState(true);

    useEffect(() => {
        if (token) {
            api.company.posts(token).then((res) => setPosts(res.posts)).catch(console.error).finally(() => setLoading(false));
        }
    }, [token]);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        if (!token) return;
        setSaving(true);
        try {
            const labelsArr = labels.split(",").map((l) => l.trim()).filter(Boolean);
            if (labelsArr.length < 2) {
                alert("At least 2 labels required");
                setSaving(false);
                return;
            }
            const res = await api.company.createPost(token, {
                datasetName,
                labels: labelsArr,
                instructions: instructions || undefined,
                amountLocked: parseFloat(amountLocked),
                verificationRequired,
            });
            setPosts((prev) => [{ ...res.post, labeledImages: 0, verifiedImages: 0, progress: "0.0" }, ...prev]);
            setCreating(false);
            setDatasetName("");
            setLabels("");
            setInstructions("");
            setAmountLocked("");
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Posts</h1>
                <button
                    onClick={() => setCreating(!creating)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-hover glow-primary"
                >
                    {creating ? "Cancel" : "+ Create Post"}
                </button>
            </div>

            {/* Create Form */}
            {creating && (
                <form onSubmit={handleCreate} className="glass rounded-2xl p-6 space-y-4 animate-slide-up">
                    <h2 className="text-lg font-semibold">Create New Dataset Post</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-1.5 font-medium">Dataset Name</label>
                            <input
                                type="text"
                                value={datasetName}
                                onChange={(e) => setDatasetName(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm"
                                placeholder="e.g. Cat vs Dog Classification"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-1.5 font-medium">ETH to Lock</label>
                            <input
                                type="number"
                                step="0.001"
                                value={amountLocked}
                                onChange={(e) => setAmountLocked(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm"
                                placeholder="0.1"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-muted mb-1.5 font-medium">Labels (comma-separated, min 2)</label>
                        <input
                            type="text"
                            value={labels}
                            onChange={(e) => setLabels(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm"
                            placeholder="cat, dog, bird"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-muted mb-1.5 font-medium">Instructions (optional)</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-sm resize-none"
                            rows={3}
                            placeholder="Describe how labelers should classify the images..."
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={verificationRequired}
                                onChange={(e) => setVerificationRequired(e.target.checked)}
                                className="w-4 h-4 rounded border-border accent-primary"
                            />
                            Require verification (2/3 consensus)
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-hover glow-primary disabled:opacity-50"
                    >
                        {saving ? "Creating..." : "Create Post"}
                    </button>
                </form>
            )}

            {/* Posts List */}
            {posts.length === 0 && !creating ? (
                <div className="glass rounded-2xl p-12 text-center">
                    <div className="text-5xl mb-4">📊</div>
                    <h2 className="text-xl font-bold mb-2">No Datasets Yet</h2>
                    <p className="text-sm text-muted mb-4">Create your first dataset to start getting labeled data.</p>
                    <button
                        onClick={() => setCreating(true)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-hover"
                    >
                        Create Your First Post
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post, i) => (
                        <Link
                            key={post.id}
                            href={`/company/posts/${post.id}`}
                            className="glass rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 animate-slide-up group"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">{post.datasetName}</h3>
                                    <p className="text-xs text-muted mt-1">
                                        {post.totalImages} images · {Number(post.amountLocked).toFixed(4)} ETH
                                    </p>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full ${post.status === "ACTIVE"
                                        ? "bg-success/10 text-success"
                                        : post.status === "COMPLETED"
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted/10 text-muted"
                                    }`}>
                                    {post.status}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted">
                                    <span>Labeled: {post.labeledImages}</span>
                                    <span>Verified: {post.verifiedImages}</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                                        style={{ width: `${post.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted text-right">{post.progress}% complete</p>
                            </div>

                            {/* Labels */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {((post.labels || []) as string[]).map((label: string) => (
                                    <span key={label} className="text-xs px-2 py-0.5 rounded-lg bg-surface text-muted">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
