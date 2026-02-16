"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {
            const res = await fetch("/api/students/profile/status");
            const data = await res.json();

            // If profile not completed, redirect to complete profile
            if (!data.profileCompleted) {
                router.push("/students/onboarding/complete-profile");
                return;
            }

            // If not approved, redirect to waiting page
            if (data.status !== "APPROVED") {
                router.push("/students/onboarding/waiting-approval");
                return;
            }

            // Approved! Show dashboard
            setIsAuthorized(true);
            setLoading(false);
        } catch (error) {
            console.error("Error checking access:", error);
            // On error, redirect to login
            router.push("/");
        }
    };

    if (loading || !isAuthorized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed h-screen">
                <div className="p-6 font-bold text-xl text-blue-600">
                    CampusHire
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/students/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Dashboard
                    </Link>
                    <Link href="/students/dashboard/profile" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Profile
                    </Link>
                    <Link href="/students/dashboard/jobs" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Jobs
                    </Link>
                    <Link href="/students/dashboard/applications" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Applications
                    </Link>
                </nav>

                {/* User Profile at Bottom */}
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            RS
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-900">Rahul Sharma</p>
                            <p className="text-xs text-gray-500">student@university.edu</p>
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64">
                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <h1 className="font-semibold">Student Dashboard</h1>
                </header>

                {/* Page Content */}
                {children}
            </div>
        </div>
    );
}
