import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Settings, RefreshCw } from "lucide-react";

const InitializationNotice = ({
  needsInitialization,
  hasWeeklySchedule,
  onInitialize,
  isLoading,
}) => {
  if (!needsInitialization || hasWeeklySchedule) return null;

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-yellow-800 mb-2">
              إعداد جدول العمل الأسبوعي
            </h3>
            <p className="text-sm text-yellow-700 mb-4">
              لم يتم العثور على جدول عمل مُحدد. يرجى إنشاء جدول عمل أولي
              للعيادة.
            </p>
            <Button
              onClick={onInitialize}
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3 h-3 ml-1 animate-spin" />
                  جاري الإعداد...
                </>
              ) : (
                <>
                  <Settings className="w-3 h-3 ml-1" />
                  إنشاء جدول عمل
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InitializationNotice;
