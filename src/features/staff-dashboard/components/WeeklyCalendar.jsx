import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Plus,
  Filter,
} from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
} from "date-fns";

export default function WeeklyCalendar() {
  const { t } = useTranslation();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      doctorName: "Dr. Ahmed Al-Rashid",
      treatment: "Dental Cleaning",
      time: "09:00",
      duration: 30,
      status: "confirmed",
      date: new Date(2025, 0, 27), // Today
    },
    {
      id: 2,
      patientName: "أحمد محمد العلي",
      doctorName: "Dr. Sarah Williams",
      treatment: "Root Canal",
      time: "09:30",
      duration: 60,
      status: "confirmed",
      date: new Date(2025, 0, 27), // Today
    },
    {
      id: 3,
      patientName: "Emma Davis",
      doctorName: "Dr. Ahmed Al-Rashid",
      treatment: "Teeth Whitening",
      time: "14:00",
      duration: 45,
      status: "pending",
      date: new Date(2025, 0, 28), // Tomorrow
    },
    {
      id: 4,
      patientName: "محمد الرشيد",
      doctorName: "Dr. Sarah Williams",
      treatment: "Orthodontic Consultation",
      time: "10:30",
      duration: 30,
      status: "confirmed",
      date: new Date(2025, 0, 29), // Day after tomorrow
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      doctorName: "Dr. Ahmed Al-Rashid",
      treatment: "Cavity Filling",
      time: "11:00",
      duration: 45,
      status: "confirmed",
      date: new Date(2025, 0, 30),
    },
  ];

  const doctors = [
    { id: 1, name: "Dr. Ahmed Al-Rashid", color: "bg-blue-500" },
    { id: 2, name: "Dr. Sarah Williams", color: "bg-green-500" },
    { id: 3, name: "Dr. Mohammed Hassan", color: "bg-purple-500" },
  ];

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Sunday
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const getAppointmentsForDay = (date) => {
    return appointments.filter(
      (appointment) =>
        isSameDay(appointment.date, date) &&
        (selectedFilter === "all" || appointment.doctorName === selectedFilter)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDoctorColor = (doctorName) => {
    const doctor = doctors.find((d) => d.name === doctorName);
    return doctor?.color || "bg-gray-500";
  };

  const weekDays = getWeekDays();
  const totalAppointments = appointments.filter((apt) => {
    return weekDays.some((day) => isSameDay(apt.date, day));
  }).length;

  const stats = [
    { label: "هذا الأسبوع", value: totalAppointments, icon: Calendar },
    {
      label: "اليوم",
      value: getAppointmentsForDay(new Date()).length,
      icon: Clock,
    },
    { label: "الأطباء", value: doctors.length, icon: Stethoscope },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              التقويم الأسبوعي
            </h1>
            <p className="text-slate-600">عرض مواعيد الأسبوع</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentWeek((prev) => subWeeks(prev, 1))}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentWeek(new Date())}
            className="px-4"
          >
            اليوم
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentWeek((prev) => addWeeks(prev, 1))}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-md bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                تصفية حسب الطبيب:
              </span>
              <div className="flex space-x-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                >
                  جميع الأطباء
                </Button>
                {doctors.map((doctor) => (
                  <Button
                    key={doctor.id}
                    variant={
                      selectedFilter === doctor.name ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedFilter(doctor.name)}
                    className="flex items-center space-x-1"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${doctor.color}`}
                    ></div>
                    <span>{doctor.name.replace("Dr. ", "")}</span>
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-600">
              أسبوع {format(weekDays[0], "MMM d")} -{" "}
              {format(weekDays[6], "MMM d, yyyy")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">
            الجدول الأسبوعي
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Day Headers */}
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-4 text-center rounded-lg ${
                  isToday(day)
                    ? "bg-primary text-white shadow-md"
                    : "bg-secondary/20 text-slate-700"
                }`}
              >
                <div className="font-semibold text-sm">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isToday(day) ? "text-white" : "text-slate-900"
                  }`}
                >
                  {format(day, "d")}
                </div>
                <div className="text-xs opacity-75">
                  {getAppointmentsForDay(day).length} apt
                  {getAppointmentsForDay(day).length !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>

          {/* Appointment Grid */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="min-h-96 border border-slate-200 rounded-lg p-2 bg-slate-50/50"
              >
                <div className="space-y-2">
                  {getAppointmentsForDay(day).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="relative group cursor-pointer"
                    >
                      <div
                        className={`p-2 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {/* Doctor indicator */}
                        <div className="flex items-center space-x-1 mb-1">
                          <div
                            className={`w-2 h-2 rounded-full ${getDoctorColor(
                              appointment.doctorName
                            )}`}
                          ></div>
                          <span className="text-xs font-medium text-slate-600">
                            {appointment.time}
                          </span>
                        </div>

                        {/* Patient Info */}
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {appointment.patientName}
                          </p>
                          <p className="text-xs text-slate-600 truncate">
                            {appointment.treatment}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {appointment.duration}min
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs px-1 py-0"
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                        <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg text-xs w-64">
                          <div className="font-semibold mb-1">
                            {appointment.patientName}
                          </div>
                          <div className="space-y-1 text-slate-300">
                            <div>العلاج: {appointment.treatment}</div>
                            <div>الطبيب: {appointment.doctorName}</div>
                            <div>
                              الوقت: {appointment.time} ({appointment.duration}{" "}
                              دقيقة)
                            </div>
                            <div>الحالة: {appointment.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add appointment button for each day */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 text-xs text-slate-500 border border-dashed border-slate-300 hover:border-primary hover:text-primary"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    إضافة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-700">
                  الأطباء:
                </span>
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center space-x-1">
                    <div
                      className={`w-3 h-3 rounded-full ${doctor.color}`}
                    ></div>
                    <span className="text-xs text-slate-600">
                      {doctor.name.replace("Dr. ", "")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-700">
                  الحالة:
                </span>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  مؤكد
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                  في الانتظار
                </Badge>
                <Badge className="bg-red-100 text-red-800 text-xs">ملغى</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
