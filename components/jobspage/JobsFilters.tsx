import { Search, MapPin, Filter } from "lucide-react";

export default function JobsFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border rounded-xl shadow-sm">
      {/* Search */}
      <div className="flex items-center flex-1 border rounded-lg px-3">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          placeholder="Search jobs, companies, skills..."
          className="w-full p-2 outline-none"
        />
      </div>

      {/* Location */}
      <button className="flex items-center gap-2 border px-4 py-2 rounded-lg">
        <MapPin className="w-4 h-4" />
        All Locations
      </button>

      {/* Type */}
      <button className="flex items-center gap-2 border px-4 py-2 rounded-lg">
        <Filter className="w-4 h-4" />
        All Types
      </button>
    </div>
  );
}
