"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { token } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex h-[700px] items-center justify-center">
      <p className="text-lg">{message}</p>
    </div>
  );
}
