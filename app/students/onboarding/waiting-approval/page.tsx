"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle, XCircle, GraduationCap } from "lucide-react";

export default function WaitingApprovalPage() {
    const router = useRouter();
    const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED" | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkApprovalStatus();
        // Poll every 10 seconds to check if approved
        const interval = setInterval(checkApprovalStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const checkApprovalStatus = async () => {
        try {
            const res = await fetch("/api/students/profile/status");
            const data = await res.json();

            if (data.status === "APPROVED") {
                // Approved! Redirect to dashboard
                router.push("/students/dashboard");
            } else if (data.status === "REJECTED") {
                setStatus("REJECTED");
                setLoading(false);
            } else {
                setStatus("PENDING");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error checking status:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">CampusHire</h1>
                </div>

                {/* Status Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    {status === "PENDING" && (
                        <>
                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="text-yellow-600" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Waiting for Approval</h2>
                            <p className="text-gray-600 mb-6">
                                Your profile has been submitted successfully. Please wait while the admin reviews your account.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-900">
                                    <strong>What's next?</strong>
                                </p>
                                <ul className="text-sm text-blue-800 mt-2 space-y-1 text-left list-disc list-inside">
                                    <li>Admin will review your profile</li>
                                    <li>You'll be notified via email once approved</li>
                                    <li>This page will auto-refresh when approved</li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span>Checking status automatically...</span>
                            </div>
                        </>
                    )}

                    {status === "REJECTED" && (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="text-red-600" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Rejected</h2>
                            <p className="text-gray-600 mb-6">
                                Unfortunately, your application has been rejected by the admin.
                            </p>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-red-900">
                                    Please contact your college administration for more information.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/")}
                                className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                            >
                                Back to Home
                            </button>
                        </>
                    )}
                </div>

                {/* Logout */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            // Add logout logic here
                            window.location.href = "/";
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
