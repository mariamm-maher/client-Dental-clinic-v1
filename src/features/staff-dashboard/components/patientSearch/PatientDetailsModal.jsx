import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Phone,
  MapPin,
  History,
  Calendar,
  Stethoscope,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";

export default function PatientDetailsModal({
  isOpen,
  onClose,
  patient,
  getStatusBadge,
  calculateAge,
}) {
  if (!patient) return null;

  const statusConfig = getStatusBadge(patient.status);

  // Mock data for demonstration - replace with actual API calls
  const visitHistory = [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "د. أحمد محمد",
      service: "فحص دوري",
      status: "completed",
      notes: "فحص شامل - جميع المؤشرات طبيعية",
    },
    {
      id: 2,
      date: "2024-01-08",
      doctor: "د. فاطمة علي",
      service: "علاج الأسنان",
      status: "completed",
      notes: "تنظيف الأسنان وعلاج التسوس",
    },
    {
      id: 3,
      date: "2024-01-02",
      doctor: "د. محمد حسن",
      service: "استشارة طبية",
      status: "completed",
      notes: "متابعة حالة الضغط",
    },
  ];

  const appointmentHistory = [
    {
      id: 1,
      date: "2024-01-20",
      time: "10:00",
      doctor: "د. أحمد محمد",
      service: "فحص دوري",
      status: "scheduled",
      notes: "موعد مجدول مسبقاً",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "14:30",
      doctor: "د. فاطمة علي",
      service: "علاج الأسنان",
      status: "completed",
      notes: "تم إكمال العلاج بنجاح",
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "09:15",
      doctor: "د. محمد حسن",
      service: "استشارة طبية",
      status: "cancelled",
      notes: "تم إلغاء الموعد من قبل المريض",
    },
  ];

  const medicalInfo = {
    bloodType: "O+",
    allergies: ["البنسلين", "الأسبرين"],
    chronicConditions: ["ضغط الدم المرتفع"],
    medications: ["أدوية الضغط", "فيتامين د"],
    lastCheckup: "2024-01-15",
    nextCheckup: "2024-04-15",
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "scheduled":
        return "مجدول";
      case "cancelled":
        return "ملغي";
      default:
        return "غير محدد";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2 text-2xl text-gray-900">
            <User className="w-6 h-6 text-emerald-600" />
            تفاصيل المريض الكاملة
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Header */}
          <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {patient.name}
                  </h2>
                  <div className="flex items-center gap-4 mb-3">
                    <p className="text-gray-600">
                      العمر: {calculateAge(patient.dateOfBirth)} سنة
                    </p>
                    <Badge
                      variant="secondary"
                      className={statusConfig.className}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {patient.address || "غير متوفر"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="visits" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              <TabsTrigger value="visits" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                تاريخ الزيارات
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                المواعيد
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                المعلومات الطبية
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                الملاحظات
              </TabsTrigger>
            </TabsList>

            {/* Visit History Tab */}
            <TabsContent value="visits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-emerald-600" />
                    تاريخ الزيارات السابقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visitHistory.map((visit) => (
                      <div
                        key={visit.id}
                        className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(visit.status)}
                            <span className="font-semibold text-gray-900">
                              {visit.service}
                            </span>
                          </div>
                          <Badge className={getStatusColor(visit.status)}>
                            {getStatusText(visit.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">التاريخ:</span>{" "}
                            {visit.date}
                          </div>
                          <div>
                            <span className="font-medium">الطبيب:</span>{" "}
                            {visit.doctor}
                          </div>
                        </div>
                        {visit.notes && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              {visit.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    تاريخ المواعيد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointmentHistory.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(appointment.status)}
                            <span className="font-semibold text-gray-900">
                              {appointment.service}
                            </span>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">التاريخ:</span>{" "}
                            {appointment.date}
                          </div>
                          <div>
                            <span className="font-medium">الوقت:</span>{" "}
                            {appointment.time}
                          </div>
                          <div>
                            <span className="font-medium">الطبيب:</span>{" "}
                            {appointment.doctor}
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                              {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medical Information Tab */}
            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-violet-600" />
                    المعلومات الطبية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          فصيلة الدم
                        </h4>
                        <Badge className="bg-red-100 text-red-800">
                          {medicalInfo.bloodType}
                        </Badge>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          الحساسية
                        </h4>
                        <div className="space-y-2">
                          {medicalInfo.allergies.map((allergy, index) => (
                            <Badge
                              key={index}
                              className="bg-orange-100 text-orange-800"
                            >
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          الأمراض المزمنة
                        </h4>
                        <div className="space-y-2">
                          {medicalInfo.chronicConditions.map(
                            (condition, index) => (
                              <Badge
                                key={index}
                                className="bg-purple-100 text-purple-800"
                              >
                                {condition}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          الأدوية الحالية
                        </h4>
                        <div className="space-y-2">
                          {medicalInfo.medications.map((medication, index) => (
                            <Badge
                              key={index}
                              className="bg-blue-100 text-blue-800"
                            >
                              {medication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">
                        آخر فحص
                      </h4>
                      <p className="text-green-800">
                        {medicalInfo.lastCheckup}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        الفحص القادم
                      </h4>
                      <p className="text-blue-800">{medicalInfo.nextCheckup}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    الملاحظات والتفاصيل الإضافية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.notes && patient.notes.trim() !== "" ? (
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">
                          ملاحظات عامة
                        </h4>
                        <p className="text-amber-800">{patient.notes}</p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>لا توجد ملاحظات مسجلة</p>
                      </div>
                    )}

                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        الخدمات السابقة
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {patient.services && patient.services.length > 0 ? (
                          patient.services.map((service, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-emerald-100 text-emerald-700 border-emerald-200"
                            >
                              {service}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            لا توجد خدمات مسجلة
                          </p>
                        )}
                      </div>
                    </div>

                    {patient.upcomingAppointments &&
                      patient.upcomingAppointments.length > 0 && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-3">
                            المواعيد القادمة
                          </h4>
                          <div className="space-y-3">
                            {patient.upcomingAppointments.map(
                              (appointment, i) => (
                                <div
                                  key={i}
                                  className="p-3 bg-white rounded-lg border border-blue-100"
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-blue-900">
                                      {appointment.service}
                                    </span>
                                    <span className="text-sm text-blue-700">
                                      {appointment.date}
                                    </span>
                                  </div>
                                  <div className="text-sm text-blue-600">
                                    {appointment.time} - {appointment.doctor}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
