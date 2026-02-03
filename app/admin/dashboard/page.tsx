// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Simple Sidebar for Admin */}
      <aside className="w-64 bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-300 cursor-pointer">Manage Users</li>
          <li className="hover:text-blue-300 cursor-pointer">System Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">System Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,204</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Active Recruiters</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">45</p>
          </div>

           {/* Card 3 */}
           <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">12</p>
          </div>
        </div>
      </main>
    </div>
  );
}