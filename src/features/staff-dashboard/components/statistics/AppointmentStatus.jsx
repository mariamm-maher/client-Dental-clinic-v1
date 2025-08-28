import { PieChart, CheckCircle, XCircle, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  CheckCircle,
  XCircle,
  Timer,
};

export default function AppointmentStatus() {
  const { getFilteredStats, getColorClasses } = useStatisticsStore();
  const stats = getFilteredStats();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <PieChart className="w-6 h-6 text-sky-600" />
          توزيع حالة المواعيد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.appointments.map((appointment, index) => {
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
  );
}
