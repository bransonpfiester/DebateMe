"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      // In production, use Supabase auth
      // const { createClient } = await import("@/lib/supabase/client");
      // const supabase = createClient();
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;

      // Demo: redirect to feed
      await new Promise((r) => setTimeout(r, 800));
      router.push("/feed");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    // In production:
    // const { createClient } = await import("@/lib/supabase/client");
    // const supabase = createClient();
    // await supabase.auth.signInWithOAuth({ provider: "google" });

    // Demo: redirect
    router.push("/feed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0e0e0e"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="w-4 h-4"
              >
                <path d="M4 12h16M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="font-serif text-2xl italic tracking-[-0.5px]">
              Debate Me
            </span>
          </div>
          <p className="text-sm text-muted font-light text-center">
            Argue with AI. Let the internet decide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <p className="text-accent-red text-sm text-center">{error}</p>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-transparent border-b border-white/[0.1] py-3 text-base font-light placeholder:text-dark/25 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="w-full bg-transparent border-b border-white/[0.1] py-3 text-base font-light placeholder:text-dark/25 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Google Auth */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-3 rounded-full border border-white/[0.08] bg-transparent text-dark text-sm font-medium tracking-[1px] cursor-pointer transition-all hover:border-white/20 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-dark text-cream py-4 rounded-full font-sans text-xs font-medium tracking-[2px] uppercase cursor-pointer transition-all duration-350 ease-smooth hover:scale-[1.04] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Enter the Arena"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-8 text-sm text-muted font-light">
          New here?{" "}
          <Link
            href="/auth/signup"
            className="text-dark no-underline font-normal hover:opacity-70 transition-opacity"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
