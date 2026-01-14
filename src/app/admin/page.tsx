import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect /admin → /admin/dashboard
  redirect("/admin/dashboard");
}
