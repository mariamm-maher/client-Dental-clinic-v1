import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Timer, XCircle, Check, X } from "lucide-react";
import { useAppointmentStore } from "@/stores";

const iconMap = {
  Calendar,
  CheckCircle,
  Timer,
  XCircle,
  Check,
  X,
};

export default function AppointmentStatistics() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const stats = [
    {
      label: "إجمالي المواعيد",
      value: appointments.length,
      icon: "Calendar",
      color: "text-sky-600",
      bgColor: "bg-sky-50 border-sky-200",
      trend: "اليوم",
    },
    {
      label: "مؤكدة",
      value: appointments.filter((a) => a.status === "confirmed").length,
      icon: "CheckCircle",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      trend: "مؤكدة",
    },
    {
      label: "في الانتظار",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: "Timer",
      color: "text-amber-600",
      bgColor: "bg-amber-50 border-amber-200",
      trend: "معلقة",
    },
    {
      label: "تمت",
      value: appointments.filter((a) => a.status === "done").length,
      icon: "Check",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      trend: "مكتملة",
    },
    {
      label: "ملغاة",
      value: appointments.filter((a) => a.status === "canceled").length,
      icon: "X",
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
      trend: "ملغاة",
    },
    {
      label: "فائتة",
      value: appointments.filter((a) => a.status === "missed").length,
      icon: "XCircle",
      color: "text-gray-600",
      bgColor: "bg-gray-50 border-gray-200",
      trend: "غياب",
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon];

        return (
          <Card
            key={index}
            className={`border-2 ${stat.bgColor} hover:shadow-lg transition-all duration-200`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.trend}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor} ${stat.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
