export default function WaitingApproval() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
        <div className="mb-4 text-yellow-500">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Waiting for Approval</h2>
        <p className="text-gray-600">Your profile is currently under review by the administrator. <br />Please check back later.</p>
      </div>
    </div>
  );
}
