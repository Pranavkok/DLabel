"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

export default function LabelPage() {
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
            const res = await api.label.next(token);
            if (res.image) {
                setImageData(res.image);
                setPostData(res.post);
                setMessage("");
            } else {
                setImageData(null);
                setPostData(null);
                setMessage(res.message || "No images available");
            }
        } catch (err: any) {
            setMessage(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchNext(); }, [fetchNext]);

    async function handleLabel(label: string) {
        if (!token || !imageData || submitting) return;
        setSubmitting(true);
        try {
            const res = await api.label.submit(token, imageData.id, label);
            setResult({ success: res.success, message: res.message });

            // Animate out and load next
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
                    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted">Loading next image...</p>
                </div>
            </div>
        );
    }

    if (!imageData) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="glass rounded-2xl p-12 text-center max-w-md">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-xl font-bold mb-2">No Images Available</h2>
                    <p className="text-sm text-muted">{message || "Check back later for new datasets to label."}</p>
                </div>
            </div>
        );
    }

    const labels = (postData?.labels || []) as string[];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Label the Data</h1>
                    <p className="text-sm text-muted mt-1">
                        Dataset: <span className="text-foreground font-medium">{postData?.datasetName}</span>
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted">Reward</p>
                    <p className="text-sm font-bold gradient-text">{imageData.tokenValue?.toFixed(6)} ETH</p>
                </div>
            </div>

            {/* Instructions */}
            {postData?.instructions && (
                <div className="glass rounded-xl p-4 text-sm text-muted">
                    <span className="text-primary font-medium">Instructions:</span> {postData.instructions}
                </div>
            )}

            {/* Image Card */}
            <div className={`glass rounded-2xl overflow-hidden ${animating ? "animate-swipe-up" : "animate-swipe-in"}`}>
                <div className="aspect-[4/3] bg-surface flex items-center justify-center overflow-hidden">
                    <img
                        src={imageData.imageUrl}
                        alt="Image to label"
                        className="w-full h-full object-contain"
                        draggable={false}
                    />
                </div>

                {/* Label buttons */}
                <div className="p-6">
                    <p className="text-sm text-muted text-center mb-4">Select the correct label:</p>
                    <div className="grid grid-cols-2 gap-3">
                        {labels.map((label: string) => (
                            <button
                                key={label}
                                onClick={() => handleLabel(label)}
                                disabled={submitting}
                                className="px-4 py-3 rounded-xl border border-border hover:border-primary bg-surface hover:bg-primary/10 text-sm font-medium transition-all btn-hover disabled:opacity-50"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Result toast */}
            {result && (
                <div
                    className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium shadow-xl animate-slide-up ${result.success
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
