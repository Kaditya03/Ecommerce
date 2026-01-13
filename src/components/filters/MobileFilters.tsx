"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DesktopFilters from "./DesktopFilters";

export default function MobileFilters(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* STICKY BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2
          bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg z-40
        "
      >
        Filters
      </button>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260 }}
              className="
                fixed bottom-0 left-0 right-0 bg-white
                rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto
              "
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Filters
                </h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              <DesktopFilters {...props} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
