"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Upload, FileText, X } from "lucide-react";

interface ApplyJobModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    job: {
        title: string;
        company: string;
        location: string;
    };
}

export default function ApplyJobModal({
    open,
    setOpen,
    job,
}: ApplyJobModalProps) {
    const [resume, setResume] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file type
            if (file.type === "application/pdf" ||
                file.type === "application/msword" ||
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setResume(file);
            } else {
                alert("Please upload a PDF or Word document");
            }
        }
    };

    const handleRemoveFile = () => {
        setResume(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!resume) {
            alert("Please upload your resume");
            return;
        }

        setIsSubmitting(true);

        // TODO: Implement actual API call
        // const formData = new FormData();
        // formData.append("resume", resume);
        // formData.append("coverLetter", coverLetter);
        // formData.append("jobId", jobId);

        // Simulate API call
        setTimeout(() => {
            alert("Application submitted successfully!");
            setIsSubmitting(false);
            setOpen(false);
            setResume(null);
            setCoverLetter("");
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Apply for {job.title}</DialogTitle>
                    <p className="text-gray-600 mt-1">
                        {job.company} • {job.location}
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resume <span className="text-red-500">*</span>
                        </label>

                        {!resume ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                                <input
                                    type="file"
                                    id="resume-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="resume-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                    <p className="text-sm font-medium text-gray-700">
                                        Click to upload resume
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PDF, DOC, or DOCX (Max 5MB)
                                    </p>
                                </label>
                            </div>
                        ) : (
                            <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {resume.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(resume.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Cover Letter (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter <span className="text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows={6}
                            placeholder="Tell us why you're a great fit for this role..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>📋 What happens next?</strong>
                        </p>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1 ml-4 list-disc">
                            <li>Your resume will be analyzed by our ATS system</li>
                            <li>You'll receive a match score and skill analysis</li>
                            <li>The recruiter will review your application</li>
                            <li>You'll be notified of any updates via email</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !resume}
                            className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
