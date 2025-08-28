import { Activity, BarChart3, CalendarCheck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useStatisticsStore from "@/stores/statisticsStore";

export default function QuickActions() {
  const { exportReport, reviewPendingAppointments, viewAlerts } =
    useStatisticsStore();

  const handleExportMonthlyReport = async () => {
    try {
      const filename = await exportReport("pdf");
      console.log(`Monthly report exported: ${filename}`);
    } catch (error) {
      console.error("Failed to export monthly report:", error);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <Activity className="w-6 h-6 text-amber-600" />
          إجراءات سريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto p-6 justify-start bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200 hover:from-sky-100 hover:to-blue-100 hover:border-sky-300 transition-all duration-200"
            onClick={handleExportMonthlyReport}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-2 bg-sky-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-sky-600" />
              </div>
              <div className="text-right flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  تصدير التقرير الشهري
                </p>
                <p className="text-sm text-gray-600">تحميل تقرير PDF مفصل</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 justify-start bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 transition-all duration-200"
            onClick={reviewPendingAppointments}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CalendarCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-right flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  مراجعة المواعيد
                </p>
                <p className="text-sm text-gray-600">عرض المواعيد المعلقة</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 justify-start bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100 hover:border-amber-300 transition-all duration-200"
            onClick={viewAlerts}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-right flex-1">
                <p className="font-semibold text-gray-900 mb-1">التنبيهات</p>
                <p className="text-sm text-gray-600">عرض التنبيهات المهمة</p>
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
