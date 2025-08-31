import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, UserCheck, Clock } from "lucide-react";
import usePatientSearchStore from "@/stores/patientSearchStore";

export default function SearchHeader() {
  const { getStatistics } = usePatientSearchStore();

  const statistics = getStatistics();

  const stats = [
    {
      label: "إجمالي المرضى",
      value: statistics.total,
      icon: Users,
      color: "bg-sky-100 text-sky-700",
      iconColor: "text-sky-600",
    },
    {
      label: "مرضى نشطون",
      value: statistics.active,
      icon: UserCheck,
      color: "bg-emerald-100 text-emerald-700",
      iconColor: "text-emerald-600",
    },
    {
      label: "زيارات حديثة",
      value: statistics.recent,
      icon: Clock,
      color: "bg-violet-100 text-violet-700",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg shadow-md">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              البحث عن المرضى
            </h1>
            <p className="text-sm text-gray-600">
              البحث عن المرضى بالاسم أو الهاتف أو البريد الإلكتروني
            </p>
          </div>
        </div>

        {/* Compact Statistics Cards */}
        <div className="flex gap-3">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200 min-w-[120px]"
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-md ${stat.color.split(" ")[0]}`}
                  >
                    <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 leading-tight">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
