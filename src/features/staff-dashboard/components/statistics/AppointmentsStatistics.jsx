import {
  Calendar,
  CalendarDays,
  CalendarPlus,
  CheckCircle,
  XCircle,
  Clock,
  Timer,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  Calendar,
  CalendarDays,
  CalendarPlus,
  CheckCircle,
  XCircle,
  Clock,
  Timer,
  Activity,
};

export default function AppointmentsStatistics() {
  const { getStatsSection, getColorClasses } = useStatisticsStore();
  const appointmentsStats = getStatsSection("appointments");

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {appointmentsStats.overview?.map((stat, index) => {
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
        {/* Appointment Status Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <Activity className="w-6 h-6 text-sky-600" />
              توزيع حالة المواعيد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentsStats.status?.map((appointment, index) => {
              const IconComponent = iconMap[appointment.icon];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        appointment.color
                      )}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${getColorClasses(
                          appointment.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.value} من {appointment.total}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">
                      {appointment.percentage}%
                    </div>
                    <Progress
                      value={appointment.percentage}
                      className="w-16 h-2 mt-1"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Most Common Services */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
              أكثر الخدمات طلباً
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentsStats.services?.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${getColorClasses(
                      service.color,
                      "progress"
                    )}`}
                  ></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {service.service}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {service.count} موعد
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <Badge
                    variant="secondary"
                    className={getColorClasses(service.color)}
                  >
                    {service.percentage}%
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
