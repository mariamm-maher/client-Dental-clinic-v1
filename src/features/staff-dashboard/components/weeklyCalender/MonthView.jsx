import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isPast,
} from "date-fns";
import { arSA } from "date-fns/locale";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";

export default function MonthView() {
  const { currentWeek, getAppointmentsForDay, getAppointmentStatusStyles } =
    useWeeklyCalendarStore();

  const dateLocale = arSA;

  const getMonthDays = () => {
    const monthStart = startOfMonth(currentWeek);
    const monthEnd = endOfMonth(currentWeek);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 6 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 6 });

    const days = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const monthDays = getMonthDays();
  const weeks = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-emerald-500",
      pending: "bg-amber-500",
      cancelled: "bg-red-500",
      completed: "bg-blue-500",
      "in-progress": "bg-violet-500",
      "no-show": "bg-gray-500",
    };
    return colors[status] || "bg-gray-400";
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>
          {format(currentWeek, "MMMM yyyy", { locale: dateLocale })}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Week Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {[
            "السبت",
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
          ].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day) => {
                const appointments = getAppointmentsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentWeek);
                const isPastDate = isPast(day) && !isToday(day);
                const isTodayDate = isToday(day);

                return (
                  <div
                    key={day.toString()}
                    className={`
                      min-h-[120px] p-2 border rounded-lg transition-all duration-200 cursor-pointer
                      ${
                        isTodayDate
                          ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                          : isPastDate
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }
                      ${!isCurrentMonth ? "opacity-40" : ""}
                    `}
                  >
                    {/* Date Number */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`
                          text-sm font-semibold
                          ${
                            isTodayDate
                              ? "text-blue-600"
                              : isPastDate
                              ? "text-gray-400"
                              : "text-gray-900"
                          }
                        `}
                      >
                        {format(day, "d")}
                      </span>
                      {appointments.length > 0 && (
                        <Badge
                          variant={isTodayDate ? "default" : "secondary"}
                          className="text-xs h-5"
                        >
                          {appointments.length}
                        </Badge>
                      )}
                    </div>

                    {/* Appointments */}
                    <div className="space-y-1">
                      {appointments.slice(0, 3).map((appointment) => {
                        const styles = getAppointmentStatusStyles(appointment);
                        return (
                          <div
                            key={appointment.id}
                            className={`
                              p-1 rounded text-xs border-l-2 
                              ${styles.border} ${styles.bg}
                              ${isPastDate ? "opacity-50" : ""}
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">
                                {appointment.time}
                              </span>
                              <div
                                className={`w-2 h-2 rounded-full ${getStatusColor(
                                  appointment.status
                                )} ${isPastDate ? "opacity-50" : ""}`}
                              ></div>
                            </div>
                            <div className="truncate text-gray-600">
                              {appointment.patientName}
                            </div>
                          </div>
                        );
                      })}

                      {appointments.length > 3 && (
                        <div className="text-xs text-gray-500 text-center py-1">
                          +{appointments.length - 3} المزيد
                        </div>
                      )}

                      {/* Add appointment button for future dates */}
                      {appointments.length === 0 &&
                        !isPastDate &&
                        isCurrentMonth && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-8 border border-dashed border-gray-300 text-gray-500 hover:border-emerald-400 hover:text-emerald-600 text-xs"
                          >
                            <Plus className="w-3 h-3 ml-1" />
                            إضافة
                          </Button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            دليل الألوان
          </h4>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>مؤكد</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>في الانتظار</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <span>جاري الآن</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>مكتمل</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>ملغي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span>لم يحضر</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
