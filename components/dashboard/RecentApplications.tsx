import Link from "next/link";
import { Briefcase } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    Applied: "bg-blue-100 text-blue-700",
    Shortlisted: "bg-yellow-100 text-yellow-700",
    Interview: "bg-purple-100 text-purple-700",
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
}

function ApplicationItem({
  role,
  company,
  status,
}: any) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="p-3 bg-purple-50 rounded-lg">
          <Briefcase className="w-5 h-5 text-purple-600" />
        </div>

        <div>
          <h4 className="font-medium">{role}</h4>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>

      <StatusBadge status={status} />
    </div>
  );
}

export default function RecentApplications() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Recent Applications</h3>
          <p className="text-sm text-gray-500">
            Track your application status
          </p>
        </div>

        <Link href="/students/dashboard/applications" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All →
        </Link>
      </div>

      <div className="space-y-3">
        <ApplicationItem
          role="Software Engineer"
          company="TechCorp"
          status="Shortlisted"
        />
        <ApplicationItem
          role="Data Analyst"
          company="DataDriven Inc"
          status="Applied"
        />
        <ApplicationItem
          role="UI/UX Designer"
          company="DesignHub"
          status="Interview"
        />
      </div>
    </div>
  );
}
