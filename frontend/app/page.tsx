"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) {
      router.push(role === "company" ? "/company/dashboard" : "/user/dashboard");
    }
  }, [isAuthenticated, role, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-grid relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
            DL
          </div>
          <span className="text-xl font-bold gradient-text">DataLabel</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/company"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-foreground border border-border hover:border-border-hover transition-all btn-hover"
          >
            Company Login
          </Link>
          <Link
            href="/auth/user"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white transition-all btn-hover glow-primary"
          >
            Connect Wallet
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto text-center pt-28 pb-20 px-6">
        <div className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6 animate-slide-up">
          ✦ Powered by Ethereum Sepolia
        </div>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Label Data.{" "}
          <span className="gradient-text">Earn ETH.</span>
        </h1>

        <p className="text-lg text-muted max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          The decentralized marketplace where companies get high-quality AI training data
          and labelers earn real cryptocurrency. Verified by consensus, powered by blockchain.
        </p>

        <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/auth/user"
            className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white glow-primary btn-hover"
          >
            Start Earning →
          </Link>
          <Link
            href="/auth/company"
            className="px-8 py-3.5 rounded-xl text-sm font-semibold border border-border hover:border-primary text-foreground btn-hover transition-all"
          >
            Post a Dataset
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏷",
              title: "Label & Earn",
              desc: "Browse datasets, label images, and earn ETH for every verified contribution. The more accurate you are, the more you earn.",
              color: "from-primary to-primary/50",
            },
            {
              icon: "✓",
              title: "Verify & Validate",
              desc: "Review labels by other contributors. 2-out-of-3 consensus ensures quality data. Verifiers earn too.",
              color: "from-secondary to-secondary/50",
            },
            {
              icon: "◈",
              title: "Claim on Chain",
              desc: "Your earnings are backed by ETH locked in smart contracts. Claim anytime directly to your wallet.",
              color: "from-accent to-accent/50",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 border-t border-border py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6">
          {[
            { stat: "100%", label: "On-Chain Payments" },
            { stat: "2/3", label: "Consensus Verified" },
            { stat: "70/30", label: "Label / Verify Split" },
            { stat: "Sepolia", label: "Ethereum Network" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-bold gradient-text">{item.stat}</p>
              <p className="text-xs text-muted mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 text-center">
        <p className="text-xs text-muted">
          © 2026 DataLabel. Built on Ethereum.
        </p>
      </footer>
    </div>
  );
}
