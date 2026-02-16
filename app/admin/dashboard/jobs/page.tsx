"use client";

import { Search, Briefcase, MapPin, DollarSign, Calendar, MoreVertical } from "lucide-react";

export default function JobsManagementPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                    <p className="text-gray-500">View and manage all job postings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-gray-900">78</p>
                        <p className="text-sm text-gray-500 mt-1">Active Jobs</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-gray-900">156</p>
                        <p className="text-sm text-gray-500 mt-1">Total Applications</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-gray-900">2.0</p>
                        <p className="text-sm text-gray-500 mt-1">Avg. Applications/Job</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-gray-900">45</p>
                        <p className="text-sm text-gray-500 mt-1">Companies Hiring</p>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>All Companies</option>
                            <option>TechCorp</option>
                            <option>Acme Corp</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Closed</option>
                        </select>
                    </div>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Job Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Company</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Salary</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Applications</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Posted</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { title: "Software Engineer", company: "TechCorp", location: "Bangalore, India", salary: "$80k - $120k", applications: 45, posted: "2 days ago", status: "active" },
                                    { title: "Data Analyst", company: "DataDriven Inc", location: "Mumbai, India", salary: "$60k - $90k", applications: 32, posted: "5 days ago", status: "active" },
                                    { title: "UI/UX Designer", company: "DesignHub", location: "Delhi, India", salary: "$50k - $80k", applications: 28, posted: "1 week ago", status: "active" },
                                    { title: "Product Manager Intern", company: "StartupXYZ", location: "Remote", salary: "$40k - $60k", applications: 67, posted: "3 days ago", status: "active" },
                                    { title: "Backend Developer", company: "CloudTech Solutions", location: "Pune, India", salary: "$70k - $110k", applications: 38, posted: "4 days ago", status: "active" },
                                ].map((job, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} className="text-gray-400" />
                                                <p className="font-semibold text-gray-900">{job.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">{job.company}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <MapPin size={14} />
                                                <span>{job.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <DollarSign size={14} />
                                                <span>{job.salary}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900">{job.applications}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Calendar size={14} />
                                                <span>{job.posted}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                                <MoreVertical size={18} className="text-gray-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Showing 1 to 5 of 78 jobs</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">Previous</button>
                            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">1</button>
                            <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">3</button>
                            <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
