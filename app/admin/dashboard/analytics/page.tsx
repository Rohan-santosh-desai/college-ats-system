"use client";

import { TrendingUp, Users, Briefcase, Award, Calendar } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500">Platform insights and performance metrics</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <Users size={20} className="text-indigo-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">1,295</p>
                        <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Briefcase size={20} className="text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">78</p>
                        <p className="text-sm text-green-600 mt-2">+18% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Placements</h3>
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <Award size={20} className="text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">234</p>
                        <p className="text-sm text-green-600 mt-2">+25% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
                            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                                <TrendingUp size={20} className="text-yellow-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">18.1%</p>
                        <p className="text-sm text-green-600 mt-2">+2.3% from last month</p>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
                            <p className="text-sm text-gray-500">Monthly new user registrations</p>
                        </div>

                        <div className="relative h-64 flex items-end justify-between gap-2">
                            {[
                                { month: "Jan", value: 120 },
                                { month: "Feb", value: 180 },
                                { month: "Mar", value: 250 },
                                { month: "Apr", value: 320 },
                                { month: "May", value: 420 },
                                { month: "Jun", value: 520 },
                            ].map((data, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full h-48 flex items-end">
                                        <div
                                            className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t hover:from-indigo-600 hover:to-indigo-400 transition-colors"
                                            style={{ height: `${(data.value / 520) * 100}%` }}
                                            title={`${data.value} users`}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Application Status Distribution */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Application Status</h3>
                            <p className="text-sm text-gray-500">Current application distribution</p>
                        </div>

                        <div className="flex items-center justify-center mb-6">
                            <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
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

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Top Companies */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Companies</h3>
                        <div className="space-y-4">
                            {[
                                { name: "TechCorp", jobs: 12, hires: 28 },
                                { name: "Acme Corp", jobs: 8, hires: 20 },
                                { name: "StartupXYZ", jobs: 6, hires: 15 },
                                { name: "DataDriven Inc", jobs: 5, hires: 12 },
                            ].map((company, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900">{company.name}</p>
                                        <p className="text-xs text-gray-500">{company.jobs} active jobs</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-indigo-600">{company.hires}</p>
                                        <p className="text-xs text-gray-500">hires</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: "New job posted", company: "TechCorp", time: "2 hours ago" },
                                { action: "Student registered", company: "Demo College", time: "3 hours ago" },
                                { action: "Application submitted", company: "Acme Corp", time: "5 hours ago" },
                                { action: "Recruiter approved", company: "StartupXYZ", time: "1 day ago" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.company}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">System Health</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Database</span>
                                    <span className="text-sm font-semibold text-green-600">Healthy</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: "95%" }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">API Response</span>
                                    <span className="text-sm font-semibold text-green-600">Fast</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: "88%" }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Storage</span>
                                    <span className="text-sm font-semibold text-yellow-600">Moderate</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: "62%" }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Uptime</span>
                                    <span className="text-sm font-semibold text-green-600">99.9%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: "99.9%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
