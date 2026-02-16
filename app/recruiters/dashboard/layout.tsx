"use client";

import Link from "next/link";
import { User, Briefcase, FileText, LayoutDashboard, Building2, Settings, GraduationCap } from "lucide-react";

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - White Clean Design */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-screen">
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <GraduationCap size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">CampusHire</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link
                        href="/recruiters/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium transition-all"
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href="/recruiters/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <Building2 size={20} />
                        <span>Company Profile</span>
                    </Link>

                    <Link
                        href="/recruiters/dashboard/jobs"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <Briefcase size={20} />
                        <span>Job Posts</span>
                    </Link>

                    <Link
                        href="/recruiters/dashboard/applications"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <User size={20} />
                        <span>Candidates</span>
                    </Link>

                    <Link
                        href="/recruiters/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>

                {/* User Profile at Bottom */}
                <div className="p-6 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            VM
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-900">Vikram Mehta</p>
                            <p className="text-xs text-gray-500">recruiter@company.com</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            // Add signOut logic here when implementing auth
                            console.log("Logging out...");
                            window.location.href = "/";
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-64">
                {children}
            </div>
        </div>
    );
}