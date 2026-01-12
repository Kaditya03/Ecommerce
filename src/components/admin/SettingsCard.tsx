"use client";

import ToggleSwitch from "./ToggleSwitch";
import { motion } from "framer-motion";

export default function SettingsCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl shadow space-y-3"
    >
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
      <ToggleSwitch />
    </motion.div>
  );
}
