"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-semibold text-gray-900 mt-1">
          {value}
        </h2>
      </div>

      {icon && (
        <div className="text-indigo-600 text-3xl">
          {icon}
        </div>
      )}
    </motion.div>
  );
}
