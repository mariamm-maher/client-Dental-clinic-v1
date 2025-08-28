import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Activity } from "lucide-react";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";

export default function CalendarLegend() {
  const { doctors } = useWeeklyCalendarStore();

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctors Legend */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-sky-600" />
              الأطباء
            </h3>
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${doctor.color}`}></div>
                  <span className="text-slate-700">{doctor.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Legend */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              حالة الموعد
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  مؤكد
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  في الانتظار
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  ملغي
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
