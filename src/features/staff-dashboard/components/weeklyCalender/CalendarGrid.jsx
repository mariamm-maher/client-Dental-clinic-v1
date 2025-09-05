import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Plus } from "lucide-react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { arSA } from "date-fns/locale";
import useCalendarStore from "@/stores/weeklyCalendarStore";
import { useState, useEffect } from "react";
import AppointmentBookingModal from "./AppointmentBookingModal";

export default function CalendarGrid() {
  const {
    currentWeek,
    getAppointmentsForDay,
    getAppointmentStatusStyles,
    fetchAppointments,
    loading,
  } = useCalendarStore();

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateLocale = arSA;

  // Fetch appointments when component mounts or currentWeek changes
  useEffect(() => {
    fetchAppointments("week");
  }, [currentWeek, fetchAppointments]);

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();

  const handleAddAppointment = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (appointmentData) => {
    // Handle appointment submission
    console.log("New appointment:", appointmentData);
    console.log(appointmentData.patientId?.generalInfo?.name);
    setIsModalOpen(false);
    // Refresh appointments after adding new one
    await fetchAppointments("week");
  };

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
                {loading && (
                  <div className="text-center text-gray-500 py-4">
                    جاري تحميل المواعيد...
                  </div>
                )}

                {!loading &&
                  getAppointmentsForDay(day).map((appointment) => {
                    const styles = getAppointmentStatusStyles(appointment);
                    return (
                      <Card
                        key={appointment._id}
                        className={`border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer group ${
                          styles.border
                        } ${styles.bg} ${styles.glow || ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Time and Status */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="font-semibold text-slate-900">
                                  {format(
                                    new Date(appointment.appointmentDate),
                                    "HH:mm"
                                  )}
                                </span>
                              </div>
                              <Badge className={`text-xs ${styles.badge}`}>
                                {appointment.status === "confirmed"
                                  ? "مؤكد"
                                  : appointment.status === "pending"
                                  ? "في الانتظار"
                                  : appointment.status === "canceled"
                                  ? "ملغي"
                                  : appointment.status === "done"
                                  ? "مكتمل"
                                  : "فائت"}
                              </Badge>
                            </div>

                            {/* Patient Info */}
                            <div>
                              <h4 className="font-semibold text-slate-900 mb-1">
                                {appointment.patientId?.generalInfo?.name ||
                                  "غير محدد"}
                              </h4>
                              <p className="text-sm text-slate-600 mb-2">
                                {appointment.service}
                              </p>
                              <p className="text-xs text-slate-500">
                                {appointment.patientId?.generalInfo?.phone ||
                                  ""}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                {/* Add Appointment Button */}
                <Button
                  variant="outline"
                  className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200"
                  onClick={() => handleAddAppointment(day)}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موعد
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleModalSubmit}
      />
    </Card>
  );
}
