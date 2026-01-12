import StatCard from "@/components/admin/StatCard";
import Charts from "@/components/admin/Charts";
import { Package, ShoppingCart } from "lucide-react";

export default async function Dashboard() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/dashboard`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Products" value={data.products} icon={<Package />} />
        <StatCard title="Orders" value={data.orders} icon={<ShoppingCart />} />
        <StatCard title="Revenue" value={data.revenue} />
      </div>

      <Charts data={data.chart} />
    </div>
  );
}
