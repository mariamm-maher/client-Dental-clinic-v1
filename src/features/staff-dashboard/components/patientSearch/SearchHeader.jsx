import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import usePatientSearchStore from "@/stores/patientSearchStore";

export default function SearchHeader() {
  const { getStatistics, getColorClasses } = usePatientSearchStore();

  const statistics = getStatistics();

  const stats = [
    {
      label: "إجمالي المرضى",
      value: statistics.total,
      change: "+5",
      trend: "up",
      icon: Users,
      color: "sky",
      description: "هذا الشهر",
    },
    {
      label: "مرضى نشطون",
      value: statistics.active,
      change: "+3",
      trend: "up",
      icon: UserCheck,
      color: "emerald",
      description: "من إجمالي المرضى",
    },
    {
      label: "زيارات حديثة",
      value: statistics.recent,
      change: "+8",
      trend: "up",
      icon: Clock,
      color: "violet",
      description: "آخر 30 يوم",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
          <Search className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            البحث عن المرضى
          </h1>
          <p className="text-gray-600">
            البحث عن المرضى بالاسم أو الهاتف أو البريد الإلكتروني
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-4 h-4 ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600 rotate-180"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${getColorClasses(stat.color, "icon")}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
