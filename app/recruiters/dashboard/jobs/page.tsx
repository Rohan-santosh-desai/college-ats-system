import Link from "next/link";
import { Plus, MoreHorizontal, MapPin, DollarSign, Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

export default async function MyJobsPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "RECRUITER") {
        return <div>Unauthorized</div>;
    }

    // Fetch jobs for this recruiter
    const jobs = await prisma.job.findMany({
        where: {
            recruiter: {
                userId: session.user.id,
            },
        },
        include: {
            _count: {
                select: { applications: true }
            }
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="flex-1 bg-gray-50 p-8">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                        <p className="text-gray-500">Manage your active job postings.</p>
                    </div>
                    <Link
                        href="/recruiters/dashboard/jobs/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus size={18} />
                        Post New Job
                    </Link>
                </div>

                {/* Jobs List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    {jobs.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p>No jobs posted yet.</p>
                            <Link href="/recruiters/dashboard/jobs/create" className="text-blue-600 hover:underline mt-2 inline-block">
                                Create your first job
                            </Link>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition">
                                {/* Job Details */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                                        {job.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            <span>{job.location}</span>
                                        </div>
                                        {job.salary && (
                                            <div className="flex items-center gap-1">
                                                <DollarSign size={14} />
                                                <span>{job.salary}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                            {job.jobType}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${job.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Stats & Actions */}
                                <div className="flex items-center gap-6">
                                    <div className="text-center px-4 border-r border-gray-100">
                                        <p className="text-2xl font-bold text-gray-900">{job._count.applications}</p>
                                        <p className="text-xs text-gray-500 uppercase">Applicants</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <Link
                                            href={`/recruiters/dashboard/jobs/${job.id}`}
                                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                                            View details
                                        </Link>
                                        <button className="p-2 text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}