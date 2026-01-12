"use client";

import { useState } from "react";

export default function ToggleSwitch() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
        on ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`h-6 w-6 bg-white rounded-full transform transition ${
          on ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}
