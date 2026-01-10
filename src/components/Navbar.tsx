"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Monsieur_La_Doulaise,
  Eagle_Lake,
  Poppins,
} from "next/font/google";

import { useMenu } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/ProfileContext";
import { useWishlist } from "@/context/WishlistContext";

/* ================= FONTS ================= */

const monsieur = Monsieur_La_Doulaise({ subsets: ["latin"], weight: "400" });
const eagle = Eagle_Lake({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400"] });

/* ================= NAVBAR ================= */

export default function Navbar() {
  const router = useRouter();

  const { menuOpen, setMenuOpen } = useMenu();
  const { isLoggedIn } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { photo } = useProfile();

  const [showSearch, setShowSearch] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const [homeOpen, setHomeOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [collectionsOpen, setCollectionsOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const desktopProfileRef = React.useRef<HTMLDivElement | null>(null);
  const mobileProfileRef = React.useRef<HTMLDivElement | null>(null);

  /* Close profile dropdown on outside click */
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        desktopProfileRef.current?.contains(e.target as Node) ||
        mobileProfileRef.current?.contains(e.target as Node)
      )
        return;
      setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = (menu: string) => {
    setHomeOpen(menu === "home" ? !homeOpen : false);
    setAboutOpen(menu === "about" ? !aboutOpen : false);
    setCollectionsOpen(menu === "collections" ? !collectionsOpen : false);
    setContactOpen(menu === "contact" ? !contactOpen : false);
    setServicesOpen(menu === "services" ? !servicesOpen : false);
  };

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {(menuOpen || showSearch) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => {
              setMenuOpen(false);
              setShowSearch(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b z-50">
        <div className="flex items-center px-4 md:px-8 py-4">
          {/* LOGO */}
          <Link
            href="/"
            className={`${monsieur.className} text-4xl text-indigo-700`}
          >
            Aurindel
          </Link>

          {/* DESKTOP LINKS */}
          <div
            className={`hidden sm:flex gap-10 absolute left-1/2 -translate-x-1/2 ${eagle.className}`}
          >
            <DesktopDropdown
              label="Home"
              items={["Overview", "Updates", "News"]}
            />
            <DesktopDropdown
              label="About"
              items={["Our Team", "Mission", "Vision"]}
            />
            <DesktopDropdown
              label="Collections"
              items={[
                "Home Decor",
                "Art & Paintings",
                "Brass & Metal Art",
                "Wooden Handicrafts",
                "Traditional Textiles",
              ]}
            />
            <DesktopDropdown
              label="Contact"
              items={["Email", "Phone", "Map"]}
            />
            <DesktopDropdown
              label="Services"
              items={["Web Design", "App Development", "Consulting"]}
            />
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            <Icon onClick={() => setShowSearch(true)}>🔍</Icon>

            <BadgeIcon
              icon="🛒"
              count={cartCount}
              onClick={() => router.push("/cart")}
            />

            <BadgeIcon
              icon="❤️"
              count={wishlist.length}
              red
              onClick={() => router.push("/wishlist")}
            />

            <div ref={desktopProfileRef} className="relative">
              <ProfileAvatar
                photo={photo}
                onClick={() => setProfileOpen((p) => !p)}
              />
              <ProfileDropdown
                open={profileOpen}
                isLoggedIn={isLoggedIn}
                router={router}
              />
            </div>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden ml-auto p-2"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-indigo-600" />
              <span className="block w-6 h-0.5 bg-indigo-600" />
              <span className="block w-6 h-0.5 bg-indigo-600" />
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`sm:hidden bg-white p-4 shadow-lg ${poppins.className}`}
            >
              <div className="flex justify-center gap-4 border-b pb-3 mb-3">
                <Icon onClick={() => setShowSearch(true)}>🔍</Icon>

                <BadgeIcon
                  icon="🛒"
                  count={cartCount}
                  onClick={() => router.push("/cart")}
                />

                <BadgeIcon
                  icon="❤️"
                  count={wishlist.length}
                  red
                  onClick={() => router.push("/wishlist")}
                />

                <div ref={mobileProfileRef} className="relative">
                  <ProfileAvatar
                    photo={photo}
                    onClick={() => setProfileOpen((p) => !p)}
                  />
                  <ProfileDropdown
                    open={profileOpen}
                    isLoggedIn={isLoggedIn}
                    router={router}
                  />
                </div>
              </div>

              <MobileDropdown
                label="Home"
                items={["Overview", "Updates", "News"]}
                open={homeOpen}
                onClick={() => toggleMobileMenu("home")}
              />
              <MobileDropdown
                label="About"
                items={["Our Team", "Mission", "Vision"]}
                open={aboutOpen}
                onClick={() => toggleMobileMenu("about")}
              />
              <MobileDropdown
                label="Collections"
                items={[
                  "Home Decor",
                  "Art & Paintings",
                  "Brass & Metal Art",
                  "Wooden Handicrafts",
                  "Traditional Textiles",
                ]}
                open={collectionsOpen}
                onClick={() => toggleMobileMenu("collections")}
              />
              <MobileDropdown
                label="Contact"
                items={["Email", "Phone", "Map"]}
                open={contactOpen}
                onClick={() => toggleMobileMenu("contact")}
              />
              <MobileDropdown
                label="Services"
                items={["Web Design", "App Development", "Consulting"]}
                open={servicesOpen}
                onClick={() => toggleMobileMenu("services")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SEARCH MODAL */}
      <SearchModal
        open={showSearch}
        onClose={() => setShowSearch(false)}
      />
    </>
  );
}

/* ================= SEARCH MODAL ================= */

function SearchModal({ open, onClose }: any) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] sm:w-[420px] bg-white border rounded-lg shadow-xl z-50 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!query.trim()) return;
          router.push(`/search?q=${encodeURIComponent(query)}`);
          onClose();
        }}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </form>
    </div>
  );
}

