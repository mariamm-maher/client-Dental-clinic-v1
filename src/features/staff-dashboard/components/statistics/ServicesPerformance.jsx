import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStatisticsStore from "@/stores/statisticsStore";

export default function ServicesPerformance() {
  const { getFilteredStats, getColorClasses } = useStatisticsStore();
  const stats = getFilteredStats();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <Target className="w-6 h-6 text-emerald-600" />
          الخدمات الأكثر طلباً
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.services.map((service, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${getColorClasses(
                    service.color,
                    "progress"
                  )}`}
                />
                <span className="font-medium text-gray-900">
                  {service.name}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {service.count} مريض
                </p>
                <p className="text-xs text-gray-600">{service.revenue}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getColorClasses(
                  service.color,
                  "progress"
                )}`}
                style={{ width: `${service.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
