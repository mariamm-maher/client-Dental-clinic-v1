import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, History, ExternalLink } from "lucide-react";
import usePatientSearchStore from "@/stores/patientSearchStore";
import PatientDetailsModal from "./PatientDetailsModal";

export default function PatientDetails() {
  const { selectedPatient, getStatusBadge, calculateAge } =
    usePatientSearchStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedPatient) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
            <User className="w-6 h-6 text-emerald-600" />
            تفاصيل المريض
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg">حدد مريضًا لعرض التفاصيل</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = getStatusBadge(selectedPatient.status);

  const patientDetailsCard = (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <User className="w-6 h-6 text-emerald-600" />
          تفاصيل المريض
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              {selectedPatient.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <Button
              variant="ghost"
              className="text-xl font-bold text-gray-900 mb-1 p-0 h-auto hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              {selectedPatient.name}
              <ExternalLink className="w-4 h-4 opacity-60" />
            </Button>
            <p className="text-gray-600 mb-2">
              العمر: {calculateAge(selectedPatient.dateOfBirth)} سنة
            </p>
            <Badge variant="secondary" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                معلومات الاتصال
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                  <span className="text-gray-600">الهاتف:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedPatient.phone}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                  <span className="text-gray-600">البريد الإلكتروني:</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {selectedPatient.email}
                  </span>
                </div>{" "}
                {selectedPatient.address &&
                  selectedPatient.address !== "غير متوفر" && (
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-violet-600 mt-1" />
                        <div>
                          <span className="text-gray-600 block">العنوان:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedPatient.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                <History className="w-5 h-5 text-violet-600" />
                تاريخ الزيارات
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                  <span className="text-gray-600">آخر زيارة:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedPatient.lastVisit}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                  <span className="text-gray-600">إجمالي الزيارات:</span>
                  <Badge
                    variant="secondary"
                    className="bg-sky-100 text-sky-700"
                  >
                    {selectedPatient.totalVisits}
                  </Badge>
                </div>
              </div>
            </div>{" "}
            <div>
              {" "}
              <h4 className="font-semibold text-gray-900 mb-3">
                الخدمات السابقة
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPatient.services &&
                selectedPatient.services.length > 0 ? (
                  selectedPatient.services.map((service, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 border-emerald-200"
                    >
                      {service}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">لا توجد خدمات مسجلة</p>
                )}
              </div>
            </div>
            {selectedPatient.upcomingAppointments &&
              selectedPatient.upcomingAppointments.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    المواعيد القادمة
                  </h4>
                  <div className="space-y-3">
                    {selectedPatient.upcomingAppointments.map(
                      (appointment, i) => (
                        <div
                          key={i}
                          className="p-3 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-lg"
                        >
                          {" "}
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
            {selectedPatient.notes && selectedPatient.notes.trim() !== "" && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">ملاحظات</h4>
                <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    {selectedPatient.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {patientDetailsCard}
      <PatientDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
        getStatusBadge={getStatusBadge}
        calculateAge={calculateAge}
      />
    </>
  );
}
