"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeId, setCollegeId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* -----------------------------
     Step 1 — Verify College Code
  ------------------------------*/
  const handleCollegeCheck = async () => {
    if (!collegeCode) {
      setError("Enter college code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/college/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeCode }),
      });

      const data = await res.json();

      if (data.success) {
        setCollegeId(data.collegeId);
        setStep(2);
      } else {
        setError(data.message || "Invalid college code");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     Step 2 — Register Student
  ------------------------------*/
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: "STUDENT",
          collegeId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Student Account</CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}

          {/* ---------- STEP 1 ---------- */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>College Code</Label>
                <Input
                  placeholder="Enter college code"
                  value={collegeCode}
                  onChange={(e) =>
                    setCollegeCode(e.target.value)
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleCollegeCheck}
                disabled={loading}
              >
                {loading ? "Checking..." : "Continue"}
              </Button>
            </div>
          )}

          {/* ---------- STEP 2 ---------- */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button
                  className="w-full"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
