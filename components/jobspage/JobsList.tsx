import JobCard from "./JobCard";

export default function JobsList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(job => (
        <JobCard key={job} />
      ))}
    </div>
  );
}
