import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  UserPlus,
  UserCheck,
  Phone,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import usePatientStore from "@/stores/patientStore";
import { useEffect } from "react";

export default function RecentPatients() {
  const {
    recentPatients,
    isLoadingRecent,
    recentPatientsError,
    fetchRecentPatients,
  } = usePatientStore();

  // Fetch recent patients on component mount
  useEffect(() => {
    fetchRecentPatients();
  }, [fetchRecentPatients]);

  console.log(recentPatients, "recent patients data");

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl text-gray-900">
            <Clock className="w-6 h-6 text-violet-600" />
            التسجيلات الأخيرة
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRecentPatients}
            disabled={isLoadingRecent}
            className="h-8 w-8 p-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoadingRecent ? "animate-spin" : ""}`}
            />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Loading State */}
        {isLoadingRecent && (
          <div className="text-center py-8 text-gray-500">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 opacity-50 animate-spin" />
            </div>
            <p className="font-medium">جاري تحميل البيانات...</p>
          </div>
        )}

        {/* Error State */}
        {recentPatientsError && !isLoadingRecent && (
          <div className="text-center py-8 text-red-500">
            <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <p className="font-medium">حدث خطأ في تحميل البيانات</p>
            <p className="text-sm text-red-400">{recentPatientsError}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecentPatients}
              className="mt-2"
            >
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* Success State - Show Patients */}
        {!isLoadingRecent && !recentPatientsError && (
          <>
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
            ))}{" "}
            {recentPatients.length === 0 &&
              !isLoadingRecent &&
              !recentPatientsError && (
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
