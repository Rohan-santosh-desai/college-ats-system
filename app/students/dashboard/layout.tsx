import Link from "next/link";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="p-6 font-bold text-xl text-blue-600">
                    CampusHire
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/students/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Dashboard
                    </Link>
                    <Link href="/student/dashboard/profile" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Profile
                    </Link>
                    <Link href="/students/dashboard/jobs" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Jobs
                    </Link>
                    <Link href="/students/dashboard/applications" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Applications
                    </Link>
                    <Link href="/student/dashboard/resume" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Resume
                    </Link>
                    <Link href="/student/dashboard/settings" className="block px-4 py-2 rounded hover:bg-gray-100">
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t text-sm text-gray-600">
                    Logged in as Student
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <h1 className="font-semibold">Student Dashboard</h1>
                    <button className="text-sm text-red-600">Logout</button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
