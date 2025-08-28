import { UserCheck, Stethoscope, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

export default function DoctorsPerformance() {
  const { getFilteredStats, getColorClasses } = useStatisticsStore();
  const stats = getFilteredStats();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <UserCheck className="w-6 h-6 text-violet-600" />
          أداء الأطباء
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.doctors.map((doctor, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center mb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full ${getColorClasses(
                    doctor.color
                  )} flex items-center justify-center mb-3`}
                >
                  <Stethoscope
                    className={`w-8 h-8 ${getColorClasses(
                      doctor.color,
                      "icon"
                    )}`}
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">المواعيد:</span>
                  <Badge
                    variant="secondary"
                    className={`${getColorClasses(
                      doctor.color
                    )} ${getColorClasses(doctor.color, "text")}`}
                  >
                    {doctor.appointments}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">التقييم:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الإيرادات:</span>
                  <span className="font-semibold text-gray-900">
                    {doctor.revenue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
