"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";

/* ================= FONTS ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/* ================= ANIMALS ================= */

const animals = [
  { open: "🐵", closed: "🙈", name: "Monkey" },
  { open: "🐶", closed: "😴", name: "Dog" },
  { open: "🦉", closed: "😌", name: "Owl" },
];

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOGIN HANDLER ================= */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Admin login failed");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${inter.className} min-h-screen flex bg-gray-100`}>
      {/* ================= LEFT PANEL ================= */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white px-12"
        >
          {/* ANIMALS */}
          <div className="flex justify-center gap-12 mb-10">
            {animals.map((animal, index) => (
              <motion.div
                key={animal.name}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  delay: index * 0.25,
                }}
                className="text-7xl"
              >
                {showPassword ? animal.closed : animal.open}
              </motion.div>
            ))}
          </div>

          <h2
            className={`${playfair.className} text-4xl font-semibold`}
          >
            Aurindel Admin
          </h2>
          <p className="mt-4 text-indigo-100 max-w-md mx-auto">
            Secure access for administrators. Password visibility
            triggers protective reactions.
          </p>
        </motion.div>
      </div>

      {/* ================= RIGHT LOGIN FORM ================= */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10"
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1
              className={`${playfair.className} text-3xl text-gray-900`}
            >
              Admin Login
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Authorized personnel only
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@aurindel.com"
              />
            </div>

            {/* MOBILE ANIMALS */}
            <div className="flex lg:hidden justify-center gap-6 text-3xl">
              {animals.map((animal) => (
                <span key={animal.name}>
                  {showPassword ? animal.closed : animal.open}
                </span>
              ))}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <div className="flex items-center h-12 border border-gray-300 rounded-xl px-4 focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁"}
                </motion.button>
              </div>
            </div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* LOGIN BUTTON */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              {loading ? "Signing in..." : "Login"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-gray-400 text-center mt-8">
            © Aurindel • Admin Access Only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
