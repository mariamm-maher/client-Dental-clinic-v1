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
          </div>{" "}
          {/* Status Legend */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              حالة الموعد
            </h3>{" "}
            <div className="grid grid-cols-2 gap-3">
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
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  تمت
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  ملغاة
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  فائتة
                </Badge>
              </div>
            </div>
            {/* Date Status Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-slate-800 mb-3">
                مؤشرات التاريخ
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-200"></div>
                  <span className="text-slate-600">
                    مواعيد اليوم (مميزة بحدود زرقاء)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-gray-100 opacity-70"></div>
                  <span className="text-slate-600">
                    مواعيد سابقة (باهتة ومعطلة)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-white border border-slate-200"></div>
                  <span className="text-slate-600">
                    مواعيد مستقبلية (قابلة للتفاعل)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
