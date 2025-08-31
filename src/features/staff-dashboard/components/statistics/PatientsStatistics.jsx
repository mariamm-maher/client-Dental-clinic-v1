import {
  Users,
  UserPlus,
  UserCheck,
  Baby,
  User,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  Users,
  UserPlus,
  UserCheck,
  Baby,
  User,
};

export default function PatientsStatistics() {
  const { getStatsSection, getColorClasses } = useStatisticsStore();
  const patientsStats = getStatsSection("patients");

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patientsStats.overview?.map((stat, index) => {
          const IconComponent = iconMap[stat.icon];
          const isPositive = stat.trend === "up";

          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2">
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          isPositive ? "text-emerald-600" : "text-red-600"
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
                    <IconComponent
                      className={`w-6 h-6 ${getColorClasses(
                        stat.color,
                        "icon"
                      )}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Groups Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <Users className="w-6 h-6 text-sky-600" />
              توزيع الفئات العمرية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patientsStats.ageGroups?.map((group, index) => {
              const IconComponent = iconMap[group.icon];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        group.color
                      )}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${getColorClasses(
                          group.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {group.group}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {group.count} مريض
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">
                      {group.percentage}%
                    </div>
                    <Progress
                      value={group.percentage}
                      className="w-16 h-2 mt-1"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top Returning Patients */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <UserCheck className="w-6 h-6 text-emerald-600" />
              أكثر المرضى زيارة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patientsStats.returning?.map((patient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {patient.name.split(" ")[0][0]}
                    {patient.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {patient.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone.slice(-4)}***
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(patient.lastVisit).toLocaleDateString("ar")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700"
                  >
                    {patient.visits} زيارة
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
