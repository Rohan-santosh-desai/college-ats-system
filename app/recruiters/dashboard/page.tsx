// app/dashboard/recruiter/page.tsx
import Link from "next/link";

export default function RecruiterDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Recruiter Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Recruiter Hub</h2>
        <nav>
          <ul className="space-y-4">
            <li className="bg-slate-800 rounded px-4 py-2 cursor-pointer font-medium">Dashboard</li>
            <li className="hover:bg-slate-700 rounded px-4 py-2 cursor-pointer transition">Post a Job</li>
            <li className="hover:bg-slate-700 rounded px-4 py-2 cursor-pointer transition">Candidates</li>
            <li className="hover:bg-slate-700 rounded px-4 py-2 cursor-pointer transition">Company Profile</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Recruiter Dashboard</h1>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50">
            Sign Out
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Active Job Postings</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Applicants</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">128</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Pending Review</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">15</p>
          </div>
        </div>

        {/* Recent Applicants Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Recent Applicants</h3>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">View All</span>
          </div>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Role Applied</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((applicant) => (
                <tr key={applicant} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
                  <td className="px-6 py-4">Frontend Developer</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">New</span></td>
                  <td className="px-6 py-4 text-purple-600 cursor-pointer hover:underline">Review</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}