"use client";

import React, { createContext, useContext, useState } from "react";

type MenuContextType = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
};
