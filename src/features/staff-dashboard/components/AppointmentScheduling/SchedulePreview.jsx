import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Stethoscope } from "lucide-react";
import useAppointmentStore from "@/stores/appointmentStore";

export default function SchedulePreview() {
  const { getTodaysAppointments } = useAppointmentStore();

  const todaysAppointments = getTodaysAppointments();

  // Fallback mock data for demonstration
  const mockAppointments = [
    {
      time: "09:00 ص",
      patient: "سارة أحمد",
      doctor: "د. أحمد الراشد",
      treatment: "تنظيف أسنان",
      status: "مؤكد",
    },
    {
      time: "09:30 ص",
      patient: "محمد العلي",
      doctor: "د. سارة ويليامز",
      treatment: "فحص دوري",
      status: "في الانتظار",
    },
    {
      time: "10:00 ص",
      patient: "فاطمة حسن",
      doctor: "د. أحمد الراشد",
      treatment: "حشو أسنان",
      status: "مؤكد",
    },
  ];

  const appointmentsToShow =
    todaysAppointments.length > 0
      ? todaysAppointments.slice(0, 3).map((apt) => ({
          time: apt.appointmentTime,
          patient: apt.patientName,
          doctor: apt.doctor,
          treatment: apt.treatment,
          status:
            apt.status === "pending"
              ? "في الانتظار"
              : apt.status === "checked-in"
              ? "مؤكد"
              : apt.status === "missed"
              ? "فات"
              : "مؤكد",
        }))
      : mockAppointments;

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-emerald-600" />
          </div>
          مواعيد اليوم
        </CardTitle>
        <p className="text-slate-600 text-sm">المواعيد المجدولة لهذا اليوم</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointmentsToShow.map((apt, index) => (
          <Card
            key={index}
            className="border border-slate-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge
                  variant={apt.status === "مؤكد" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {apt.status}
                </Badge>
                <span className="text-sm font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded">
                  {apt.time}
                </span>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-slate-900">{apt.patient}</p>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Stethoscope className="w-3 h-3" />
                  {apt.doctor}
                </p>
                <p className="text-sm text-slate-600">{apt.treatment}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="pt-4 border-t border-slate-200">
          <Button variant="outline" className="w-full">
            عرض جميع المواعيد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
