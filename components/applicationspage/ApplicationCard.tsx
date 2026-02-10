"use client";

import { MapPin, Briefcase, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

interface ApplicationCardProps {
    role: string;
    company: string;
    location: string;
    salary: string;
    appliedDate: string;
    status: "Applied" | "Shortlisted" | "Interview" | "Selected";
    feedback?: string;
}

export default function ApplicationCard({
    role,
    company,
    location,
    salary,
    appliedDate,
    status,
    feedback,
}: ApplicationCardProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const statusColors = {
        Applied: "bg-blue-100 text-blue-700",
        Shortlisted: "bg-yellow-100 text-yellow-700",
        Interview: "bg-purple-100 text-purple-700",
        Selected: "bg-green-100 text-green-700",
    };

    return (
        <>
            <div className="bg-white p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    {/* Left side */}
                    <div className="flex gap-4">
                        {/* Icon */}
                        <div className="p-3 bg-indigo-50 rounded-lg h-fit">
                            <Briefcase className="w-6 h-6 text-indigo-600" />
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold">{role}</h3>
                                <span
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
                                >
                                    {status}
                                </span>
                            </div>

                            <p className="text-gray-600 font-medium">{company}</p>

                            <div className="flex gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} /> {location}
                                </span>

                                <span className="flex items-center gap-1">
                                    <Briefcase size={14} /> {salary}
                                </span>

                                <span className="flex items-center gap-1">
                                    <Calendar size={14} /> Applied: {appliedDate}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - View Job button */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                        <ExternalLink size={16} />
                        View Details
                    </button>
                </div>
            </div>

            {/* Modal */}
            <ApplicationDetailsModal
                open={modalOpen}
                setOpen={setModalOpen}
                application={{
                    role,
                    company,
                    location,
                    salary,
                    appliedDate,
                    status,
                    feedback,
                }}
            />
        </>
    );
}
