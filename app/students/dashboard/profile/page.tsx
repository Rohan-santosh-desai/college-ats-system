"use client";

import { useState, useEffect } from "react";
import { User, Mail, GraduationCap, Calendar, Hash, BookOpen, Edit2, Save, X } from "lucide-react";

interface ProfileData {
    firstName: string;
    lastName: string;
    rollNumber: string;
    branch: string;
    graduationYear: number;
    email: string;
    profileCompleted: boolean;
}

export default function StudentProfilePage() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Editable fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rollNumber, setRollNumber] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/students/profile");
            const data = await res.json();

            if (data.profile) {
                setProfile({
                    ...data.profile,
                    email: data.profile.user?.email || "N/A",
                });
                setFirstName(data.profile.firstName);
                setLastName(data.profile.lastName);
                setRollNumber(data.profile.rollNumber);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/students/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    rollNumber,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage("Profile updated successfully!");
                setEditing(false);
                fetchProfile(); // Refresh data
            } else {
                setMessage(data.error || "Failed to update profile");
            }
        } catch (error) {
            setMessage("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset to original values
        if (profile) {
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setRollNumber(profile.rollNumber);
        }
        setEditing(false);
        setMessage("");
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-gray-600">Profile not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-500">View and manage your profile information</p>
                    </div>
                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                        >
                            <Edit2 size={18} />
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Message */}
                {message && (
                    <div className={`p-4 rounded-lg ${message.includes("success") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                        <p className={`text-sm ${message.includes("success") ? "text-green-900" : "text-red-900"}`}>
                            {message}
                        </p>
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
                                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                                <p className="text-indigo-100">{profile.branch}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User size={16} />
                                    First Name
                                </label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User size={16} />
                                    Last Name
                                </label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.lastName}</p>
                                )}
                            </div>

                            {/* Email (Read-only) */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Mail size={16} />
                                    Email
                                </label>
                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.email}</p>
                            </div>

                            {/* Roll Number */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Hash size={16} />
                                    Roll Number
                                </label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={rollNumber}
                                        onChange={(e) => setRollNumber(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.rollNumber}</p>
                                )}
                            </div>

                            {/* Branch (Read-only) */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <BookOpen size={16} />
                                    Branch/Department
                                </label>
                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.branch}</p>
                            </div>

                            {/* Graduation Year (Read-only) */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Calendar size={16} />
                                    Graduation Year
                                </label>
                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{profile.graduationYear}</p>
                            </div>
                        </div>

                        {/* Edit Actions */}
                        {editing && (
                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors disabled:bg-indigo-400"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors disabled:bg-gray-100"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">i</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">Editable Fields</p>
                            <p className="text-sm text-blue-800 mt-1">
                                You can update your <strong>First Name</strong>, <strong>Last Name</strong>, and <strong>Roll Number</strong>.
                                Other fields like email, branch, and graduation year cannot be changed after registration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
