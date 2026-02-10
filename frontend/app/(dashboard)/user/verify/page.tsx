"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

export default function VerifyPage() {
    const { token } = useAuth();
    const [imageData, setImageData] = useState<any>(null);
    const [postData, setPostData] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const fetchNext = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await api.verify.next(token);
            if (res.image) {
                setImageData(res.image);
                setPostData(res.post);
                setMessage("");
            } else {
                setImageData(null);
                setPostData(null);
                setMessage(res.message || "No images to verify");
            }
        } catch (err: any) {
            setMessage(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchNext(); }, [fetchNext]);

    async function handleVote(vote: "YES" | "NO") {
        if (!token || !imageData || submitting) return;
        setSubmitting(true);
        try {
            const res = await api.verify.submit(token, imageData.id, vote);
            setResult({ success: res.success, message: res.message });
            setAnimating(true);
            setTimeout(() => {
                setAnimating(false);
                fetchNext();
            }, 500);
        } catch (err: any) {
            setResult({ success: false, message: err.message });
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted">Loading next verification...</p>
                </div>
            </div>
        );
    }

    if (!imageData) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="glass rounded-2xl p-12 text-center max-w-md">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-xl font-bold mb-2">All Caught Up</h2>
                    <p className="text-sm text-muted">{message || "No images need verification right now."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Validate the Data</h1>
                    <p className="text-sm text-muted mt-1">
                        Dataset: <span className="text-foreground font-medium">{postData?.datasetName}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="bg-surface px-2 py-1 rounded-lg">
                        {imageData.currentVotes}/{imageData.requiredVotes} votes
                    </span>
                </div>
            </div>

            {/* Image + Label Card */}
            <div className={`glass rounded-2xl overflow-hidden ${animating ? "animate-swipe-up" : "animate-swipe-in"}`}>
                <div className="aspect-[4/3] bg-surface flex items-center justify-center overflow-hidden">
                    <img
                        src={imageData.imageUrl}
                        alt="Image to verify"
                        className="w-full h-full object-contain"
                        draggable={false}
                    />
                </div>

                <div className="p-6 space-y-4">
                    {/* Assigned Label */}
                    <div className="text-center">
                        <p className="text-xs text-muted mb-2">Assigned Label</p>
                        <span className="inline-block px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold text-lg">
                            {imageData.assignedLabel}
                        </span>
                    </div>

                    {/* Question */}
                    <p className="text-center text-sm font-medium">
                        Is this label correct?
                    </p>

                    {/* Vote buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleVote("YES")}
                            disabled={submitting}
                            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-success/10 border border-success/20 hover:bg-success/20 hover:border-success/40 text-success font-semibold text-lg transition-all btn-hover disabled:opacity-50"
                        >
                            ✓ Yes
                        </button>
                        <button
                            onClick={() => handleVote("NO")}
                            disabled={submitting}
                            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-danger/10 border border-danger/20 hover:bg-danger/20 hover:border-danger/40 text-danger font-semibold text-lg transition-all btn-hover disabled:opacity-50"
                        >
                            ✗ No
                        </button>
                    </div>
                </div>
            </div>

            {/* Result toast */}
            {result && (
                <div
                    className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium shadow-xl animate-slide-up z-50 ${result.success
                            ? "bg-success/10 border border-success/20 text-success"
                            : "bg-danger/10 border border-danger/20 text-danger"
                        }`}
                >
                    {result.message}
                </div>
            )}
        </div>
    );
}
