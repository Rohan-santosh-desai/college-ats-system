"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Briefcase, Clock, FileText, CheckCircle } from "lucide-react";
import ApplyJobModal from "./ApplyJobModal";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";

interface JobDetailsModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    job: Job;
}

export default function JobDetailsModal({
    open,
    setOpen,
    job
}: JobDetailsModalProps) {
    const [applyModalOpen, setApplyModalOpen] = useState(false);

    // Extract requirements if they are mixed in description or assume description contains everything
    // For now we just display description.

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
                    <div className="p-6 border-b border-gray-100">
                        <DialogHeader className="hidden">
                            <DialogTitle>{job.title}</DialogTitle>
                            <DialogDescription>{job.recruiter.companyName}</DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                                <p className="text-gray-500 font-medium mt-1">
                                    {job.recruiter.companyName}
                                </p>
                            </div>
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                {job.jobType}
                            </span>
                        </div>


                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4">
                            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <MapPin size={16} className="text-gray-400" />
                                {job.location}
                            </span>

                            {job.salary && (
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                    <Briefcase size={16} className="text-gray-400" />
                                    {job.salary}
                                </span>
                            )}

                            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Clock size={16} className="text-gray-400" />
                                Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                            <FileText size={20} className="text-indigo-600" />
                            Job Description
                        </h3>

                        <div className="prose prose-sm max-w-none text-gray-600 space-y-4 whitespace-pre-wrap">
                            {job.description}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                            <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors text-gray-700">
                                Save Job
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setApplyModalOpen(true);
                                }}
                                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-sm shadow-indigo-100"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ApplyJobModal
                open={applyModalOpen}
                setOpen={setApplyModalOpen}
                job={{
                    id: job.id,
                    title: job.title,
                    company: job.recruiter.companyName,
                    location: job.location
                }}
            />
        </>
    );
}

