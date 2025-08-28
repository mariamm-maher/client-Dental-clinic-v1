import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Plus, Timer } from "lucide-react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { arSA } from "date-fns/locale";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";

export default function CalendarGrid() {
  const { currentWeek, getAppointmentsForDay, getDoctorColor } =
    useWeeklyCalendarStore();

  const dateLocale = arSA;

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>
          الجدول الأسبوعي
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={`text-center p-4 rounded-lg border-2 transition-all duration-200 ${
                isToday(day)
                  ? "bg-sky-50 border-sky-200 text-sky-700"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <div className="font-semibold text-sm mb-1">
                {format(day, "EEE", { locale: dateLocale })}
              </div>
              <div
                className={`text-2xl font-bold mb-2 ${
                  isToday(day) ? "text-sky-700" : "text-slate-900"
                }`}
              >
                {format(day, "d")}
              </div>
              <Badge variant="secondary" className="text-xs">
                {getAppointmentsForDay(day).length} موعد
              </Badge>
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <div key={day.toString()} className="space-y-3">
              <div className="lg:hidden">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {format(day, "EEEE d MMMM", { locale: dateLocale })}
                </h3>
              </div>

              <div className="space-y-3 min-h-[400px]">
                {getAppointmentsForDay(day).map((appointment) => (
                  <Card
                    key={appointment.id}
                    className={`border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer group ${
                      appointment.status === "confirmed"
                        ? `border-l-${getDoctorColor(
                            appointment.doctorName
                          )}-500 bg-${getDoctorColor(
                            appointment.doctorName
                          )}-50/50`
                        : appointment.status === "pending"
                        ? "border-l-amber-500 bg-amber-50/50"
                        : "border-l-red-500 bg-red-50/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Time and Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="font-semibold text-slate-900">
                              {appointment.time}
                            </span>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                ? "secondary"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {appointment.status === "confirmed"
                              ? "مؤكد"
                              : appointment.status === "pending"
                              ? "في الانتظار"
                              : "ملغي"}
                          </Badge>
                        </div>

                        {/* Patient Info */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2">
                            {appointment.treatment}
                          </p>
                        </div>

                        {/* Doctor and Duration */}
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full bg-${getDoctorColor(
                                appointment.doctorName
                              )}-500`}
                            ></div>
                            <span>
                              {appointment.doctorName.replace("د. ", "")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            <span>{appointment.duration} د</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute z-10 bg-slate-900 text-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none transform -translate-y-2 left-full ml-2 top-0 w-64 hidden lg:block">
                        <div className="space-y-2">
                          <p className="font-semibold">
                            {appointment.patientName}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>العلاج:</strong> {appointment.treatment}
                            </p>
                            <p>
                              <strong>الطبيب:</strong> {appointment.doctorName}
                            </p>
                            <p>
                              <strong>الوقت:</strong> {appointment.time} (
                              {appointment.duration} دقيقة)
                            </p>
                            <p>
                              <strong>الحالة:</strong>{" "}
                              {appointment.status === "confirmed"
                                ? "مؤكد"
                                : appointment.status === "pending"
                                ? "في الانتظار"
                                : "ملغي"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Appointment Button */}
                <Button
                  variant="outline"
                  className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موعد
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
