import JobsHeader from "@/components/jobspage/JobsHeader";
import JobsFilters from "@/components/jobspage/JobsFilters";
import JobsList from "@/components/jobspage/JobsList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Job } from "@/types/job";

export default async function JobsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT" || !session.user.collegeId) {
    redirect("/auth/signin");
  }

  // Fetch jobs for the student's college
  const jobs = await prisma.job.findMany({
    where: {
      collegeId: session.user.collegeId,
      status: "ACTIVE",
    },
    include: {
      recruiter: {
        select: {
          companyName: true,
        }
      },
      _count: {
        select: { applications: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) as unknown as Job[];

  return (
    <main className="p-2 space-y-6">
      <JobsHeader />

      <JobsFilters />

      <p className="text-gray-500">Showing {jobs.length} jobs</p>

      <JobsList jobs={jobs} />
    </main>
  );
}
