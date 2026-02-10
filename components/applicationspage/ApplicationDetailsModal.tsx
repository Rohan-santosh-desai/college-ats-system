"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { MapPin, Briefcase, Calendar, MessageSquare, Building2 } from "lucide-react";

interface ApplicationDetailsModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    application: {
        role: string;
        company: string;
        location: string;
        salary: string;
        appliedDate: string;
        status: string;
        feedback?: string;
    };
}

export default function ApplicationDetailsModal({
    open,
    setOpen,
    application,
}: ApplicationDetailsModalProps) {
    const statusColors: any = {
        Applied: "bg-blue-100 text-blue-700",
        Shortlisted: "bg-yellow-100 text-yellow-700",
        Interview: "bg-purple-100 text-purple-700",
        Selected: "bg-green-100 text-green-700",
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{application.role}</DialogTitle>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <Building2 size={16} />
                        <span>{application.company}</span>
                    </div>
                </DialogHeader>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">
                        Application Status:
                    </span>
                    <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[application.status]
                            }`}
                    >
                        {application.status}
                    </span>
                </div>

                {/* Job Details */}
                <div className="space-y-3 py-4 border-t">
                    <h3 className="font-semibold text-lg">Job Details</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={16} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="font-medium text-gray-700">{application.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase size={16} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500">Salary</p>
                                <p className="font-medium text-gray-700">{application.salary}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-500">Applied On</p>
                                <p className="font-medium text-gray-700">{application.appliedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2 border-t pt-4">
                    <h3 className="font-semibold text-lg">Job Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We are looking for a talented {application.role} to join our growing team.
                        You will work on exciting projects and collaborate with a dynamic team to
                        build innovative solutions.
                    </p>
                </div>

                {/* Required Skills */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Required Skills</h3>
                    <div className="flex gap-2 flex-wrap">
                        {["React", "Node.js", "TypeScript", "MongoDB"].map((skill) => (
                            <span
                                key={skill}
                                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ATS Analysis */}
                {application.feedback && (
                    <div className="border-t pt-4 space-y-4">
                        {/* ATS Score */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-800">ATS Match Score</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Based on your resume analysis
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-indigo-600">78%</div>
                                    <p className="text-xs text-gray-500">Good Match</p>
                                </div>
                            </div>
                        </div>

                        {/* ATS Feedback */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <MessageSquare size={20} className="text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        🤖 ATS Analysis
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                        {application.feedback}
                                    </p>

                                    {/* Missing Skills */}
                                    <div className="mt-3">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Missing Skills Detected:
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Docker", "AWS", "CI/CD"].map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recommendations */}
                                    <div className="mt-3 p-3 bg-white/60 rounded border border-purple-200">
                                        <p className="text-xs font-medium text-purple-800 mb-1">
                                            💡 Recommendation
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Consider adding these skills to your resume or highlighting relevant experience to improve your match score.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                    <button
                        onClick={() => setOpen(false)}
                        className="flex-1 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Close
                    </button>
                    <button className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                        Withdraw Application
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
