"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/admin/dashboard"), 900);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
          x: status === "error" ? [0, -10, 10, -6, 6, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          bg-white
          rounded-2xl
          border border-gray-200
          shadow-[0_30px_60px_rgba(0,0,0,0.08)]
          p-8 sm:p-10
        "
      >
        {/* ================= BRAND HEADER ================= */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md mb-3">
            {/* Replace image src with your logo */}
            {/* <img src="/logo.svg" alt="Logo" className="w-8 h-8" /> */}
            <span className="text-white font-bold text-xl">A</span>
          </div>

          {/* Organization Name */}
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Aurindel Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure administration portal
          </p>
        </div>

        {/* ================= EMAIL ================= */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            required
            placeholder="admin@aurindel.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full h-11 px-4
              rounded-lg
              border border-gray-300
              focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500
              outline-none
            "
          />
        </div>

        {/* ================= PASSWORD ================= */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-11 px-4 pr-11
                rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-indigo-500
                focus:border-indigo-500
                outline-none
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* ================= FEEDBACK ================= */}
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-500 text-center mb-4"
            >
              Invalid email or password
            </motion.p>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-green-600 mb-4"
            >
              <CheckCircle size={18} />
              <span className="text-sm font-medium">
                Login successful
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= BUTTON ================= */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`
            w-full h-11 rounded-lg font-medium transition
            ${
              status === "success"
                ? "bg-green-600 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }
            ${status === "loading" && "opacity-70 cursor-not-allowed"}
          `}
        >
          {status === "loading"
            ? "Signing in..."
            : status === "success"
            ? "Welcome"
            : "Sign in"}
        </button>

        {/* ================= FOOTER ================= */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 Aurindel. All rights reserved.
        </p>
      </motion.form>
    </div>
  );
}
