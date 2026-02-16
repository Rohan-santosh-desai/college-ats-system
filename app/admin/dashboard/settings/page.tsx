"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, Database, Mail, Key, Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
    const [collegeCode, setCollegeCode] = useState("DEMO2024");
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(collegeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRegenerateCode = () => {
        // Generate a random code (in real implementation, this would call an API)
        const newCode = `DEMO${Math.floor(1000 + Math.random() * 9000)}`;
        setCollegeCode(newCode);
    };

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Manage platform settings and configurations</p>
                </div>

                {/* College Code Management */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Key className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">College Registration Code</h2>
                            <p className="text-sm text-gray-600">Share this code with students to register for your college</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="collegeCode" className="text-gray-700">Your College Code</Label>
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Input
                                        id="collegeCode"
                                        value={collegeCode}
                                        readOnly
                                        className="text-2xl font-bold text-center tracking-wider bg-gray-50 border-2 border-indigo-200 text-indigo-700"
                                    />
                                </div>
                                <Button
                                    onClick={handleCopyCode}
                                    className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            Copy
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleRegenerateCode}
                                    variant="outline"
                                    className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                                >
                                    <RefreshCw size={18} />
                                    Regenerate
                                </Button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-blue-900">How to use this code:</p>
                                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                        <li>Students need this code during signup to join your college</li>
                                        <li>Share it via email, notice boards, or student portals</li>
                                        <li>Regenerate if you suspect the code has been compromised</li>
                                        <li>Each college has a unique code for security</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <SettingsIcon className="text-indigo-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">General Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="platformName">Platform Name</Label>
                            <Input id="platformName" defaultValue="CampusHire" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supportEmail">Support Email</Label>
                            <Input id="supportEmail" type="email" defaultValue="support@campushire.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxFileSize">Max Resume Size (MB)</Label>
                            <Input id="maxFileSize" type="number" defaultValue="5" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                            <Input id="sessionTimeout" type="number" defaultValue="30" />
                        </div>
                    </div>
                </div>

                {/* Email Settings */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Mail className="text-indigo-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">Email Settings</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="smtpHost">SMTP Host</Label>
                            <Input id="smtpHost" placeholder="smtp.example.com" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="smtpPort">SMTP Port</Label>
                                <Input id="smtpPort" type="number" defaultValue="587" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="smtpUser">SMTP Username</Label>
                                <Input id="smtpUser" placeholder="user@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="smtpPassword">SMTP Password</Label>
                            <Input id="smtpPassword" type="password" placeholder="••••••••" />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Bell className="text-indigo-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">Notification Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">New User Registrations</p>
                                <p className="text-sm text-gray-500">Get notified when new users register</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Recruiter Approvals</p>
                                <p className="text-sm text-gray-500">Get notified when recruiters need approval</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">System Alerts</p>
                                <p className="text-sm text-gray-500">Get notified about system issues</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Weekly Reports</p>
                                <p className="text-sm text-gray-500">Receive weekly platform analytics</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Shield className="text-indigo-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Auto-Approve Students</p>
                                <p className="text-sm text-gray-500">Automatically approve student registrations</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Manual Recruiter Approval</p>
                                <p className="text-sm text-gray-500">Require admin approval for recruiters</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Database Maintenance */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Database className="text-indigo-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">Database Maintenance</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Last Backup</p>
                                <p className="text-sm text-gray-500">2 hours ago</p>
                            </div>
                            <Button variant="outline" className="text-sm">Backup Now</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Database Size</p>
                                <p className="text-sm text-gray-500">2.4 GB / 10 GB</p>
                            </div>
                            <Button variant="outline" className="text-sm">Optimize</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Clear Cache</p>
                                <p className="text-sm text-gray-500">Improve system performance</p>
                            </div>
                            <Button variant="outline" className="text-sm">Clear Cache</Button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
