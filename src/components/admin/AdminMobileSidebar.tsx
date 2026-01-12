"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Media", href: "/admin/media" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminMobileSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "token=; Max-Age=0; path=/";
    router.replace("/admin/login");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="md:hidden h-16 px-4 flex items-center justify-between border-b bg-white">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
        <h1 className="font-semibold">Aurindel Admin</h1>
      </div>

      {/* DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 z-50 bg-white p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5"
            >
              <X />
            </button>

            <nav className="mt-14 space-y-4">
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl ${
                      pathname === item.href
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}

              <button
                onClick={logout}
                className="mt-10 w-full px-4 py-3 rounded-xl text-red-500 bg-red-50"
              >
                Logout
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
