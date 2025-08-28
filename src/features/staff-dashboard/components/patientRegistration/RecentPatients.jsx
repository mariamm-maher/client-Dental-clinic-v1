import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, UserPlus, UserCheck, Phone } from "lucide-react";
import usePatientStore from "@/stores/patientStore";

export default function RecentPatients() {
  const { recentPatients } = usePatientStore();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <Clock className="w-6 h-6 text-violet-600" />
          التسجيلات الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPatients.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {patient.name}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {patient.phone}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 border-emerald-200"
            >
              {patient.registeredAt}
            </Badge>
          </div>
        ))}
        {recentPatients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <UserPlus className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium">لا توجد تسجيلات حديثة</p>
            <p className="text-sm text-gray-400">
              ستظهر هنا آخر المرضى المسجلين
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
