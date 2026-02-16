import Link from "next/link";
import { Search, Bell, Users, Briefcase, CheckCircle, TrendingUp, Eye, Clock, Activity } from "lucide-react";

export default function RecruiterDashboard() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none text-sm text-gray-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-indigo-600" />
            <span className="text-sm font-medium">Vikram Mehta</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Vikram! 👋</h1>
            <p className="text-gray-500 mt-1">Here's your recruitment overview</p>
          </div>
          <Link
            href="/recruiters/dashboard/jobs/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="text-xl">+</span>
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="text-indigo-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-sm font-medium">Total Applicants</h3>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">156</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-sm font-medium">Shortlisted</h3>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">23</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 text-sm font-medium">Hired</h3>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">12</p>
          </div>
        </div>

        {/* Two Column Section - Active Jobs & Top Candidates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Job Postings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Active Job Postings</h3>
                <p className="text-sm text-gray-500">Your current open positions</p>
              </div>
              <Link href="/recruiters/dashboard/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View All
                <span>→</span>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: "Software Engineer", type: "Full-time", location: "Bangalore, India", applicants: 45 },
                { title: "Data Analyst", type: "Full-time", location: "Mumbai, India", applicants: 32 },
                { title: "UI/UX Designer", type: "Full-time", location: "Delhi, India", applicants: 28 },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">{job.type}</span>
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                    <p className="text-xs text-gray-500">applicants</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Candidates */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Top Candidates</h3>
                <p className="text-sm text-gray-500">Highest scoring applicants</p>
              </div>
              <Link href="/recruiters/dashboard/applications" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View All
                <span>→</span>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { name: "Rahul Sharma", degree: "B.Tech Computer Science, 2024", score: 78, rank: 1 },
                { name: "Priya Patel", degree: "B.Tech Computer Science, 2024", score: 85, rank: 2 },
                { name: "Amit Kumar", degree: "M.Tech Data Science, 2024", score: 72, rank: 3 },
              ].map((candidate, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                      <p className="text-xs text-gray-500">{candidate.degree}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{candidate.score} <span className="text-sm text-gray-400">/100</span></p>
                    <p className="text-xs text-gray-500">#{candidate.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Analytics & Company Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hiring Analytics */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Hiring Analytics</h3>
              <p className="text-sm text-gray-500">Applications and hires over time</p>
            </div>

            {/* Simple Mock Chart */}
            <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 flex items-end justify-between">
              {[40, 55, 48, 65, 72, 85, 95, 110, 125, 145, 160].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                  <div
                    className="w-full bg-indigo-400 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}px` }}
                  ></div>
                </div>
              ))}
              <div className="absolute bottom-2 left-6 text-xs text-gray-500">Jan</div>
              <div className="absolute bottom-2 right-6 text-xs text-gray-500">Jun</div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Company Stats</h3>
              <p className="text-sm text-gray-500">Your company's presence</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Eye size={18} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Profile Views</span>
                </div>
                <span className="text-lg font-bold text-gray-900">234</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Clock size={18} className="text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Pending Reviews</span>
                </div>
                <span className="text-lg font-bold text-gray-900">18</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Activity size={18} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Response Rate</span>
                </div>
                <span className="text-lg font-bold text-green-600">92%</span>
              </div>

              <button className="w-full mt-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Edit Company Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}