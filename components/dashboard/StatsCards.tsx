import { Briefcase, CheckCircle, Calendar, Award } from "lucide-react";

function Card({
  title,
  value,
  Icon,
  color,
}: {
  title: string;
  value: number;
  Icon: any;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      {/* Icon container */}
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Applied Jobs"
        value={12}
        Icon={Briefcase}
        color="bg-blue-100 text-blue-600"
      />

      <Card
        title="Shortlisted"
        value={4}
        Icon={CheckCircle}
        color="bg-yellow-100 text-yellow-600"
      />

      <Card
        title="Interviews"
        value={2}
        Icon={Calendar}
        color="bg-blue-100 text-blue-600"
      />

      <Card
        title="Offers"
        value={1}
        Icon={Award}
        color="bg-green-100 text-green-600"
      />
    </div>
  );
}
