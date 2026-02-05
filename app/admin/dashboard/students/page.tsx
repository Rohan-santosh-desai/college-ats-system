"use client";

import Link from "next/link";

export default function AdminStudentsPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Simple Sidebar for Admin - duplicate for now */}
            <aside className="w-64 bg-slate-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    <li className="hover:text-blue-300 cursor-pointer">
                        <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="hover:text-blue-300 cursor-pointer text-blue-300 font-bold">
                        Manage Students
                    </li>
                    <li className="hover:text-blue-300 cursor-pointer">System Settings</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Students</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">Student management interface under construction.</p>
                </div>
            </main>
        </div>
    );
}
