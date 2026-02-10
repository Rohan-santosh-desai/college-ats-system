"use client";

import { useState } from "react";

export default function ApplicationsFilters() {
    const [activeTab, setActiveTab] = useState("All");

    const tabs = [
        { name: "All", count: 4 },
        { name: "Applied", count: 1 },
        { name: "Shortlisted", count: 1 },
        { name: "Interview", count: 1 },
        { name: "Selected", count: 1 },
    ];

    return (
        <div className="bg-white border rounded-xl shadow-sm p-1">
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.name
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {tab.name} ({tab.count})
                    </button>
                ))}
            </div>
        </div>
    );
}
