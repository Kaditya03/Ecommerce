"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
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
      className="bg-white rounded-2xl border shadow-sm p-6 flex items-center justify-between hover:shadow-lg transition"
    >
      <div>
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 mt-1">
          {value}
        </h3>
      </div>

      {icon && (
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      )}
    </motion.div>
  );
}
