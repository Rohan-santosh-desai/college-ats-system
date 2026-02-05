"use client"
import * as React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = React.use(params)
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState("");

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/invite/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending required fields to the API
        body: JSON.stringify({ 
          token, 
          fullName, 
          password 
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/login"); // Redirecting on success
      } else {
        setError(data.error || "Failed to accept invite");
      }
    } catch (err: any) {
      setError("Something went wrong: " + err.message);
    }
  };

  if (loading) return <div>Checking invite...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Recruiter Invitation</h1>
      <p>Email: {inviteData.email}</p>
      <p>Company: {inviteData.companyName}</p>

      {/* Moved onSubmit to the form */}
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ display: "block", marginBottom: 10, border: "1px solid #ccc", padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10, border: "1px solid #ccc", padding: 8 }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10, border: "1px solid #ccc", padding: 8 }}
        />

        <button 
          type="submit" 
          style={{ 
            display: "block", 
            marginBottom: 10, 
            backgroundColor: "#007bff", 
            color: "white", 
            padding: 8, 
            border: "none", 
            borderRadius: 4 
          }}
        >
          Create Recruiter Account
        </button>
      </form>
    </div>
  )
}