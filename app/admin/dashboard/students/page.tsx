"use client";

import { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Student {
    id: string;
    name: string;
    email: string;
    status: string;
    studentProfile?: {
        branch: string;
        graduationYear: number;
    };
}

export default function StudentsManagementPage() {
    const [activeTab, setActiveTab] = useState("pending");
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [pendingCount, setPendingCount] = useState(0);

    // Fetch students based on active tab
    useEffect(() => {
        fetchStudents();
    }, [activeTab]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            let endpoint = "/api/admin/students/pending";

            if (activeTab === "pending") {
                endpoint = "/api/admin/students/pending";
            } else if (activeTab === "rejected") {
                endpoint = "/api/admin/students/rejected";
            }
            // TODO: Add approved and all endpoints when needed

            const res = await fetch(endpoint);
            const data = await res.json();

            if (data.students) {
                setStudents(data.students);
                if (activeTab === "pending") {
                    setPendingCount(data.students.length);
                }
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId: string) => {
        // Optimistic update: Remove student immediately
        setStudents(prev => prev.filter(s => s.id !== userId));
        setPendingCount(prev => prev - 1);

        try {
            const res = await fetch(`/api/admin/students/approve/${userId}`, {
                method: "POST",
            });

            const data = await res.json();

            if (!data.success) {
                // Revert on failure
                alert(data.message || "Failed to approve student");
                fetchStudents();
            }
        } catch (error) {
            console.error("Error approving student:", error);
            alert("An error occurred");
            fetchStudents();
        }
    };

    const handleReject = async (userId: string) => {
        // Optimistic update
        setStudents(prev => prev.filter(s => s.id !== userId));
        setPendingCount(prev => prev - 1);

        try {
            const res = await fetch(`/api/admin/students/reject/${userId}`, {
                method: "POST",
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.message || "Failed to reject student");
                fetchStudents();
            }
        } catch (error) {
            console.error("Error rejecting student:", error);
            alert("An error occurred");
            fetchStudents();
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = searchQuery === "" ||
            (student.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
            (student.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
        return matchesSearch;
    });

    const getInitial = (name: string) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                    <p className="text-gray-500">Review and approve student registrations</p>
                </div>

                {/* Alert Banner */}
                {pendingCount > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="text-yellow-600" size={24} />
                        <p className="text-sm text-gray-900">
                            <span className="font-semibold">{pendingCount} students</span> are waiting for approval
                        </p>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-indigo-600">-</p>
                        <p className="text-sm text-gray-500 mt-1">Total Students</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-green-600">-</p>
                        <p className="text-sm text-gray-500 mt-1">Approved</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                        <p className="text-sm text-gray-500 mt-1">Pending</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <p className="text-3xl font-bold text-red-600">-</p>
                        <p className="text-sm text-gray-500 mt-1">Rejected</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Tabs & Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-100 flex">
                        <button
                            onClick={() => setActiveTab("pending")}
                            className={`px-6 py-3 text-sm font-medium transition ${activeTab === "pending"
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Pending ({pendingCount})
                        </button>
                        <button
                            onClick={() => setActiveTab("approved")}
                            className={`px-6 py-3 text-sm font-medium transition ${activeTab === "approved"
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            disabled
                        >
                            Approved (-)
                        </button>
                        <button
                            onClick={() => setActiveTab("rejected")}
                            className={`px-6 py-3 text-sm font-medium transition ${activeTab === "rejected"
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Rejected
                        </button>
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-3 text-sm font-medium transition ${activeTab === "all"
                                ? "border-b-2 border-indigo-600 text-indigo-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            disabled
                        >
                            All (-)
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Student</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Branch & Year</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No students found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                                                        {getInitial(student.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{student.name || "N/A"}</p>
                                                        <p className="text-sm text-gray-500">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-900">
                                                    {student.studentProfile ?
                                                        `${student.studentProfile.branch} (${student.studentProfile.graduationYear})`
                                                        : "N/A"}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === "APPROVED" ? "bg-green-50 text-green-700" :
                                                    student.status === "PENDING" ? "bg-yellow-50 text-yellow-700" :
                                                        "bg-red-50 text-red-700"
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.status === "PENDING" && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(student.id)}
                                                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition shadow-sm flex items-center gap-2"
                                                        >
                                                            <CheckCircle size={16} />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(student.id)}
                                                            className="px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition shadow-sm flex items-center gap-2"
                                                        >
                                                            <XCircle size={16} />
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                                {student.status === "REJECTED" && (
                                                    <button
                                                        onClick={() => handleApprove(student.id)}
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition flex items-center gap-2"
                                                        title="Recover - Approve this student"
                                                    >
                                                        <CheckCircle size={16} />
                                                        Recover
                                                    </button>
                                                )}
                                                {student.status === "APPROVED" && (
                                                    <span className="text-sm text-gray-500">No actions</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
