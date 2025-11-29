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

  // Dropdown States
  const [homeOpen, setHomeOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [collectionsOpen, setCollectionsOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  // Search Bar
  const [showSearch, setShowSearch] = React.useState(false);

  const toggleMenu = (menu: "home" | "about" | "collections" | "contact" | "services") => {
    setHomeOpen(menu === "home" ? !homeOpen : false);
    setAboutOpen(menu === "about" ? !aboutOpen : false);
    setCollectionsOpen(menu === "collections" ? !collectionsOpen : false);
    setContactOpen(menu === "contact" ? !contactOpen : false);
    setServicesOpen(menu === "services" ? !servicesOpen : false);
  };

  return (
    <>
      {/* BACKGROUND OVERLAY */}
      <AnimatePresence>
        {(showSearch || menuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => {
              setShowSearch(false);
              setMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50">
        <div className="w-full px-4 md:px-8 py-4 flex items-center">

          {/* LOGO */}
          <Link href="/" className={`${monsieur.className} text-4xl text-indigo-700`}>
            Aurindel
          </Link>

          {/* DESKTOP CENTER LINKS */}
          <div className={`hidden sm:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 ${eagle.className}`}>

            {/* HOME */}
            <DesktopDropdown
              label="Home"
              items={["Overview", "Updates", "News"]}
              isHover={isHomeHover}
              onEnter={() => setIsHomeHover(true)}
              onLeave={() => setIsHomeHover(false)}
            />

            {/* ABOUT */}
            <AnimatedDropdown label="About" href="/about" items={["Our Team", "Mission", "Vision"]} />

            {/* COLLECTIONS */}
            <AnimatedDropdown
              label="Collections"
              href="/collections"
              items={[
                "Home Decor",
                "Art & Paintings",
                "Brass & Metal Art",
                "Wooden Handicrafts",
                "Traditional Textiles"
              ]}
            />

            {/* CONTACT */}
            <AnimatedDropdown label="Contact" href="/contact" items={["Email", "Phone", "Map"]} />

            {/* SERVICES */}
            <AnimatedDropdown label="Services" href="/services" items={["Web Design", "App Development", "Consulting"]} />
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-[12px] ml-auto">

            {/* SEARCH ICON */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="cursor-pointer p-0.5 hover:bg-gray-100 rounded-full"
            >
              <svg width="22" height="22" stroke="#615fff" fill="none" strokeWidth="2">
                <circle cx="10" cy="10" r="7" />
                <path d="M14 14 L19 19" />
              </svg>
            </button>

            {/* CART */}
            <div className="relative cursor-pointer p-1.5 hover:bg-gray-100 rounded-full">
              <svg width="20" height="20" viewBox="0 0 14 14" stroke="#615fff">
                <path d="M.6.6h2.3l1.5 7.8c.1.6.6.9 1.2.9h5.7c.6 0 1-.4 1.1-.9l1-4.9H3.5" />
              </svg>
              <span className="absolute -top-1 -right-1 text-xs text-white bg-indigo-500 w-[16px] h-[16px] rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            {/* WISHLIST */}
            <div className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full">
              <svg width="26" height="26" stroke="#615fff" strokeWidth="1.8" fill="none">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>

            {/* LOGIN */}
            <div className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full">
              <svg width="28" height="28" stroke="#615fff" strokeWidth="1.8" fill="none">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-1 p-1.5 hover:bg-gray-100 rounded-full">
              <svg width="21" height="15">
                <rect width="21" height="2" fill="#426287" />
                <rect y="6" width="21" height="2" fill="#426287" />
                <rect y="12" width="21" height="2" fill="#426287" />
              </svg>
            </button>

          </div>
        </div>

        {/* SEARCH BAR */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full px-4 py-3 bg-white border-t border-gray-300 flex items-center gap-3 relative z-[60]"
            >
              <input
                autoFocus
                type="text"
                placeholder="Explore a beautiful selection of authentic, unique Indian Crafts"
                className="flex-1 border border-gray-300 rounded-full px-6 py-3 outline-none"
              />
              <button onClick={() => setShowSearch(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <svg width="24" height="24" stroke="#615fff" fill="none" strokeWidth="2">
                  <path d="M4 4 L20 20" />
                  <path d="M20 4 L4 20" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`sm:hidden bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 z-[60] ${eagle.className}`}
            >
              <MobileDropdown label="Home" open={homeOpen} onClick={() => toggleMenu("home")} links={["Overview", "Updates", "News"]} />
              <MobileDropdown label="About" open={aboutOpen} onClick={() => toggleMenu("about")} links={["Our Team", "Mission", "Vision"]} />
              <MobileDropdown label="Collections" open={collectionsOpen} onClick={() => toggleMenu("collections")} links={[
                "Home Decor",
                "Art & Paintings",
                "Brass & Metal Art",
                "Wooden Handicrafts",
                "Traditional Textiles"
              ]} />
              <MobileDropdown label="Contact" open={contactOpen} onClick={() => toggleMenu("contact")} links={["Email", "Phone", "Map"]} />
              <MobileDropdown label="Services" open={servicesOpen} onClick={() => toggleMenu("services")} links={["Web Design", "App Development", "Consulting"]} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;


/* =======================================================
   DROPDOWN COMPONENTS
======================================================= */

interface DesktopDropdownProps {
  label: string;
  items: string[];
  isHover: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

const DesktopDropdown: React.FC<DesktopDropdownProps> = ({ label, items, isHover, onEnter, onLeave }) => (
  <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <Link
      href="/"
      className="text-indigo-500 hover:text-indigo-700 pb-1 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-indigo-700 after:transition-all hover:after:w-full"
    >
      {label}
    </Link>

    <AnimatePresence>
      {isHover && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`absolute left-0 mt-2 bg-white border shadow-lg rounded-lg py-2 w-40 ${poppins.className}`}
        >
          {items.map((item) => (
            <Link key={item} href="#" className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


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
        className="text-indigo-500 hover:text-indigo-700 pb-1 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-indigo-700 after:transition-all hover:after:w-full"
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
              <Link key={item} href="#" className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
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
      className={`w-full flex justify-between py-2 px-2 rounded-md text-indigo-600 font-medium hover:bg-indigo-100 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-indigo-700 transition-all ${open ? "after:w-full" : "after:w-0"}`}
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
          className="pl-4 mt-1 flex flex-col gap-1 text-indigo-700"
        >
          {links.map((link) => (
            <Link key={link} href="#" className="py-1 text-indigo-600 hover:text-indigo-800">
              {link}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
