"use client"
import { MapPin, Briefcase, Clock, Bookmark } from "lucide-react";
import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal"


export default function JobCard() {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white p-6 border rounded-xl shadow-sm flex justify-between">
            {/* Left */}
            <div>
                <h3 className="text-lg font-semibold">
                    Software Engineer
                    <span className="ml-3 text-sm bg-gray-100 px-2 py-1 rounded">
                        Full-time
                    </span>
                </h3>

                <p className="text-gray-600 mt-1">TechCorp</p>

                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                        <MapPin size={14} /> Bangalore
                    </span>

                    <span className="flex items-center gap-1">
                        <Briefcase size={14} /> ₹12–18 LPA
                    </span>

                    <span className="flex items-center gap-1">
                        <Clock size={14} /> Deadline: Feb 15
                    </span>
                </div>

                {/* Skills */}
                <div className="flex gap-2 mt-3">
                    {["React", "Node", "TypeScript"].map(skill => (
                        <span
                            key={skill}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end justify-between">
                <p className="text-sm text-gray-500">45 applicants</p>

                <div className="flex items-center gap-3">
                    <Bookmark className="cursor-pointer" />

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        View Details
                    </button>

                    {/* Modal */}
                    <JobDetailsModal open={open} setOpen={setOpen} />

                </div>
            </div>
        </div>
    );
}
