"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. State for form data
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    requirements: ""
  });

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    // Fallback for select if id is not present (though we will add it)
    // Or if name is used. Ideally stick to ID for consistency here.
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send formData directly as keys now match API (jobType)
      });

      if (res.ok) {
        router.refresh(); // Refresh current route data
        router.push("/recruiters/dashboard/jobs");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post job.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-500">Find the best talent for your company.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, NY (or Remote)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobType">Employment Type</Label>
                <select
                  id="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range (Yearly)</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80k - $120k"
                />
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
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[150px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describe the role and responsibilities..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <textarea
                id="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                className="w-full min-h-[150px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="- Bachelor's degree in Computer Science&#10;- 3+ years of React experience"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Job"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
