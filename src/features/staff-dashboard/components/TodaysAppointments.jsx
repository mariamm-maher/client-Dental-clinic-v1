import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  User,
  Filter,
  RefreshCw,
  Calendar,
} from "lucide-react";

export default function TodaysAppointments() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Sarah Johnson",
      phone: "+966501234567",
      appointmentTime: "09:00 AM",
      status: "pending",
      treatment: "Dental Cleaning",
      doctor: "Dr. Ahmed",
      notes: "Regular checkup",
      checkedInAt: null,
    },
    {
      id: 2,
      patientName: "أحمد محمد العلي",
      phone: "+966509876543",
      appointmentTime: "09:30 AM",
      status: "checked-in",
      treatment: "Root Canal",
      doctor: "Dr. Sarah",
      notes: "Follow-up appointment",
      checkedInAt: "09:25 AM",
    },
    {
      id: 3,
      patientName: "Emma Davis",
      phone: "+966555123456",
      appointmentTime: "10:00 AM",
      status: "pending",
      treatment: "Teeth Whitening",
      doctor: "Dr. Ahmed",
      notes: "First-time patient",
      checkedInAt: null,
    },
    {
      id: 4,
      patientName: "محمد الرشيد",
      phone: "+966556789012",
      appointmentTime: "10:30 AM",
      status: "missed",
      treatment: "Dental Implant",
      doctor: "Dr. Sarah",
      notes: "Consultation",
      checkedInAt: null,
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      phone: "+966551234567",
      appointmentTime: "11:00 AM",
      status: "checked-in",
      treatment: "Cavity Filling",
      doctor: "Dr. Ahmed",
      notes: "Emergency appointment",
      checkedInAt: "10:45 AM",
    },
    {
      id: 6,
      patientName: "علي السعد",
      phone: "+966557890123",
      appointmentTime: "11:30 AM",
      status: "pending",
      treatment: "Orthodontic Consultation",
      doctor: "Dr. Sarah",
      notes: "Braces consultation",
      checkedInAt: null,
    },
  ]);

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            status: newStatus,
            checkedInAt:
              newStatus === "checked-in"
                ? new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null,
          };
        }
        return apt;
      })
    );

    const appointment = appointments.find((apt) => apt.id === appointmentId);
    const statusMessages = {
      "checked-in": `${appointment?.patientName} تم تسجيل الوصول`,
      missed: `${appointment?.patientName} تم وضع علامة فات`,
      completed: `${appointment?.patientName} تم إنهاء الموعد`,
    };

    toast.success(statusMessages[newStatus] || "تم تحديث الحالة");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "في الانتظار",
        variant: "secondary",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      "checked-in": {
        label: "تم تسجيل الوصول",
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      missed: {
        label: "فاتت",
        variant: "destructive",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
      completed: {
        label: "مكتمل",
        variant: "default",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge
        className={`${config.className} flex items-center gap-1 text-xs font-medium`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "إجمالي المواعيد",
      value: appointments.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "تم تسجيل الوصول",
      value: appointments.filter((a) => a.status === "checked-in").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "في الانتظار",
      value: appointments.filter((a) => a.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "فاتت",
      value: appointments.filter((a) => a.status === "missed").length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">مواعيد اليوم</h1>
            <p className="text-slate-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 hover:bg-secondary/50"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-md bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="ابحث باسم المريض أو الهاتف أو العلاج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-2 border-slate-200 focus:border-primary rounded-lg"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  التصفية:{" "}
                  {filterStatus === "all"
                    ? "الكل"
                    : filterStatus.charAt(0).toUpperCase() +
                      filterStatus.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  كل المواعيد
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                  في الانتظار
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("checked-in")}>
                  تم تسجيل الوصول
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("missed")}>
                  فاتت
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">
            المواعيد ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800 text-base">
                        {appointment.patientName}
                      </h3>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.appointmentTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {appointment.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {appointment.doctor}
                      </div>
                      <div className="text-slate-500 truncate">
                        {appointment.treatment}
                      </div>
                    </div>

                    {appointment.checkedInAt && (
                      <div className="mt-2 text-xs text-green-600">
                        Checked in at {appointment.checkedInAt}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {appointment.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "checked-in")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      تسجيل الوصول
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {appointment.status !== "checked-in" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateAppointmentStatus(
                              appointment.id,
                              "checked-in"
                            )
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          وضع علامة تم تسجيل الوصول
                        </DropdownMenuItem>
                      )}
                      {appointment.status !== "missed" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateAppointmentStatus(appointment.id, "missed")
                          }
                          className="text-red-600"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          وضع علامة فات
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        الاتصال بالمريض
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <CalendarDays className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  لا توجد مواعيد
                </h3>
                <p className="text-slate-500">
                  {searchTerm || filterStatus !== "all"
                    ? "جرّب تعديل البحث أو عوامل التصفية"
                    : "لا توجد مواعيد مجدولة لليوم"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
