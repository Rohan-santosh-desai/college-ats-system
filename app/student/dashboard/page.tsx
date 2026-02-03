// app/dashboard/student/page.tsx
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Student Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Student Portal</h2>
        <nav>
          <ul className="space-y-4">
            <li className="bg-blue-900 rounded px-4 py-2 cursor-pointer font-medium">Dashboard</li>
            <li className="hover:bg-blue-700 rounded px-4 py-2 cursor-pointer transition">Browse Jobs</li>
            <li className="hover:bg-blue-700 rounded px-4 py-2 cursor-pointer transition">My Applications</li>
            <li className="hover:bg-blue-700 rounded px-4 py-2 cursor-pointer transition">My Resume</li>
            <li className="hover:bg-blue-700 rounded px-4 py-2 cursor-pointer transition">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Rohan!</h1>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50">
            Sign Out
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Jobs Applied</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Interviews Scheduled</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">45</p>
          </div>
        </div>

        {/* Recent Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recommended Jobs</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-100">
              {[1, 2, 3].map((job) => (
                <li key={job} className="py-4 flex justify-between items-center hover:bg-gray-50 rounded px-2">
                  <div>
                    <h4 className="font-medium text-gray-900">Junior React Developer</h4>
                    <p className="text-sm text-gray-500">Tech Solutions Inc. • Remote</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Apply Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}