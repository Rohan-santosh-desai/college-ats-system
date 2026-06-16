import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, User, Download, ExternalLink, Calendar, Mail } from "lucide-react";

export default async function JobDetailsPage({ params }: { params: Promise<{ jobId: string }> }) {
    const session = await getServerSession(authOptions);
    const resolvedParams = await params;

    if (!session || session.user.role !== "RECRUITER") {
        redirect("/auth/signin");
    }

    const job = await prisma.job.findUnique({
        where: {
            id: resolvedParams.jobId,
        },
        include: {
            applications: {
                include: {
                    student: true,
                },
                orderBy: {
                    matchScore: 'desc'
                }
            },
        },
    });

    if (!job) {
        notFound();
    }

    // Ensure this job belongs to the current recruiter
    if (job.recruiterId !== (await prisma.recruiterProfile.findUnique({ where: { userId: session.user.id } }))?.id) {
        return <div>Unauthorized access to this job.</div>;
    }

    return (
        <div className="flex-1 bg-gray-50 p-8 h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header with Back Button */}
                <div>
                    <Link
                        href="/recruiters/dashboard/jobs"
                        className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-4 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Jobs
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                            <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                <span className="flex items-center gap-1"><Calendar size={14} /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">{job.jobType}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{job.status}</span>
                            </div>
                        </div>
                        {/* Future: Add Edit/Close Job buttons here */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Job Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Job Description</h3>
                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{job.description}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium">{job.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Salary</span>
                                    <span className="font-medium">{job.salary || "Not specified"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Applications List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Applications ({job.applications.length})
                        </h2>

                        {job.applications.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl border border-gray-100 text-center text-gray-500">
                                <User size={48} className="mx-auto mb-4 text-gray-300" />
                                <p>No applications yet.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                                {job.applications.map((app) => (
                                    <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg">
                                                    {app.student.firstName[0]}{app.student.lastName[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{app.student.firstName} {app.student.lastName}</h3>
                                                    <div className="text-sm text-gray-500 flex flex-col gap-1 mt-1">
                                                        <span>{app.student.branch} • {app.student.rollNumber}</span>
                                                        {/* We would likely need to fetch email from User model if needed, but keeping simple for now */}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className={`text-xs px-2 py-1 rounded font-medium
                                                ${app.status === 'APPLIED' ? 'bg-yellow-100 text-yellow-700' :
                                                                app.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-700' :
                                                                    app.status === 'HIRED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                        {app.matchScore && (
                                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                                Match: {app.matchScore}%
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {app.resumeUrl && (
                                                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600 border border-gray-200 rounded-lg transition-colors" title="Download Resume">
                                                        <Download size={18} />
                                                    </a>
                                                )}
                                                <Link href={`/recruiters/dashboard/applications/${app.id}`} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                                    View Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
