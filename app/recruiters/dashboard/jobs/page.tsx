import Link from "next/link";
import { Plus, MoreHorizontal, MapPin, DollarSign, Calendar } from "lucide-react";

export default function MyJobsPage() {
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
                    {[1, 2, 3].map((job) => (
                        <div key={job} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition">
                            {/* Job Details */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                                    Senior Frontend Engineer
                                </h3>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>Remote</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={14} />
                                        <span>$120k - $150k</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Posted 2 days ago</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Full-time</span>
                                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Active</span>
                                </div>
                            </div>

                            {/* Stats & Actions */}
                            <div className="flex items-center gap-6">
                                <div className="text-center px-4 border-r border-gray-100">
                                    <p className="text-2xl font-bold text-gray-900">32</p>
                                    <p className="text-xs text-gray-500 uppercase">Applicants</p>
                                </div>

                                <div className="flex gap-3">
                                    <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
                                        View Applicants
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}