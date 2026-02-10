import JobsHeader from "@/components/jobspage/JobsHeader";
import JobsFilters from "@/components/jobspage/JobsFilters";
import JobsList from "@/components/jobspage/JobsList";

export default function JobsPage() {
  return (
    <main className="p-2 space-y-6">
      <JobsHeader />

      <JobsFilters />

      <p className="text-gray-500">Showing 5 jobs</p>

      <JobsList />
    </main>
  );
}
