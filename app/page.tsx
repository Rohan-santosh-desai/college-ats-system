import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    switch (session.user.role) {
      case "RECRUITER":
        redirect("/recruiter/dashboard");
        break;

      case "ADMIN":
        redirect("/admin/dashboard");
        break;

      case "STUDENT":
      default:
        redirect("/student/dashboard");
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-blue-600">
          College ATS
        </h1>

        <p className="text-xl text-gray-600">
          The bridge between Students and Recruiters.
        </p>

        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
