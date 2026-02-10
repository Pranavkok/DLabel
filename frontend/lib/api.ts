const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type RequestOptions = {
    method?: string;
    body?: unknown;
    token?: string | null;
    headers?: Record<string, string>;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, token, headers: extraHeaders } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...extraHeaders,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return data as T;
}

// Upload with FormData (for ZIP files)
async function upload<T>(endpoint: string, formData: FormData, token?: string | null): Promise<T> {
    const headers: Record<string, string> = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data as T;
}

// ====== AUTH ======
export const api = {
    auth: {
        connectWallet: (walletAddress: string) =>
            request<{ token: string; user: { id: string; walletAddress: string; name: string | null; reputation: number } }>("/api/auth/connect", { method: "POST", body: { walletAddress } }),
        companyLogin: (email: string, password: string) =>
            request<{ token: string; company: { id: string; name: string; email: string; walletAddress: string } }>("/api/auth/company/login", { method: "POST", body: { email, password } }),
        companyRegister: (data: { email: string; password: string; name: string; walletAddress: string }) =>
            request<{ token: string; company: { id: string; name: string; email: string; walletAddress: string } }>("/api/auth/company/register", { method: "POST", body: data }),
    },

    // ====== USER ======
    user: {
        dashboard: (token: string) =>
            request<{ user: any; stats: any; earnings: any; overview: any }>("/api/user/dashboard", { token }),
        profile: (token: string) =>
            request<any>("/api/user/profile", { token }),
        updateProfile: (token: string, data: { name: string }) =>
            request<any>("/api/user/profile", { method: "PUT", token, body: data }),
        earnings: (token: string) =>
            request<any>("/api/user/earnings", { token }),
        transactions: (token: string) =>
            request<{ transactions: any[] }>("/api/user/transactions", { token }),
        claim: (token: string) =>
            request<{ transactionId: string; amount: number; amountInWei: string; nonce: number; signature: string; walletAddress: string }>("/api/user/claim", { method: "POST", token }),
    },

    // ====== LABEL ======
    label: {
        next: (token: string) =>
            request<{ image: any; post: any; message?: string }>("/api/label/next", { token }),
        submit: (token: string, imageId: string, label: string) =>
            request<{ success: boolean; imageId: string; label: string; status: string; message: string }>("/api/label/submit", { method: "POST", token, body: { imageId, label } }),
    },

    // ====== VERIFY ======
    verify: {
        next: (token: string) =>
            request<{ image: any; post: any; message?: string }>("/api/verify/next", { token }),
        submit: (token: string, imageId: string, vote: "YES" | "NO") =>
            request<{ success: boolean; message: string; votesRecorded: number; requiredVotes: number }>("/api/verify/submit", { method: "POST", token, body: { imageId, vote } }),
    },

    // ====== COMPANY ======
    company: {
        dashboard: (token: string) =>
            request<{ company: any; stats: any }>("/api/company/dashboard", { token }),
        createPost: (token: string, data: any) =>
            request<{ post: any }>("/api/company/post/create", { method: "POST", token, body: data }),
        uploadImages: (token: string, formData: FormData) =>
            upload<{ success: boolean; totalUploaded: number; postId: string; tokenValuePerImage: number; images: any[] }>("/api/company/post/images", formData, token),
        posts: (token: string) =>
            request<{ posts: any[] }>("/api/company/posts", { token }),
        post: (token: string, postId: string) =>
            request<{ post: any }>(`/api/company/posts/${postId}`, { token }),
        postImages: (token: string, postId: string, page = 1, limit = 20, status?: string) =>
            request<{ images: any[]; pagination: any }>(`/api/company/posts/${postId}/images?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`, { token }),
        profile: (token: string) =>
            request<any>("/api/company/profile", { token }),
        updateProfile: (token: string, data: any) =>
            request<any>("/api/company/profile", { method: "PUT", token, body: data }),
    },

    // ====== TRANSACTIONS ======
    transactions: {
        get: (token: string, id: string) =>
            request<any>(`/api/transactions/${id}`, { token }),
        confirm: (token: string, transactionId: string, transactionHash: string) =>
            request<any>("/api/transactions/confirm", { method: "POST", token, body: { transactionId, transactionHash } }),
    },
};
