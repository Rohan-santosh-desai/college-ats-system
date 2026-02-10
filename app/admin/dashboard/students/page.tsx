"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function AdminStudentsPage() {

    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const response = await fetch("/api/admin/students/pending");
            const data = await response.json();
            setStudents(data.students || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);


    const handleApprove = async (userId: string) => {
        // Optimistic update: Remove immediately
        const previousStudents = [...students];
        setStudents((prev) => prev.filter((s) => s.id !== userId));

        try {
            const response = await fetch(`/api/admin/students/approve/${userId}`, {
                method: "POST",
            });
            const data = await response.json();

            if (!data.success) {
                // Revert if API failed
                console.error("Failed to approve student:", data.message);
                setStudents(previousStudents);
                alert(`Failed to approve: ${data.message}`);
            }
        } catch (error) {
            console.error("Error approving student:", error);
            // Revert on network error
            setStudents(previousStudents);
            alert("Network error. Please try again.");
        }
    };

    const handleReject = async (userId: string) => {
        // Optimistic update: Remove immediately
        const previousStudents = [...students];
        setStudents((prev) => prev.filter((s) => s.id !== userId));

        try {
            const response = await fetch(`/api/admin/students/reject/${userId}`, {
                method: "POST",
            });
            const data = await response.json();

            if (!data.success) {
                // Revert if API failed
                console.error("Failed to reject student:", data.message);
                setStudents(previousStudents);
                alert(`Failed to reject: ${data.message}`);
            }
        } catch (error) {
            console.error("Error rejecting student:", error);
            // Revert on network error
            setStudents(previousStudents);
            alert("Network error. Please try again.");
        }
    };



    if (loading) return <p>Loading students...</p>;


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                Pending Student Approvals
            </h1>

            {students.length === 0 && <p>No pending students.</p>}

            <div className="space-y-4">
                {students.map((s: any) => (
                    <div
                        key={s.id}
                        className="flex justify-between items-center p-4 border rounded"
                    >
                        <div>
                            <p className="font-medium">
                                {s.studentProfile?.firstName} {s.studentProfile?.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{s.email}</p>
                            <p className="text-sm text-gray-500">
                                Roll No: <span className="font-semibold">{s.studentProfile?.rollNumber || "N/A"}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Branch: <span className="font-semibold">{s.studentProfile?.branch || "N/A"}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Year: <span className="font-semibold">{s.studentProfile?.graduationYear || "N/A"}</span>
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleApprove(s.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => handleReject(s.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