/* ================= COMMON COMPONENTS ================= */

function Icon({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-xl hover:bg-gray-100 rounded-full transition"
    >
      {children}
    </button>
  );
}

function BadgeIcon({ icon, count, onClick, red }: any) {
  return (
    <div className="relative">
      <Icon onClick={onClick}>{icon}</Icon>
      {count > 0 && (
        <span
          className={`absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ${
            red ? "bg-red-500" : "bg-indigo-600"
          }`}
        >
          {count}
        </span>
      )}
    </div>
  );
}

function ProfileAvatar({ photo, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-indigo-400"
    >
      {photo ? (
        <img src={photo} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          👤
        </div>
      )}
    </button>
  );
}

function ProfileDropdown({ open, isLoggedIn, router }: any) {
  const { logout } = useAuth();
  if (!open) return null;

  return (
    <div
      className={`absolute right-0 mt-3 w-52 bg-white border rounded-md shadow-lg z-50 ${poppins.className}`}
    >
      {!isLoggedIn ? (
        <>
          <button
            onClick={() => router.push("/login")}
            className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
          >
            Create Account
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push("/profile")}
            className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
          >
            My Profile
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="block w-full px-4 py-2 text-left hover:bg-indigo-50"
          >
            My Orders
          </button>
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function DesktopDropdown({ label, items }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <span className="cursor-pointer text-indigo-600">{label}</span>
      {open && (
        <div
          className={`absolute mt-2 w-48 bg-white border rounded-md shadow-md ${poppins.className}`}
        >
          {items.map((item: string) => (
            <div
              key={item}
              className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, items, open, onClick }: any) {
  return (
    <div className="border-b py-2">
      <button
        onClick={onClick}
        className="w-full flex justify-between px-2 py-2 text-indigo-600"
      >
        {label}
        <span className={open ? "rotate-180" : ""}>▼</span>
      </button>
      {open && (
        <div className="pl-4">
          {items.map((item: string) => (
            <Link
              key={item}
              href="#"
              className="block py-1 text-sm hover:bg-indigo-50"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
