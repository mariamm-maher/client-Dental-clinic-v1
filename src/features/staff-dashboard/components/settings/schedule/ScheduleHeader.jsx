import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  RotateCcw,
  Save,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import useSettingsStore from "@/stores/settingsStore";
import { toast } from "sonner";

const ScheduleHeader = () => {
  const { weeklySchedule, scheduleHasChanges, isLoading, saveSchedule } =
    useSettingsStore();

  // Handle save with store action
  const handleSaveSchedule = async () => {
    try {
      const result = await saveSchedule();
      if (result.success) {
        toast.success(result.message || "تم حفظ جدول العمل بنجاح");
      } else {
        toast.error(result.message || "فشل في حفظ جدول العمل");
      }
    } catch {
      toast.error("حدث خطأ أثناء حفظ جدول العمل");
    }
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                جدول العمل الأسبوعي
              </h2>{" "}
              <p className="text-sm text-slate-600">
                {weeklySchedule && Array.isArray(weeklySchedule)
                  ? `تم تكوين ${
                      weeklySchedule.filter(
                        (dayObject) =>
                          Array.isArray(dayObject.shifts) &&
                          dayObject.shifts.length > 0
                      ).length
                    } أيام عمل`
                  : "لم يتم تكوين أي يوم عمل"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSaveSchedule}
              disabled={!scheduleHasChanges || isLoading}
              className="gap-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-3 h-3" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </div>
        </div>

        {scheduleHasChanges && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">
                لديك تغييرات غير محفوظة في جدول العمل
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleHeader;
