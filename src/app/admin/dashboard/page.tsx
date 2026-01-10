export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Welcome, Admin 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">128</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="text-2xl font-bold mt-2">56</h2>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold mt-2">₹4,52,000</h2>
        </div>
      </div>
    </div>
  );
}
