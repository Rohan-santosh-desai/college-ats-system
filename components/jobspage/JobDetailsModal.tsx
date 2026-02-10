"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { MapPin, Briefcase, Clock } from "lucide-react";
import ApplyJobModal from "./ApplyJobModal";

export default function JobDetailsModal({
    open,
    setOpen,
}: any) {
    const [applyModalOpen, setApplyModalOpen] = useState(false);

    const jobData = {
        title: "Software Engineer",
        company: "TechCorp",
        location: "Bangalore, India",
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{jobData.title}</DialogTitle>
                        <p className="text-gray-500">
                            {jobData.company} • {jobData.location}
                        </p>
                    </DialogHeader>

                    {/* Salary + type */}
                    <div className="flex gap-4 text-sm text-gray-600 mt-2">
                        <span className="flex items-center gap-1">
                            <Briefcase size={14} /> ₹12–18 LPA
                        </span>

                        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                            Full-time
                        </span>

                        <span className="flex items-center gap-1">
                            <Clock size={14} /> Deadline: Feb 15
                        </span>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">
                            Job Description
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            We are looking for a talented Software Engineer
                            to join our growing team. You will build scalable
                            applications using modern technologies.
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">
                            Required Skills
                        </h3>

                        <div className="flex gap-2 flex-wrap">
                            {["React", "Node.js", "TypeScript", "MongoDB"].map(
                                skill => (
                                    <span
                                        key={skill}
                                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => {
                                setOpen(false);
                                setApplyModalOpen(true);
                            }}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                        >
                            Apply Now
                        </button>

                        <button className="border px-4 py-3 rounded-lg">
                            Save Job
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Apply Job Modal */}
            <ApplyJobModal
                open={applyModalOpen}
                setOpen={setApplyModalOpen}
                job={jobData}
            />
        </>
    );
}
