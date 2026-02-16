"use client";

// app/dashboard/student/page.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCards from "@/components/dashboard/StatsCards"
import RecentApplications from "@/components/dashboard/RecentApplications";
import RecommendedJobs from "@/components/dashboard/RecommendedJobs";



export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch("/api/students/profile");
        const data = await res.json();

        const profile = data.profile;
        const status = data.status;

        // Case A — profile missing OR incomplete
        if (!profile || !profile.profileCompleted) {
          router.push("/students/dashboard/onboarding/complete-profile");
          return;
        }

        // Case B — profile exists but not approved
        if (status !== "APPROVED") {
          router.push("/students/dashboard/onboarding/waiting-approval");
          return;
        }

        // Case C — approved → show dashboard
        setUserName(profile.firstName);
        setLoading(false);

      } catch (err) {
        console.error("Profile check failed");
        router.push("/login");
      }
    };

    checkProfile();
  }, [router]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }


  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName} 👋</h1>
            <p className="text-gray-500">
              Here's what's happening with your job search
            </p>
          </div>
        </header>
        <StatsCards />

        <div className="grid md:grid-cols-2 gap-6">
          <RecentApplications />
          <RecommendedJobs />
        </div>


      </main>


      {/* <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Rohan!</h1>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm font-medium hover:bg-gray-50">
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Jobs Applied</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Interviews Scheduled</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">45</p>
          </div>
        </div>

  
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recommended Jobs</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-100">
              {[1, 2, 3].map((job) => (
                <li key={job} className="py-4 flex justify-between items-center hover:bg-gray-50 rounded px-2">
                  <div>
                    <h4 className="font-medium text-gray-900">Junior React Developer</h4>
                    <p className="text-sm text-gray-500">Tech Solutions Inc. • Remote</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Apply Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main> */}
    </div>
  );
}