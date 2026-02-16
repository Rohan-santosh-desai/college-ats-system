"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, GraduationCap, BarChart3, Settings, Bell } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/dashboard/recruiters", label: "Recruiters", icon: Briefcase },
        { href: "/admin/dashboard/students", label: "Students", icon: GraduationCap },
        { href: "/admin/dashboard/jobs", label: "Jobs", icon: Briefcase },
        { href: "/admin/dashboard/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Fixed, No Scroll */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-screen">
                {/* Logo */}
                <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <GraduationCap size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">CampusHire</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                            A
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">admin@portal.com</p>
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

            {/* Main Content - Scrollable with left margin for fixed sidebar */}
            <div className="flex-1 flex flex-col ml-64">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Admin User</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                {children}
            </div>
        </div>
    );
}
