"use client";

import ApplicationsHeader from "@/components/applicationspage/ApplicationsHeader";
import ApplicationsFilters from "@/components/applicationspage/ApplicationsFilters";
import ApplicationsList from "@/components/applicationspage/ApplicationsList";

export default function ApplicationsPage() {
    return (
        <main className="p-2 space-y-6">
            <ApplicationsHeader />

            <ApplicationsFilters />

            <ApplicationsList />
        </main>
    );
}
