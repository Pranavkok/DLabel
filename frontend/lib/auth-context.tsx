"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

type UserData = {
    id: string;
    walletAddress: string;
    name: string | null;
    reputation: number;
};

type CompanyData = {
    id: string;
    name: string;
    email: string;
    walletAddress: string;
};

type AuthState = {
    token: string | null;
    role: "user" | "company" | null;
    user: UserData | null;
    company: CompanyData | null;
    isAuthenticated: boolean;
    loginUser: (token: string, user: UserData) => void;
    loginCompany: (token: string, company: CompanyData) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<"user" | "company" | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [company, setCompany] = useState<CompanyData | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("datalabel_auth");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setToken(parsed.token);
                setRole(parsed.role);
                setUser(parsed.user || null);
                setCompany(parsed.company || null);
            } catch {
                localStorage.removeItem("datalabel_auth");
            }
        }
    }, []);

    const loginUser = useCallback((token: string, user: UserData) => {
        setToken(token);
        setRole("user");
        setUser(user);
        setCompany(null);
        localStorage.setItem("datalabel_auth", JSON.stringify({ token, role: "user", user }));
    }, []);

    const loginCompany = useCallback((token: string, company: CompanyData) => {
        setToken(token);
        setRole("company");
        setUser(null);
        setCompany(company);
        localStorage.setItem("datalabel_auth", JSON.stringify({ token, role: "company", company }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setRole(null);
        setUser(null);
        setCompany(null);
        localStorage.removeItem("datalabel_auth");
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                user,
                company,
                isAuthenticated: !!token,
                loginUser,
                loginCompany,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
