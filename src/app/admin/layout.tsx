"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";

/* ================= FONTS ================= */

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Products", path: "/admin/products", icon: "📦" },
  { name: "Orders", path: "/admin/orders", icon: "🧾" },
  { name: "Users", path: "/admin/users", icon: "👥" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={`${inter.className} min-h-screen flex bg-gray-100`}>
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden lg:flex w-64 bg-white shadow-xl flex-col">
        <div className="px-6 py-6 border-b">
          <h2
            className={`${playfair.className} text-2xl text-indigo-600`}
          >
            Aurindel
          </h2>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-indigo-50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t">
          <button className="w-full py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col lg:hidden"
          >
            <div className="px-6 py-6 border-b flex justify-between items-center">
              <h2
                className={`${playfair.className} text-2xl text-indigo-600`}
              >
                Aurindel
              </h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                        active
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-indigo-50"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-16 bg-white shadow-sm flex items-center px-4 lg:px-8">
          <button
            className="lg:hidden mr-4 text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-lg font-medium text-gray-700">
            Admin Dashboard
          </h1>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
