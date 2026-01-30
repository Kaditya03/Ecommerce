"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  ArrowRight,
  Instagram,
  Linkedin,
} from "lucide-react";

import { useMenu } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

type MobileMenu = "shop" | "about" | null;

export default function Navbar() {
  const { menuOpen, setMenuOpen } = useMenu();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<MobileMenu>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMobileSub(null);
  };

  // Fixed Variants with explicit Types for Next.js Build
  const menuVariants: Variants = {
    closed: { 
      opacity: 0, 
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0]
      }
    },
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl py-3 border-b border-stone-100 shadow-sm"
            : "bg-white md:bg-transparent py-4 md:py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LEFT (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 flex-1 text-[10px] uppercase tracking-[0.4em] text-stone-500">
            <DesktopDropdown title="Collections">
              <NavSubLink title="Pottery" desc="Handcrafted Earth" href="/collections/pottery" />
              <NavSubLink title="Handlooms" desc="Traditional Weaves" href="/collections/handlooms" />
              <NavSubLink title="Brass Art" desc="Timeless Metalwork" href="/collections/brass" />
            </DesktopDropdown>

            <DesktopDropdown title="About">
              <NavSubLink title="Our Story" desc="The Aurindel Heritage" href="/about" />
              <NavSubLink title="Artisans" desc="Meet the Makers" href="/about/artisans" />
              <NavSubLink title="Sustainability" desc="Our Green Commitment" href="/about/sustainability" />
            </DesktopDropdown>
          </div>

          {/* LOGO */}
          <Link href="/">
            <div
              className={`relative transition-all duration-700 ${
                scrolled ? "h-7 w-24 md:h-10 md:w-36" : "h-8 w-28 md:h-14 md:w-52"
              }`}
            >
              <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain" />
            </div>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-5 flex-1 justify-end">
            <button className="text-stone-700 hover:text-black transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Desktop User Group */}
            <div className="hidden lg:block relative group">
              <User size={20} strokeWidth={1.5} />
              <div className="absolute right-0 mt-4 w-60 bg-white border border-stone-100 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 p-6 z-[120] rounded-xl">
                {!isLoggedIn ? (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Welcome</p>
                    <Link href="/login" className="block text-sm hover:translate-x-1 transition-transform">Sign In</Link>
                    <Link href="/register" className="block text-sm hover:translate-x-1 transition-transform font-medium">Create Account</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-stone-100">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Account</p>
                        <p className="text-sm font-serif italic mt-1">{user?.name}</p>
                    </div>
                    <Link href="/orders" className="block text-sm hover:translate-x-1 transition-transform">My Orders</Link>
                    <button onClick={logout} className="flex items-center gap-2 text-xs text-red-500 font-medium">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Link href="/cart" className="relative text-stone-700 hover:text-black transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button 
                onClick={() => setMenuOpen(true)} 
                className="lg:hidden p-1.5 bg-stone-100 rounded-full text-stone-900 active:scale-90 transition-transform"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            <div className="flex justify-between items-center px-8 py-7">
              <div className="relative h-6 w-20">
                 <Image src="/images/AurindelLogo.png" alt="Aurindel" fill className="object-contain" />
              </div>
              <button 
                onClick={closeMenu}
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">
              <nav className="space-y-8">
                <motion.div variants={itemVariants}>
                    <button
                        onClick={() => setActiveMobileSub(activeMobileSub === "shop" ? null : "shop")}
                        className="group flex items-baseline justify-between w-full"
                    >
                        <span className="text-4xl font-serif italic text-stone-900">Collections</span>
                        <ChevronRight className={`transition-transform duration-300 ${activeMobileSub === "shop" ? "rotate-90" : ""}`} size={20} />
                    </button>
                    <AnimatePresence>
                        {activeMobileSub === "shop" && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-2 mt-4 space-y-4"
                            >
                                {["Pottery", "Handlooms", "Brass Art"].map((item) => (
                                    <Link key={item} href={`/collections/${item.toLowerCase().replace(' ', '-')}`} className="block text-lg text-stone-500 font-light" onClick={closeMenu}>
                                        {item}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link href="/about" onClick={closeMenu} className="text-4xl font-serif italic text-stone-900 block">
                        Our Story
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link href="/about/artisans" onClick={closeMenu} className="text-4xl font-serif italic text-stone-900 block">
                        Meet Artisans
                    </Link>
                </motion.div>
              </nav>

              <motion.div variants={itemVariants} className="pt-10 border-t border-stone-100 space-y-6">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Membership</p>
                {isLoggedIn ? (
                  <div className="flex gap-4">
                     <Link href="/profile" className="flex-1 h-14 border border-stone-200 rounded-2xl flex items-center justify-center text-sm font-medium">Profile</Link>
                     <button onClick={logout} className="w-14 h-14 border border-stone-200 rounded-2xl flex items-center justify-center text-red-500"><LogOut size={18} /></button>
                  </div>
                ) : (
                  <Link href="/login" onClick={closeMenu} className="flex items-center justify-between w-full h-16 px-6 bg-stone-900 text-white rounded-2xl">
                    <span className="text-sm font-bold uppercase tracking-widest">Sign In</span>
                    <ArrowRight size={18} />
                  </Link>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 pt-6">
                 <Link href="#" className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400"><Instagram size={18} /></Link>
                 <Link href="#" className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400"><Linkedin size={18} /></Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopDropdown({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <div className="relative group py-2">
      <span className="flex items-center gap-1 cursor-default hover:text-stone-900 transition-colors">
        {title} <ChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
      </span>
      <div className="absolute top-full -left-4 mt-2 bg-white border border-stone-100 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 p-8 z-[110] rounded-xl min-w-[240px]">
        {children}
      </div>
    </div>
  );
}

function NavSubLink({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="group block mb-5 last:mb-0">
      <p className="text-xs uppercase tracking-widest flex items-center justify-between group-hover:text-stone-900 transition-colors">
        {title}
        <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
      </p>
      <span className="text-[10px] text-stone-400 italic group-hover:text-stone-600 transition-colors">{desc}</span>
    </Link>
  );
}