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

const ScheduleHeader = ({
  hasSchedule,
  schedule,
  scheduleHasChanges,
  isLoading,
  onReset,
  onSave,
}) => {
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
              </h2>
              <p className="text-sm text-slate-600">
                {hasSchedule
                  ? `تم تكوين ${
                      Object.values(schedule).filter((day) => day.enabled)
                        .length
                    } أيام عمل`
                  : "لم يتم تكوين أي يوم عمل"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="gap-1"
              disabled={isLoading}
            >
              <RotateCcw className="w-3 h-3" />
              إعادة تعيين
            </Button>
            <Button
              size="sm"
              onClick={onSave}
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
