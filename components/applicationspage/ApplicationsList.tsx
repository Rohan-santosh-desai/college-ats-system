import ApplicationCard from "./ApplicationCard";

export default function ApplicationsList() {
    const applications = [
        {
            role: "Software Engineer",
            company: "TechCorp",
            location: "Bangalore, India",
            salary: "₹12-18 LPA",
            appliedDate: "1/16/2024",
            status: "Shortlisted" as const,
            feedback: "Your resume shows strong technical background with React and Node.js. However, our ATS detected missing skills in Docker, AWS, and CI/CD which are required for this role.",
        },
        {
            role: "Data Analyst",
            company: "DataDriven Inc",
            location: "Mumbai, India",
            salary: "₹8-12 LPA",
            appliedDate: "1/19/2024",
            status: "Applied" as const,
        },
        {
            role: "UI/UX Designer",
            company: "DesignHub",
            location: "Delhi, India",
            salary: "₹10-15 LPA",
            appliedDate: "1/21/2024",
            status: "Interview" as const,
            feedback: "Excellent portfolio match! Your Figma and Adobe XD skills align well with our requirements. Minor gaps in user research methodologies detected.",
        },
        {
            role: "Full Stack Developer",
            company: "StartupXYZ",
            location: "Remote",
            salary: "₹15-22 LPA",
            appliedDate: "1/10/2024",
            status: "Selected" as const,
            feedback: "Outstanding match! Your resume demonstrates 95% skill alignment with the job requirements. Strong experience in full-stack development detected.",
        },
    ];

    return (
        <div className="space-y-4">
            {applications.map((app, index) => (
                <ApplicationCard key={index} {...app} />
            ))}
        </div>
    );
}
