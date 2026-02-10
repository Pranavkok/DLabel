"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

type NavItem = { label: string; href: string; icon: string };

const userNav: NavItem[] = [
    { label: "Dashboard", href: "/user/dashboard", icon: "⊞" },
    { label: "Label", href: "/user/label", icon: "🏷" },
    { label: "Validate", href: "/user/verify", icon: "✓" },
    { label: "My Earnings", href: "/user/earnings", icon: "◈" },
    { label: "Profile", href: "/user/profile", icon: "◉" },
];

const companyNav: NavItem[] = [
    { label: "Dashboard", href: "/company/dashboard", icon: "⊞" },
    { label: "My Posts", href: "/company/posts", icon: "▤" },
    { label: "Profile", href: "/company/profile", icon: "◉" },
];

export default function Sidebar() {
    const { role, user, company, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const nav = role === "company" ? companyNav : userNav;

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-strong flex flex-col z-50">
            {/* Logo */}
            <Link href="/" className="px-6 py-5 flex items-center gap-3 border-b border-border">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    DL
                </div>
                <span className="text-lg font-bold gradient-text">DataLabel</span>
            </Link>

            {/* User info */}
            <div className="px-6 py-4 border-b border-border">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">
                    {role === "company" ? "Company" : "Labeler"}
                </p>
                <p className="text-sm font-medium truncate">
                    {role === "company"
                        ? company?.name
                        : user?.name || `${user?.walletAddress?.slice(0, 6)}...${user?.walletAddress?.slice(-4)}`}
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {nav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-primary/10 text-primary glow-primary"
                                    : "text-muted hover:text-foreground hover:bg-card-hover"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 pb-4 space-y-2">
                {role === "user" && (
                    <div className="px-3 py-2 rounded-xl bg-card text-xs text-muted">
                        <span className="text-foreground font-medium">Reputation:</span>{" "}
                        {user?.reputation || 0}
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-all"
                >
                    <span className="text-lg">⏻</span>
                    Disconnect
                </button>
            </div>
        </aside>
    );
}
