"use client";

import { useState, useEffect, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function CompleteProfilePage() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [branch, setBranch] = useState("");
    const [graduationYear, setGraduationYear] = useState("");

    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [message, setMessage] = useState("");

    // Check if profile is already completed
    useEffect(() => {
        checkProfileStatus();
    }, []);

    const checkProfileStatus = async () => {
        try {
            const res = await fetch("/api/students/profile/status");
            const data = await res.json();

            if (data.profileCompleted) {
                // Profile already completed, redirect based on status
                if (data.status === "APPROVED") {
                    router.push("/students/dashboard");
                } else {
                    router.push("/students/onboarding/waiting-approval");
                }
            } else {
                setCheckingStatus(false);
            }
        } catch (error) {
            console.error("Error checking profile status:", error);
            setCheckingStatus(false);
        }
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/students/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    rollNumber,
                    branch,
                    graduationYear: Number(graduationYear),
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setMessage(data.error || "Failed to save profile");
                setLoading(false);
                return;
            }

            // Redirect to waiting approval page
            setTimeout(() => {
                router.push("/students/onboarding/waiting-approval");
            }, 300);

        } catch {
            setMessage("Request failed");
            setLoading(false);
        }
    };

    if (checkingStatus) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CampusHire!</h1>
                    <p className="text-gray-600">Complete your profile to get started</p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Roll Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="CS2024001"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Branch/Department <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Computer Science"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Graduation Year <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="2025"
                                    min="2020"
                                    max="2030"
                                    value={graduationYear}
                                    onChange={(e) => setGraduationYear(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-all ${loading
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            ) : (
                                "Complete Profile"
                            )}
                        </button>
                    </form>

                    {message && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 text-center">{message}</p>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>After completing your profile, your account will be sent for admin approval.</p>
                </div>
            </div>
        </div>
    );
}
