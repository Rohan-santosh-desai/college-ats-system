// app/admin/page.tsx
"use client";

import { useState } from "react";


export default function AdminDashboard() {

    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [inviteLink, setInviteLink] = useState("");
    const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     const handlesubmit = async (e: any) => {
      e.preventDefault();
      const res = await fetch("/api/admin/invite-recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, companyName }),
      });
      
      const data = await res.json();
      if (data.success) {
        setInviteLink(data.inviteLink);
        setError("");
      } else {
        setError(data.error || "Failed to generate invite link");
      }

     }
        

     

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Simple Sidebar for Admin */}
      <aside className="w-64 bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-300 cursor-pointer">Manage Users</li>
          <li className="hover:text-blue-300 cursor-pointer">System Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">System Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,204</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Active Recruiters</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">45</p>
          </div>

           {/* Card 3 */}
           <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">12</p>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-xl">
  <h2 className="text-xl font-semibold mb-4">Invite Recruiter</h2>

  <form onSubmit={handlesubmit} className="space-y-4">
    <input
      type="email"
      placeholder="Recruiter Email"
      className="w-full border p-2 rounded"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="text"
      placeholder="Company Name"
      className="w-full border p-2 rounded"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      required
    />

    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Generate Invite
    </button>
  </form>

  {inviteLink && (
    <p className="mt-4 text-green-600 break-all">
      Invite Link: {inviteLink}
    </p>
  )}

  {error && <p className="mt-4 text-red-500">{error}</p>}
</div>

      </main>
    </div>
  );
}