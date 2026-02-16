"use client";

import { useState } from "react";
import { Search, Eye, Ban, Briefcase, Building2, Users, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecruitersManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [inviteLink, setInviteLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInviteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setInviteLink("");

        try {
            const res = await fetch("/api/admin/invite-recruiter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, companyName }),
            });

            const data = await res.json();

            if (data.success) {
                setInviteLink(data.inviteLink);
                setEmail("");
                setCompanyName("");
            } else {
                setError(data.error || "Failed to generate invite link");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Recruiter Management</h1>
                    <p className="text-gray-500">View and manage invited recruiters</p>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Recruiters are invited by admin</p>
                        <p className="text-sm text-blue-800">Use the "Invite Recruiter" section below to add new recruiters. They will be automatically approved when they sign up using the invite link.</p>
                    </div>
                </div>

                {/* Invite Recruiter Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                            <Mail className="text-white" size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Invite Recruiter</h3>
                            <p className="text-sm text-gray-600">Generate an invite link for a new recruiter</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        <form onSubmit={handleInviteSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recruiterEmail">Recruiter Email</Label>
                                    <Input
                                        id="recruiterEmail"
                                        type="email"
                                        placeholder="recruiter@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input
                                        id="companyName"
                                        type="text"
                                        placeholder="Acme Corp"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        className="border-gray-200"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Invite & Generate Link
                                    </>
                                )}
                            </Button>
                        </form>

                        {inviteLink && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-semibold text-green-900 mb-2">✓ Invite sent via email & link generated!</p>
                                <div className="flex gap-2">
                                    <Input
                                        value={inviteLink}
                                        readOnly
                                        className="bg-white text-sm"
                                    />
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(inviteLink);
                                        }}
                                        variant="outline"
                                        className="border-green-300 text-green-700 hover:bg-green-100"
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-900">✗ {error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Total Recruiters</p>
                            <Users size={20} className="text-indigo-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">4</p>
                        <p className="text-sm text-green-600 mt-1">+2 this month</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Active Jobs</p>
                            <Briefcase size={20} className="text-blue-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">13</p>
                        <p className="text-sm text-gray-500 mt-1">Across all recruiters</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Total Hires</p>
                            <Building2 size={20} className="text-green-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">32</p>
                        <p className="text-sm text-gray-500 mt-1">Successful placements</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search recruiters by name, company, or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Recruiters Table */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Recruiter</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Company</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Jobs Posted</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Hires</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Joined</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: "Vikram Mehta", email: "vikram@acme.com", company: "Acme Corp", status: "active", jobs: 5, hires: 12, joined: "12/15/2023", initial: "A" },
                                    { name: "Priya Sharma", email: "priya@techcorp.com", company: "TechCorp", status: "active", jobs: 8, hires: 20, joined: "11/20/2023", initial: "T" },
                                    { name: "Rajesh Gupta", email: "rajesh@startupxyz.com", company: "StartupXYZ", status: "active", jobs: 0, hires: 0, joined: "1/25/2024", initial: "S" },
                                    { name: "Meera Joshi", email: "meera@cloudtech.com", company: "CloudTech Solutions", status: "active", jobs: 0, hires: 0, joined: "1/28/2024", initial: "C" },
                                ].filter(recruiter =>
                                    searchQuery === "" ||
                                    recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    recruiter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    recruiter.email.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((recruiter, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                                                    {recruiter.initial}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{recruiter.name}</p>
                                                    <p className="text-sm text-gray-500">{recruiter.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Building2 size={16} className="text-gray-400" />
                                                <span className="text-sm text-gray-900">{recruiter.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                                {recruiter.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">{recruiter.jobs}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">{recruiter.hires}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">{recruiter.joined}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="p-2 hover:bg-blue-50 rounded-lg transition"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} className="text-blue-600" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-red-50 rounded-lg transition"
                                                    title="Suspend Account"
                                                >
                                                    <Ban size={18} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
