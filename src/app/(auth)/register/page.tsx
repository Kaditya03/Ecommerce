"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ SHOW SUCCESS MESSAGE (EMAIL VERIFICATION)
      setSuccess(data.message);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      {/* LEFT IMAGE (UNCHANGED) */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="/images/login-left_img1.png"
          alt="leftSideImage"
        />
      </div>

      {/* RIGHT FORM (UNCHANGED UI) */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">
            Sign up
          </h2>

          <p className="text-sm text-gray-500/90 mt-3">
            Create your account to get started
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* FULL NAME */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={!!success}
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!!success}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!!success}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={!!success}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error}
            </p>
          )}

          {/* SUCCESS MESSAGE (VERY CLEAR) */}
          {success && (
            <div className="mt-4 w-full text-center">
              <p className="text-green-600 text-sm">
                {success}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Please check your email and verify your account.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !!success}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : success
              ? "Check your email"
              : "Sign Up"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="/login">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
