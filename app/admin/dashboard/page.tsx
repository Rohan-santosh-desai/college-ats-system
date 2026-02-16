"use client";

import { Users, Briefcase, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Platform overview and management</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-yellow-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">3 Students pending approval</p>
              <p className="text-sm text-gray-600">Review and approve new student registrations</p>
            </div>
          </div>
          <Link
            href="/admin/dashboard/students"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Review Now
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-indigo-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">1,250</p>
            <p className="text-sm text-green-600 mt-2">+12% this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Recruiters</h3>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Briefcase size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">45</p>
            <p className="text-sm text-green-600 mt-2">+5% this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Briefcase size={24} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">78</p>
            <p className="text-sm text-green-600 mt-2">+18% this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Successful Hires</h3>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">234</p>
            <p className="text-sm text-green-600 mt-2">+25% this month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Growth */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Platform Growth</h3>
              <p className="text-sm text-gray-500">Monthly user and job registrations</p>
            </div>

            {/* Mock Bar Chart */}
            <div className="relative h-64 flex items-end justify-between gap-2">
              {[
                { month: "Jan", users: 120, jobs: 25 },
                { month: "Feb", users: 180, jobs: 35 },
                { month: "Mar", users: 250, jobs: 45 },
                { month: "Apr", users: 320, jobs: 50 },
                { month: "May", users: 420, jobs: 65 },
                { month: "Jun", users: 520, jobs: 78 },
              ].map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 items-end h-48">
                    <div
                      className="flex-1 bg-indigo-400 rounded-t hover:bg-indigo-500 transition-colors"
                      style={{ height: `${(data.users / 520) * 100}%` }}
                      title={`${data.users} users`}
                    ></div>
                    <div
                      className="flex-1 bg-green-400 rounded-t hover:bg-green-500 transition-colors"
                      style={{ height: `${(data.jobs / 78) * 100}%` }}
                      title={`${data.jobs} jobs`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-400 rounded"></div>
                <span className="text-sm text-gray-600">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-sm text-gray-600">Jobs</span>
              </div>
            </div>
          </div>

          {/* Application Status */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Application Status</h3>
              <p className="text-sm text-gray-500">Distribution of all applications</p>
            </div>

            {/* Mock Donut Chart */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Selected - Green */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray="62.8 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Shortlisted - Orange */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray="50.24 251.2"
                    strokeDashoffset="-62.8"
                  />
                  {/* Interview - Purple */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="20"
                    strokeDasharray="37.68 251.2"
                    strokeDashoffset="-113.04"
                  />
                  {/* Rejected - Red */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray="100.48 251.2"
                    strokeDashoffset="-150.72"
                  />
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <span className="text-sm font-semibold">234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Interview</span>
                </div>
                <span className="text-sm font-semibold">456</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Shortlisted</span>
                </div>
                <span className="text-sm font-semibold">789</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
                <span className="text-sm font-semibold">1200</span>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Section - Pending Students & Recent Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Students */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Pending Students</h3>
                <p className="text-sm text-gray-500">Awaiting approval</p>
              </div>
              <Link href="/admin/dashboard/students" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { name: "Rahul Sharma", email: "rahul.sharma@university.edu", course: "B.Tech CS", initial: "R" },
                { name: "Priya Patel", email: "priya.patel@university.edu", course: "B.Tech CS", initial: "P" },
                { name: "Amit Kumar", email: "amit.kumar@university.edu", course: "M.Tech DS", initial: "A" },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                      {student.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-xs text-gray-400">{student.course}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-green-50 rounded-lg transition">
                      <CheckCircle size={18} className="text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition">
                      <AlertCircle size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Job Postings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Job Postings</h3>
                <p className="text-sm text-gray-500">Latest jobs on the platform</p>
              </div>
              <Link href="/admin/dashboard/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: "Software Engineer", company: "TechCorp", location: "Bangalore, India", applicants: 45 },
                { title: "Data Analyst", company: "DataDriven Inc", location: "Mumbai, India", applicants: 32 },
                { title: "UI/UX Designer", company: "DesignHub", location: "Delhi, India", applicants: 28 },
                { title: "Product Manager Intern", company: "StartupXYZ", location: "Remote", applicants: 67 },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      active
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{job.applicants} applicants</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}