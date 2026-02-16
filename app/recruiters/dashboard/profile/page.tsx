"use client";

import { Building2, Globe, Mail, Phone, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompanyProfilePage() {
    return (
        <div className="flex-1 bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
                    <p className="text-gray-500">Manage your company information and branding</p>
                </div>

                {/* Company Logo Section */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Logo</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <Building2 size={40} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-3">Upload your company logo (PNG, JPG up to 5MB)</p>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
                                <Upload size={16} />
                                Upload Logo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" defaultValue="Acme Corp" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <select id="industry" className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Technology</option>
                                <option>Finance</option>
                                <option>Healthcare</option>
                                <option>Education</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input id="website" className="pl-10" defaultValue="https://acme.example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Contact Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input id="email" className="pl-10" defaultValue="hr@acme.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input id="phone" className="pl-10" defaultValue="+1 (555) 123-4567" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="size">Company Size</Label>
                            <select id="size" className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>1-10 employees</option>
                                <option>11-50 employees</option>
                                <option>51-200 employees</option>
                                <option>201-500 employees</option>
                                <option>500+ employees</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input id="location" className="pl-10" defaultValue="San Francisco, CA" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Company Description</Label>
                        <textarea
                            id="description"
                            rows={5}
                            className="w-full p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            defaultValue="Acme Corp is a leading technology company focused on innovative solutions..."
                        />
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input id="linkedin" placeholder="https://linkedin.com/company/acme" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input id="twitter" placeholder="https://twitter.com/acmecorp" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input id="facebook" placeholder="https://facebook.com/acmecorp" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input id="instagram" placeholder="https://instagram.com/acmecorp" />
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
