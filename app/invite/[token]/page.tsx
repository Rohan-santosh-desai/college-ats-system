"use client"

import { use, useEffect , useState } from "react"

export default function InvitePage({ params }: { params: { token: string } }) {
    const token = params.token

    const [loading, setLoading] = useState(true);
    const [inviteData, setInviteData] = useState<any>(null);
    const [error, setError] = useState("");

  useEffect(() => {
    const verifyInvite = async () => {
      try {
        const res = await fetch("/api/invite/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Invalid invite");
        } else {
          setInviteData(data);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    verifyInvite();
  }, [token]);
  
  
  if (loading) return <div>Checking invite...</div>;

   if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: 40 }}>
      <h1>Recruiter Invitation</h1>

      <p>Email: {inviteData.email}</p>
      <p>Company: {inviteData.companyName}</p>

      <p>Invite verified. Registration form comes next.</p>
    </div>
    )
}
