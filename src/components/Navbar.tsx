"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";

import {
  Monsieur_La_Doulaise,
  Eagle_Lake,
  Poppins,
} from "next/font/google";

// Fonts
const monsieur = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
});
const eagle = Eagle_Lake({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

const Navbar: React.FC = () => {
  const { menuOpen, setMenuOpen } = useMenu();
  const [isHomeHover, setIsHomeHover] = React.useState(false);

  // Dropdown states
  const [homeOpen, setHomeOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const toggleMenu = (menu: "home" | "about" | "contact" | "services") => {
    setHomeOpen(menu === "home" ? !homeOpen : false);
    setAboutOpen(menu === "about" ? !aboutOpen : false);
    setContactOpen(menu === "contact" ? !contactOpen : false);
    setServicesOpen(menu === "services" ? !servicesOpen : false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50">

      {/* Shopify-like centered container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-4 flex items-center w-full">

        {/* LEFT — LOGO */}
        <Link href="/" className={`${monsieur.className} text-4xl text-indigo-700`}>
          Aurindel
        </Link>

        {/* CENTER — NAV LINKS */}
        <div
          className={`hidden sm:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 ${eagle.className}`}
        >

          {/* HOME */}
          <div
            className="relative"
            onMouseEnter={() => setIsHomeHover(true)}
            onMouseLeave={() => setIsHomeHover(false)}
          >
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-600 relative pb-1 
              after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
              after:bg-indigo-600 after:transition-all hover:after:w-full"
            >
              Home
            </Link>

            <AnimatePresence>
              {isHomeHover && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 ${poppins.className}`}
                >
                  {["Overview", "Updates", "News"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block px-4 py-2 hover:text-indigo-600"
                    >
                      {item}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* OTHER MENUS */}
          <AnimatedDropdown label="About" href="/about" items={["Our Team", "Mission", "Vision"]} />
          <AnimatedDropdown label="Contact" href="/contact" items={["Email", "Phone", "Map"]} />
          <AnimatedDropdown label="Services" href="/services" items={["Web Design", "App Development", "Consulting"]} />

        </div>

        {/* RIGHT — ICONS */}
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          
          {/* Search Icon (Mobile/Tablet) */}
          <button className="sm:flex lg:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-full">
            <svg width="22" height="22" stroke="#615fff" fill="none" strokeWidth="2">
              <circle cx="10" cy="10" r="7" />
              <path d="M14 14 L19 19" />
            </svg>
          </button>

          {/* Full Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1 bg-transparent outline-none placeholder-gray-500 w-[140px] xl:w-[150px]"
              placeholder="Search"
            />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M10.8 10.6L15 14.7" stroke="#7A7B7D" strokeWidth="1.2" />
              <path d="M9.1 11.7c2.7-1.1 4-4.2 2.8-6.9S7.6.9 4.9 2C2.2 3.2.9 6.2 2 8.9c1.1 2.7 4.3 3.9 7.1 2.8" stroke="#7A7B7D" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 14 14" stroke="#615fff">
              <path d="M.6.6h2.3l1.5 7.8c.1.6.6.9 1.2.9h5.7c.6 0 1-.4 1.1-.9l1-4.9H3.5" />
            </svg>
            <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          {/* Wishlist */}
          <div className="cursor-pointer p-1 hover:bg-gray-100 rounded-full">
            <svg width="26" height="26" stroke="#615fff" strokeWidth="1.8" fill="none">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </div>

          {/* Login */}
          <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
            <svg width="28" height="28" stroke="#615fff" strokeWidth="1.8" fill="none">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>

        </div>

        {/* MOBILE MENU TOGGLE */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-auto">
          <svg width="21" height="15">
            <rect width="21" height="2" fill="#426287" />
            <rect y="6" width="21" height="2" fill="#426287" />
            <rect y="12" width="21" height="2" fill="#426287" />
          </svg>
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`sm:hidden bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 ${eagle.className}`}
          >
            <MobileDropdown label="Home" open={homeOpen} onClick={() => toggleMenu("home")} links={["Overview", "Updates", "News"]} />
            <MobileDropdown label="About" open={aboutOpen} onClick={() => toggleMenu("about")} links={["Our Team", "Mission", "Vision"]} />
            <MobileDropdown label="Contact" open={contactOpen} onClick={() => toggleMenu("contact")} links={["Email", "Phone", "Map"]} />
            <MobileDropdown label="Services" open={servicesOpen} onClick={() => toggleMenu("services")} links={["Web Design", "App Development", "Consulting"]} />

            {/* MOBILE ICON ROW */}
            <div className="flex items-center justify-around mt-4 border-t pt-4">

              {/* Search */}
              <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg width="22" height="22" stroke="#615fff" fill="none" strokeWidth="2">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M14 14 L19 19" />
                </svg>
              </button>

              {/* Cart */}
              <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg width="20" height="20" viewBox="0 0 14 14" stroke="#615fff">
                  <path d="M.6.6h2.3l1.5 7.8c.1.6.6.9 1.2.9h5.7c.6 0 1-.4 1.1-.9l1-4.9H3.5" />
                </svg>
                <span className="absolute -top-1 -right-1 text-xs text-white bg-indigo-500 w-[16px] h-[16px] rounded-full flex items-center justify-center">
                  0
                </span>
              </div>

              {/* Wishlist */}
              <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg width="26" height="26" stroke="#615fff" strokeWidth="2" fill="none">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>

              {/* Login */}
              <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <svg width="28" height="28" stroke="#615fff" strokeWidth="2" fill="none">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

/* ------------------------------------ */
/* DROPDOWN COMPONENTS */
/* ------------------------------------ */

interface DropdownProps {
  label: string;
  href: string;
  items: string[];
}

const AnimatedDropdown: React.FC<DropdownProps> = ({ label, href, items }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        className="text-indigo-400 hover:text-indigo-600 pb-1 relative 
        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
        after:bg-indigo-600 after:transition-all hover:after:w-full"
      >
        {label}
      </Link>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`absolute left-0 mt-2 bg-white shadow-lg border rounded-lg py-2 w-40 ${poppins.className}`}
          >
            {items.map((item) => (
              <Link key={item} href="#" className="block px-4 py-2 hover:text-indigo-600">
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MobileDropdownProps {
  label: string;
  open: boolean;
  onClick: () => void;
  links: string[];
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  label,
  open,
  onClick,
  links,
}) => (
  <div className="w-full">
    <button
      onClick={onClick}
      className={`w-full flex justify-between py-2 px-2 rounded-md hover:bg-gray-100 
      relative after:absolute after:left-0 after:bottom-0 after:h-[2px] 
      after:bg-indigo-600 transition-all ${
        open ? "after:w-full" : "after:w-0"
      }`}
    >
      {label}
      <span className={`transform transition-transform ${open ? "rotate-180" : ""}`}>
        ⌄
      </span>
    </button>

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pl-4 mt-1 flex flex-col gap-1"
        >
          {links.map((link) => (
            <Link key={link} href="#" className="py-1 text-gray-700">
              {link}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
