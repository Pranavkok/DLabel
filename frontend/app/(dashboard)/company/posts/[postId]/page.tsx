"use client";

import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function PostDetail({ params }: { params: Promise<{ postId: string }> }) {
    const { postId } = use(params);
    const { token } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [images, setImages] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [page, setPage] = useState(1);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!token) return;
        api.company.post(token, postId).then((res) => setPost(res.post)).catch(console.error);
    }, [token, postId]);

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        api.company.postImages(token, postId, page, 20, statusFilter || undefined)
            .then((res) => {
                setImages(res.images);
                setPagination(res.pagination);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [token, postId, page, statusFilter]);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !token) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("postId", postId);
            formData.append("zipFile", file);
            const res = await api.company.uploadImages(token, formData);
            alert(`Uploaded ${res.totalUploaded} images!`);
            // Refresh
            api.company.post(token, postId).then((r) => setPost(r.post));
            api.company.postImages(token, postId, 1, 20).then((r) => {
                setImages(r.images);
                setPagination(r.pagination);
            });
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const statusTabs = [
        { label: "All", value: "" },
        { label: "Unlabeled", value: "UNLABELED" },
        { label: "Pending", value: "PENDING_VERIFICATION" },
        { label: "Verified", value: "VERIFIED" },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted">
                <Link href="/company/posts" className="hover:text-foreground transition-colors">My Posts</Link>
                <span>/</span>
                <span className="text-foreground">{post.datasetName}</span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{post.datasetName}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${post.status === "ACTIVE" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                            }`}>
                            {post.status}
                        </span>
                        <span className="text-xs text-muted">{post.totalImages} images</span>
                        <span className="text-xs text-muted">{Number(post.amountLocked).toFixed(4)} ETH locked</span>
                    </div>
                </div>
                <label className={`px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all btn-hover ${uploading
                        ? "bg-surface text-muted"
                        : "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                    }`}>
                    {uploading ? "Uploading..." : "Upload ZIP"}
                    <input type="file" accept=".zip" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Labeled", value: (post.imageCounts.pendingVerification + post.imageCounts.verified), color: "text-secondary" },
                    { label: "Verified", value: post.imageCounts.verified, color: "text-success" },
                    { label: "Not Labeled", value: post.imageCounts.unlabeled, color: "text-warning" },
                    { label: "Pending Verify", value: post.imageCounts.pendingVerification, color: "text-accent" },
                ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-4">
                        <p className="text-xs text-muted">{s.label}</p>
                        <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-surface w-fit">
                {statusTabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => { setStatusFilter(tab.value); setPage(1); }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === tab.value ? "bg-card text-foreground" : "text-muted hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Images Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
            ) : images.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                    <p className="text-muted">No images found. Upload a ZIP file to get started.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="glass rounded-xl overflow-hidden group">
                                <div className="aspect-square bg-surface overflow-hidden">
                                    <img
                                        src={img.imageUrl}
                                        alt="Dataset image"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        draggable={false}
                                    />
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${img.status === "VERIFIED"
                                                ? "bg-success/10 text-success"
                                                : img.status === "PENDING_VERIFICATION"
                                                    ? "bg-warning/10 text-warning"
                                                    : "bg-muted/10 text-muted"
                                            }`}>
                                            {img.status === "PENDING_VERIFICATION" ? "Pending" : img.status === "VERIFIED" ? "Verified" : "Unlabeled"}
                                        </span>
                                        {img.verificationCount > 0 && (
                                            <span className="text-xs text-muted">{img.verificationCount}/3 votes</span>
                                        )}
                                    </div>
                                    {img.assignedLabel && (
                                        <p className="text-xs mt-1.5 font-medium truncate">{img.assignedLabel}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-surface transition-all"
                            >
                                ← Prev
                            </button>
                            <span className="text-sm text-muted">
                                {page} / {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-surface transition-all"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
