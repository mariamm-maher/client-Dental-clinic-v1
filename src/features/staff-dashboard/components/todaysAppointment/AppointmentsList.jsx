import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  Plus,
  Search,
  RefreshCw,
} from "lucide-react";
import { useAppointmentStore } from "@/stores";
import { useEffect } from "react";

export default function AppointmentsList() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const isLoadingAppointments = useAppointmentStore(
    (state) => state.isLoadingAppointments
  );
  const appointmentsError = useAppointmentStore(
    (state) => state.appointmentsError
  );
  const searchTerm = useAppointmentStore((state) => state.searchTerm);
  const filterStatus = useAppointmentStore((state) => state.filterStatus);
  const updateAppointmentStatus = useAppointmentStore(
    (state) => state.updateAppointmentStatus
  );
  const callPatient = useAppointmentStore((state) => state.callPatient);
  const resetFilters = useAppointmentStore((state) => state.resetFilters);
  const fetchTodaysAppointments = useAppointmentStore(
    (state) => state.fetchTodaysAppointments
  );

  // Fetch today's appointments on component mount
  useEffect(() => {
    fetchTodaysAppointments();
  }, [fetchTodaysAppointments]);

  // Ensure appointments is always an array
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  // Compute filtered appointments in the component
  const filteredAppointments = safeAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || appointment.status === filterStatus;

    return matchesSearch && matchesFilter;
  }); // Enhanced status color mapping with semantic variables
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-50",
          text: "text-amber-800",
          border: "border-amber-200",
          accent: "border-l-amber-400",
          dot: "bg-amber-400",
        };
      case "confirmed":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-800",
          border: "border-emerald-200",
          accent: "border-l-emerald-400",
          dot: "bg-emerald-400",
        };
      case "canceled":
        return {
          bg: "bg-red-50",
          text: "text-red-800",
          border: "border-red-200",
          accent: "border-l-red-400",
          dot: "bg-red-400",
        };
      case "done":
        return {
          bg: "bg-blue-50",
          text: "text-blue-800",
          border: "border-blue-200",
          accent: "border-l-blue-400",
          dot: "bg-blue-400",
        };
      case "missed":
        return {
          bg: "bg-gray-50",
          text: "text-gray-800",
          border: "border-gray-200",
          accent: "border-l-gray-400",
          dot: "bg-gray-400",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-800",
          border: "border-gray-200",
          accent: "border-l-gray-400",
          dot: "bg-gray-400",
        };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "confirmed":
        return "مؤكد";
      case "canceled":
        return "ملغى";
      case "done":
        return "تم";
      case "missed":
        return "فاتت";
      default:
        return "في الانتظار";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "confirmed":
        return CheckCircle;
      case "canceled":
        return XCircle;
      case "done":
        return CheckCircle;
      case "missed":
        return XCircle;
      default:
        return Clock;
    }
  };
  const getStatusBadge = (status) => {
    const IconComponent = getStatusIcon(status);
    const colors = getStatusColor(status);

    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <Badge
          className={`${colors.bg} ${colors.text} ${colors.border} border flex items-center gap-1.5 font-medium px-3 py-1 text-xs`}
        >
          <IconComponent className="w-3 h-3" />
          {getStatusText(status)}
        </Badge>
      </div>
    );
  };

  // Loading skeleton component
  const AppointmentSkeleton = () => (
    <Card className="border border-slate-100 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </CardContent>
    </Card>
  );
  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="space-y-4">
        {/* Enhanced Loading State */}
        {isLoadingAppointments && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <AppointmentSkeleton key={index} />
            ))}
          </div>
        )}
        {/* Enhanced Error State */}
        {appointmentsError && !isLoadingAppointments && (
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                خطأ في تحميل المواعيد
              </h3>
              <p className="text-red-600 mb-6 max-w-md mx-auto">
                {appointmentsError}
              </p>
              <Button
                onClick={fetchTodaysAppointments}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة المحاولة
              </Button>
            </CardContent>
          </Card>
        )}
        {/* Enhanced Appointments List */}{" "}
        {!isLoadingAppointments &&
          !appointmentsError &&
          filteredAppointments.map((appointment) => {
            const statusColors = getStatusColor(appointment.status);

            return (
              <Card
                key={appointment.id}
                className={`
                  border-l-4 ${statusColors.accent} 
                  border-slate-100 hover:border-slate-200 
                  hover:shadow-md transition-all duration-300 
                  bg-white hover:bg-slate-50/30 
                  group cursor-pointer
                `}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Main Content */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Enhanced Patient Avatar */}
                      <div className="relative">
                        <div
                          className={`
                          w-14 h-14 rounded-2xl flex items-center justify-center 
                          bg-gradient-to-br from-slate-100 to-slate-200 
                          group-hover:from-slate-200 group-hover:to-slate-300
                          transition-all duration-300 shadow-sm
                        `}
                        >
                          <span className="text-slate-700 font-bold text-sm">
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${statusColors.dot} border-2 border-white`}
                        />
                      </div>

                      {/* Enhanced Appointment Details */}
                      <div className="flex-1 min-w-0 space-y-4">
                        {/* Primary Information */}
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors">
                              {appointment.patientName}
                            </h3>
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>

                        {/* Secondary Information Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-slate-500 text-xs">
                                وقت الموعد
                              </p>
                              <p className="font-semibold text-slate-900">
                                {appointment.appointmentTime}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                              <Phone className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-slate-500 text-xs">
                                رقم الهاتف
                              </p>
                              <p className="font-semibold text-slate-900 direction-ltr">
                                {appointment.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                              <Stethoscope className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-slate-500 text-xs">
                                نوع الخدمة
                              </p>
                              <p className="font-semibold text-slate-900">
                                {appointment.service}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status-specific Information */}
                        {appointment.status === "confirmed" &&
                          appointment.checkedInAt && (
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <span className="text-sm font-medium text-emerald-800">
                                تم تأكيد الموعد في {appointment.checkedInAt}
                              </span>
                            </div>
                          )}

                        {appointment.status === "done" && (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                              تم إنهاء الموعد بنجاح
                            </span>
                          </div>
                        )}

                        {appointment.status === "canceled" && (
                          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-red-800">
                              تم إلغاء الموعد
                            </span>
                          </div>
                        )}

                        {appointment.status === "missed" && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <XCircle className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-800">
                              موعد فائت
                            </span>
                          </div>
                        )}

                        {appointment.notes && (
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-xs text-slate-500 mb-1">
                              ملاحظات:
                            </p>
                            <p className="text-sm text-slate-700">
                              {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Action Menu */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all duration-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 p-2">
                          {appointment.status !== "pending" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "pending"
                                )
                              }
                              className="text-amber-600 hover:bg-amber-50 rounded-lg p-3 cursor-pointer"
                            >
                              <Clock className="w-4 h-4 ml-2" />
                              <span className="font-medium">في الانتظار</span>
                            </DropdownMenuItem>
                          )}
                          {appointment.status !== "confirmed" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "confirmed"
                                )
                              }
                              className="text-emerald-600 hover:bg-emerald-50 rounded-lg p-3 cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4 ml-2" />
                              <span className="font-medium">تأكيد الموعد</span>
                            </DropdownMenuItem>
                          )}
                          {appointment.status !== "done" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "done")
                              }
                              className="text-blue-600 hover:bg-blue-50 rounded-lg p-3 cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4 ml-2" />
                              <span className="font-medium">إنهاء الموعد</span>
                            </DropdownMenuItem>
                          )}
                          {appointment.status !== "canceled" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "canceled"
                                )
                              }
                              className="text-red-600 hover:bg-red-50 rounded-lg p-3 cursor-pointer"
                            >
                              <XCircle className="w-4 h-4 ml-2" />
                              <span className="font-medium">إلغاء الموعد</span>
                            </DropdownMenuItem>
                          )}
                          {appointment.status !== "missed" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment.id,
                                  "missed"
                                )
                              }
                              className="text-gray-600 hover:bg-gray-50 rounded-lg p-3 cursor-pointer"
                            >
                              <XCircle className="w-4 h-4 ml-2" />
                              <span className="font-medium">وضع علامة فات</span>
                            </DropdownMenuItem>
                          )}
                          <Separator className="my-2" />
                          <DropdownMenuItem
                            onClick={() => callPatient(appointment)}
                            className="text-sky-600 hover:bg-sky-50 rounded-lg p-3 cursor-pointer"
                          >
                            <Phone className="w-4 h-4 ml-2" />
                            <span className="font-medium">الاتصال بالمريض</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        {/* Enhanced Empty State */}
        {!isLoadingAppointments &&
          !appointmentsError &&
          filteredAppointments.length === 0 && (
            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30">
              <CardContent className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CalendarDays className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-3">
                  {searchTerm || filterStatus !== "all"
                    ? "لا توجد نتائج"
                    : "لا توجد مواعيد"}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  {searchTerm || filterStatus !== "all"
                    ? "جرّب تعديل البحث أو عوامل التصفية للعثور على المواعيد المطلوبة"
                    : "لا توجد مواعيد مجدولة لهذا اليوم. يمكنك إضافة موعد جديد من خلال النقر على الزر أدناه"}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {searchTerm || filterStatus !== "all" ? (
                    <Button
                      onClick={resetFilters}
                      variant="outline"
                      className="gap-2"
                    >
                      <Search className="w-4 h-4" />
                      مسح التصفية
                    </Button>
                  ) : (
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4" />
                      إضافة موعد جديد
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
