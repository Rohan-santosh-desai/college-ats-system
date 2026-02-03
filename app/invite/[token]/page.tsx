"use client"
import * as React from "react"
import { useEffect , useState } from "react"
import { useRouter } from "next/navigation";


export default  function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  
    const { token } = React.use(params) 
    const router = useRouter();

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

      <form style={{ marginTop: 20 }}>
        <input 
          type="text"
          placeholder="Full Name"
          style={{ display: "block", marginBottom: 10,  border: "1px solid #ccc", padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ display: "block", marginBottom: 10,  border: "1px solid #ccc", padding: 8 }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
           style={{ display: "block", marginBottom: 10,  border: "1px solid #ccc", padding: 8 }}
        />

        <button type="submit"  style={{ display: "block", marginBottom: 10,  backgroundColor: "#007bff", color: "white", padding: 8, border: "none", borderRadius: 4 }}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch("/api/invite/accept", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token }),
                }); 
                const data = await res.json();
                console.log(data);

                if (data.success) {
                  router.push("/login");
                } else {
                  setError(data.error || "Failed to accept invite");
                }
              } catch (err) {
                setError("Something went wrong: " + (err as any).message);
              }
            }}
        >
          Create Recruiter Account
        </button>
      </form>

    </div>
    )
}
