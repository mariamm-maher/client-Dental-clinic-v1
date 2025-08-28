import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  Phone,
  Stethoscope,
  AlertCircle,
  Users,
} from "lucide-react";
import { useAppointmentStore } from "@/stores";

export default function AppointmentsList() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const searchTerm = useAppointmentStore((state) => state.searchTerm);
  const filterStatus = useAppointmentStore((state) => state.filterStatus);
  const updateAppointmentStatus = useAppointmentStore(
    (state) => state.updateAppointmentStatus
  );
  const callPatient = useAppointmentStore((state) => state.callPatient);
  const resetFilters = useAppointmentStore((state) => state.resetFilters);

  // Compute filtered appointments in the component
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || appointment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "checked-in":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "missed":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "checked-in":
        return "تم تسجيل الوصول";
      case "missed":
        return "فاتت";
      case "completed":
        return "مكتمل";
      default:
        return "في الانتظار";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "checked-in":
        return CheckCircle;
      case "missed":
        return XCircle;
      case "completed":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getStatusBadge = (status) => {
    const IconComponent = getStatusIcon(status);

    return (
      <Badge
        className={`${getStatusColor(
          status
        )} border flex items-center gap-1.5 font-medium`}
      >
        <IconComponent className="w-3 h-3" />
        {getStatusText(status)}
      </Badge>
    );
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            المواعيد ({filteredAppointments.length})
          </div>
          {filteredAppointments.length > 0 && (
            <Badge variant="outline" className="text-sm">
              {
                filteredAppointments.filter((a) => a.status === "pending")
                  .length
              }{" "}
              في الانتظار
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredAppointments.map((appointment, index) => (
          <div key={appointment.id}>
            <Card className="border border-slate-200 hover:shadow-md transition-all duration-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Patient Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sky-700 font-semibold text-sm">
                        {appointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>

                    {/* Appointment Details */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {appointment.patientName}
                        </h3>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sky-500" />
                          <span className="font-medium">
                            {appointment.appointmentTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-500" />
                          <span>{appointment.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-violet-500" />
                          <span>{appointment.doctor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                          <span className="truncate">
                            {appointment.treatment}
                          </span>
                        </div>
                      </div>

                      {appointment.checkedInAt && (
                        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                          تم تسجيل الوصول في {appointment.checkedInAt}
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                          ملاحظات: {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    {appointment.status === "pending" && (
                      <Button
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "checked-in")
                        }
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 ml-1" />
                        تسجيل الوصول
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {appointment.status !== "checked-in" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "checked-in"
                              )
                            }
                            className="text-emerald-600"
                          >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            تسجيل الوصول
                          </DropdownMenuItem>
                        )}
                        {appointment.status !== "missed" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateAppointmentStatus(appointment.id, "missed")
                            }
                            className="text-red-600"
                          >
                            <XCircle className="w-4 h-4 ml-2" />
                            وضع علامة فات
                          </DropdownMenuItem>
                        )}
                        {appointment.status === "checked-in" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "completed"
                              )
                            }
                            className="text-blue-600"
                          >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            إنهاء الموعد
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => callPatient(appointment)}
                          className="text-sky-600"
                        >
                          <Phone className="w-4 h-4 ml-2" />
                          الاتصال بالمريض
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
            {index < filteredAppointments.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              لا توجد مواعيد
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "جرّب تعديل البحث أو عوامل التصفية للعثور على المواعيد"
                : "لا توجد مواعيد مجدولة لهذا اليوم"}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <div className="mt-4 space-x-2">
                <Button variant="outline" onClick={resetFilters}>
                  مسح التصفية
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
