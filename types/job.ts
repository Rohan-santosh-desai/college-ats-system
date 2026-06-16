export interface Job {
    id: string;
    title: string;
    location: string;
    salary: string | null;
    jobType: string;
    description: string;
    createdAt: Date;
    recruiter: {
        companyName: string;
    };
    _count: {
        applications: number;
    };
}
