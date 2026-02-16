"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PostJobPage() {
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-500">Find the best talent for your company.</p>
        </div>

        <form className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Senior Frontend Engineer" />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. New York, NY (or Remote)" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employment Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <select id="type" className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
                  <option>Full-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range (Yearly)</Label>
                <Input id="salary" placeholder="e.g. $80,000 - $120,000" />
              </div>
            </div>
          </div>

          {/* Section 2: Job Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
            <div className="space-y-2">
              <Label htmlFor="description">Overview</Label>
              <textarea
                id="description"
                className="w-full min-h-[150px] p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Describe the role and responsibilities..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <textarea
                id="requirements"
                className="w-full min-h-[150px] p-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="- Bachelor's degree in Computer Science&#10;- 3+ years of React experience&#10;- Strong communication skills"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Publish Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
