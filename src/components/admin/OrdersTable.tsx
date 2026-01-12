"use client";

import { motion } from "framer-motion";

export default function OrdersTable({ orders, refresh }: any) {
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      body: JSON.stringify({ id, status }),
    });
    refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow p-6"
    >
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o: any) => (
            <tr key={o._id} className="border-t">
              <td className="py-3">{o._id}</td>
              <td>{o.status}</td>
              <td className="space-x-2">
                <button onClick={() => updateStatus(o._id, "shipped")}>
                  Ship
                </button>
                <button onClick={() => updateStatus(o._id, "cancelled")}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
