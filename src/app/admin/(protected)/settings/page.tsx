import SettingsCard from "@/components/admin/SettingsCard";

export default function AdminSettings() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage store configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsCard
          title="Store Visibility"
          description="Enable or disable the storefront"
        />

        <SettingsCard
          title="Auto Accept Orders"
          description="Automatically accept incoming orders"
        />

        <SettingsCard
          title="Maintenance Mode"
          description="Temporarily disable user access"
        />

        <SettingsCard
          title="About Section"
          description="Control dropdowns shown on About page"
        />
      </div>
    </div>
  );
}
