import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Settings, RefreshCw } from "lucide-react";
import useSettingsStore from "@/stores/settingsStore";
import { toast } from "sonner";
const EmptySchedule = () => {
  const { isLoading, initializeWeeklySchedule } = useSettingsStore();
  // Handle initialization
  const handleInitializeSchedule = async () => {
    try {
      const result = await initializeWeeklySchedule();
      console.log(result);
      if (result.success) {
        toast.success(result.message || "تم إنشاء جدول العمل بنجاح");
      } else {
        toast.error(result.message || "فشل في إنشاء جدول العمل");
      }
    } catch {
      toast.error("حدث خطأ أثناء إنشاء جدول العمل");
    }
  };

  return (
    <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30">
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          لم يتم تعيين جدول عمل
        </h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          يرجى تكوين أوقات عمل العيادة لتتمكن من إدارة المواعيد بشكل صحيح
        </p>
        <Button
          onClick={handleInitializeSchedule}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              جاري الإعداد...
            </>
          ) : (
            <>
              <Settings className="w-4 h-4" />
              إنشاء جدول عمل
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptySchedule;
