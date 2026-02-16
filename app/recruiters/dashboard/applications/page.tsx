"use client";

import { useState } from "react";
import { Search, Filter, Download, MoreVertical, CheckCircle, XCircle, Eye, Star } from "lucide-react";

export default function ApplicationsPage() {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedJob, setSelectedJob] = useState("all");

    return (
        <div className="flex-1 bg-gray-50 p-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
                        <p className="text-gray-500">Review and manage job applications</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px] max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search candidates..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Job Filter */}
                        <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Jobs</option>
                            <option value="1">Software Engineer</option>
                            <option value="2">Data Analyst</option>
                            <option value="3">UI/UX Designer</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="applied">New Applications</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                        </select>

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
                            <Filter size={16} />
                            More Filters
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500">Total Applications</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500">New</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">45</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500">Shortlisted</p>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">23</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500">Hired</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">12</p>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Candidate</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Job Applied</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Match Score</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Applied Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: "Rahul Sharma", job: "Software Engineer", score: 92, date: "2 days ago", status: "applied", education: "B.Tech CS, 2024" },
                                    { name: "Priya Patel", job: "Data Analyst", score: 88, date: "3 days ago", status: "shortlisted", education: "M.Tech IT, 2024" },
                                    { name: "Amit Kumar", job: "UI/UX Designer", score: 85, date: "5 days ago", status: "applied", education: "BCA, 2025" },
                                    { name: "Sneha Desai", job: "Software Engineer", score: 78, date: "1 week ago", status: "shortlisted", education: "B.Tech EC, 2024" },
                                    { name: "Vikram Singh", job: "Data Analyst", score: 72, date: "1 week ago", status: "rejected", education: "MCA, 2025" },
                                ].map((candidate, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                                                    {candidate.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{candidate.name}</p>
                                                    <p className="text-xs text-gray-500">{candidate.education}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">{candidate.job}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${candidate.score >= 85 ? 'bg-green-500' : candidate.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${candidate.score}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">{candidate.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-500">{candidate.date}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {candidate.status === "applied" && (
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">New</span>
                                            )}
                                            {candidate.status === "shortlisted" && (
                                                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">Shortlisted</span>
                                            )}
                                            {candidate.status === "rejected" && (
                                                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">Rejected</span>
                                            )}
                                            {candidate.status === "hired" && (
                                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Hired</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="View Profile"
                                                >
                                                    <Eye size={16} className="text-gray-600" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Shortlist"
                                                >
                                                    <CheckCircle size={16} className="text-green-600" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Reject"
                                                >
                                                    <XCircle size={16} className="text-red-600" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="More"
                                                >
                                                    <MoreVertical size={16} className="text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Showing 1 to 5 of 156 applications</p>
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
