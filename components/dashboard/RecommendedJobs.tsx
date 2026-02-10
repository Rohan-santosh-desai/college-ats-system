
import Link from "next/link";
import { Briefcase } from "lucide-react";

function JobItem({
  role,
  company,
  salary,
  applicants,
}: any) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <Briefcase className="w-5 h-5 text-blue-600" />
        </div>

        <div>
          <h4 className="font-medium">{role}</h4>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-green-600 font-medium">{salary}</p>
        <p className="text-sm text-gray-500">
          {applicants} applicants
        </p>
      </div>
    </div>
  );
}

export default function RecommendedJobs() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">
            Recommended Jobs
          </h3>
          <p className="text-sm text-gray-500">
            Based on your profile
          </p>
        </div>

        <Link href="/students/dashboard/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All →
        </Link>
      </div>

      <div className="space-y-3">
        <JobItem
          role="Software Engineer"
          company="TechCorp • Bangalore"
          salary="₹12–18 LPA"
          applicants={45}
        />

        <JobItem
          role="Data Analyst"
          company="DataDriven • Mumbai"
          salary="₹8–12 LPA"
          applicants={32}
        />

        <JobItem
          role="UI/UX Designer"
          company="DesignHub • Delhi"
          salary="₹10–15 LPA"
          applicants={28}
        />
      </div>
    </div>
  );
}
