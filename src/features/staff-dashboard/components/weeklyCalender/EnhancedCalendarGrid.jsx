import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  Plus,
  Timer,
  User,
  Stethoscope,
  MapPin,
  Phone,
} from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  isToday,
  isPast,
  isFuture,
} from "date-fns";
import { arSA } from "date-fns/locale";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";

export default function EnhancedCalendarGrid() {
  const {
    currentWeek,
    currentDate,
    viewType,
    getAppointmentsForDay,
    getDoctorColor,
    getAppointmentStatusStyles,
  } = useWeeklyCalendarStore();

  const dateLocale = arSA;

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();

  const getStatusBadgeText = (status) => {
    const statusMap = {
      confirmed: "مؤكد",
      pending: "في الانتظار",
      cancelled: "ملغي",
      completed: "مكتمل",
      "in-progress": "جاري الآن",
      "no-show": "لم يحضر",
    };
    return statusMap[status] || "غير محدد";
  };

  const AppointmentCard = ({ appointment, compact = false }) => {
    const styles = getAppointmentStatusStyles(appointment);
    const appointmentDate = new Date(appointment.date);
    const isPastDate = isPast(appointmentDate) && !isToday(appointmentDate);
    const isTodayDate = isToday(appointmentDate);

    return (
      <Card
        className={`
          border-l-4 hover:shadow-md transition-all duration-300 cursor-pointer group relative
          ${styles.border} ${styles.bg} ${styles.opacity || ""} ${
          styles.glow || ""
        }
          ${isPastDate ? "cursor-not-allowed" : "hover:scale-[1.02]"}
          ${isTodayDate ? "ring-2 ring-blue-200 shadow-lg" : ""}
        `}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Time and Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock
                  className={`w-4 h-4 ${
                    isPastDate ? "text-gray-400" : "text-slate-500"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    isPastDate ? "text-gray-400" : "text-slate-900"
                  }`}
                >
                  {appointment.time}
                </span>
                {isTodayDate && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-600 border-blue-200 text-xs"
                  >
                    اليوم
                  </Badge>
                )}
              </div>
              <Badge className={`text-xs ${styles.badge}`}>
                {getStatusBadgeText(appointment.status)}
              </Badge>
            </div>

            {/* Patient Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User
                  className={`w-4 h-4 ${
                    isPastDate ? "text-gray-400" : "text-slate-500"
                  }`}
                />
                <h4
                  className={`font-semibold ${
                    isPastDate ? "text-gray-400" : "text-slate-900"
                  }`}
                >
                  {appointment.patientName}
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope
                  className={`w-3 h-3 ${
                    isPastDate ? "text-gray-400" : "text-slate-500"
                  }`}
                />
                <p
                  className={`text-sm ${
                    isPastDate ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  {appointment.service}
                </p>
              </div>
            </div>

            {/* Doctor and Duration */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isPastDate
                      ? "bg-gray-400"
                      : `bg-${getDoctorColor(appointment.doctorName)}-500`
                  }`}
                ></div>
                <span
                  className={isPastDate ? "text-gray-400" : "text-slate-600"}
                >
                  {appointment.doctorName.replace("د. ", "")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Timer
                  className={`w-3 h-3 ${
                    isPastDate ? "text-gray-400" : "text-slate-500"
                  }`}
                />
                <span
                  className={isPastDate ? "text-gray-400" : "text-slate-600"}
                >
                  {appointment.duration} د
                </span>
              </div>
            </div>

            {/* Notes for completed/past appointments */}
            {appointment.notes &&
              (isPastDate || appointment.status === "completed") && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500">
                  {appointment.notes}
                </div>
              )}
          </div>

          {/* Enhanced Hover Tooltip */}
          {!compact && (
            <div className="absolute z-10 bg-slate-900 text-white p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none transform -translate-y-2 left-full ml-2 top-0 w-80 hidden lg:block">
              <div className="space-y-3">
                <div className="border-b border-slate-700 pb-2">
                  <p className="font-semibold text-lg">
                    {appointment.patientName}
                  </p>
                  <p className="text-slate-300 text-sm">
                    {appointment.service}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400">الطبيب</p>
                    <p className="text-white">{appointment.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">المدة</p>
                    <p className="text-white">{appointment.duration} دقيقة</p>
                  </div>
                  <div>
                    <p className="text-slate-400">الوقت</p>
                    <p className="text-white">{appointment.time}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">الحالة</p>
                    <p className="text-white">
                      {getStatusBadgeText(appointment.status)}
                    </p>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="border-t border-slate-700 pt-2">
                    <p className="text-slate-400 text-xs">ملاحظات</p>
                    <p className="text-slate-200 text-sm">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                {!isPastDate && (
                  <div className="border-t border-slate-700 pt-2 flex gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1"
                    >
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-3 py-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      إلغاء
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (viewType === "day") {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            مواعيد {format(currentDate, "EEEE d MMMM", { locale: dateLocale })}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-2xl mx-auto">
            {getAppointmentsForDay(currentDate).map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}

            {getAppointmentsForDay(currentDate).length === 0 && (
              <div className="text-center py-12">
                <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد مواعيد
                </h3>
                <p className="text-gray-500 mb-6">
                  لا توجد مواعيد مجدولة لهذا اليوم
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موعد جديد
                </Button>
              </div>
            )}

            {/* Add Appointment Button */}
            {getAppointmentsForDay(currentDate).length > 0 && (
              <Button
                variant="outline"
                className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة موعد جديد
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Week view (existing functionality with enhanced styling)
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
                  ? "bg-sky-50 border-sky-200 text-sky-700 ring-2 ring-sky-100"
                  : isPast(day) && !isToday(day)
                  ? "bg-gray-50 border-gray-200 text-gray-400"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="font-semibold text-sm mb-1">
                {format(day, "EEE", { locale: dateLocale })}
              </div>
              <div
                className={`text-2xl font-bold mb-2 ${
                  isToday(day)
                    ? "text-sky-700"
                    : isPast(day) && !isToday(day)
                    ? "text-gray-400"
                    : "text-slate-900"
                }`}
              >
                {format(day, "d")}
              </div>
              <Badge
                variant={isToday(day) ? "default" : "secondary"}
                className={`text-xs ${
                  isToday(day) ? "bg-sky-100 text-sky-700" : ""
                }`}
              >
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
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    compact={true}
                  />
                ))}

                {/* Add Appointment Button */}
                <Button
                  variant="outline"
                  className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200"
                  disabled={isPast(day) && !isToday(day)}
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
