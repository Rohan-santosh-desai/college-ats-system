"use client"
import { MapPin, Briefcase, Clock, Bookmark } from "lucide-react";
import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal"
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";

export default function JobCard({ job }: { job: Job }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white p-6 border rounded-xl shadow-sm flex flex-col md:flex-row justify-between gap-4">
            {/* Left */}
            <div>
                <h3 className="text-lg font-semibold flex items-center flex-wrap gap-2">
                    {job.title}
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
                        {job.jobType}
                    </span>
                </h3>

                <p className="text-gray-600 mt-1">{job.recruiter.companyName}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                    <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                    </span>

                    {job.salary && (
                        <span className="flex items-center gap-1">
                            <Briefcase size={14} /> {job.salary}
                        </span>
                    )}

                    <span className="flex items-center gap-1">
                        <Clock size={14} /> Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                    </span>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end justify-between gap-4">
                <p className="text-sm text-gray-500">{job._count.applications} applicants</p>

                <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Bookmark size={20} />
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        View Details
                    </button>

                    {/* Modal */}
                    <JobDetailsModal open={open} setOpen={setOpen} job={job} />

                </div>
            </div>
        </div>
    );
}

