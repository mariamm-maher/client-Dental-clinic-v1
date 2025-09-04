import React, { useEffect } from "react";
import { toast } from "sonner";
import useSettingsStore from "@/stores/settingsStore";
import {
  ErrorDisplay,
  InitializationNotice,
  ScheduleHeader,
  EmptySchedule,
  WeeklyScheduleGrid,
  generateTimeOptions,
  daysOfWeek,
} from "./schedule";

const ScheduleSettings = () => {
  // Use settings store
  const {
    schedule,
    scheduleHasChanges,
    isLoading,
    error,
    needsInitialization,
    hasWeeklySchedule,
    toggleDay,
    addShift,
    removeShift,
    updateShiftTime,
    resetSchedule,
    saveSchedule,
    initializeWeeklySchedule,
    loadSettings,
    clearError,
  } = useSettingsStore();

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Check if any schedule is configured
  const hasSchedule = Object.values(schedule).some(
    (day) => day.enabled && day.shifts.length > 0
  );

  const timeOptions = generateTimeOptions();

  // Handle save with store action
  const handleSaveSchedule = async () => {
    try {
      const result = await saveSchedule();
      if (result.success) {
        toast.success(result.message || "تم حفظ جدول العمل بنجاح");
      } else {
        toast.error(result.message || "فشل في حفظ جدول العمل");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ جدول العمل");
    }
  };

  // Handle reset schedule with toast
  const handleResetSchedule = () => {
    resetSchedule();
    toast.info("تم إعادة تعيين الجدول");
  };

  // Handle initialization
  const handleInitializeSchedule = async () => {
    try {
      const result = await initializeWeeklySchedule();
      if (result.success) {
        toast.success(result.message || "تم إنشاء جدول العمل بنجاح");
      } else {
        toast.error(result.message || "فشل في إنشاء جدول العمل");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء جدول العمل");
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="ml-auto text-red-600 hover:text-red-700"
              >
                إغلاق
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Initialization Notice */}
      {needsInitialization && !hasWeeklySchedule && (
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
                </p>{" "}
                <div className="flex gap-2">
                  <Button
                    onClick={handleInitializeSchedule}
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
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
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
            </div>{" "}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetSchedule}
                className="gap-1"
                disabled={isLoading}
              >
                <RotateCcw className="w-3 h-3" />
                إعادة تعيين
              </Button>
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

      {/* No Schedule Message */}
      {!hasSchedule && (
        <Card className="border-dashed border-2 border-slate-200 bg-slate-50/30">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              لم يتم تعيين جدول عمل
            </h3>{" "}
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
      )}

      {/* Weekly Schedule Cards */}
      {hasSchedule && (
        <div className="grid gap-4">
          {daysOfWeek.map((day) => {
            const daySchedule = schedule[day.key];

            return (
              <Card
                key={day.key}
                className={`transition-all duration-200 ${
                  daySchedule.enabled
                    ? "border-blue-200 shadow-sm"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                          ${
                            daySchedule.enabled
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {day.shortLabel}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">
                          {day.label}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {daySchedule.enabled
                            ? `${daySchedule.shifts.length} فترة عمل`
                            : "يوم عطلة"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={daySchedule.enabled}
                      onCheckedChange={() => toggleDay(day.key)}
                    />
                  </div>
                </CardHeader>

                {daySchedule.enabled && (
                  <CardContent className="pt-0 space-y-4">
                    {/* Shifts */}
                    {daySchedule.shifts.map((shift, shiftIndex) => {
                      const isValid = validateShift(shift);

                      return (
                        <div
                          key={shiftIndex}
                          className={`
                            p-4 rounded-lg border transition-colors
                            ${
                              isValid
                                ? "border-slate-200 bg-white"
                                : "border-red-200 bg-red-50"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                فترة {shiftIndex + 1}
                              </Badge>
                              {!isValid && (
                                <div className="flex items-center gap-1 text-red-600">
                                  <AlertCircle className="w-3 h-3" />
                                  <span className="text-xs">وقت غير صحيح</span>
                                </div>
                              )}
                            </div>
                            {daySchedule.shifts.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeShift(day.key, shiftIndex)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {/* Start Time */}
                            <div>
                              <label className="text-xs font-medium text-slate-600 mb-1 block">
                                من
                              </label>
                              <Select
                                value={shift.startTime}
                                onValueChange={(value) =>
                                  updateShiftTime(
                                    day.key,
                                    shiftIndex,
                                    "startTime",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem
                                      key={time.value}
                                      value={time.value}
                                    >
                                      {time.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* End Time */}
                            <div>
                              <label className="text-xs font-medium text-slate-600 mb-1 block">
                                إلى
                              </label>
                              <Select
                                value={shift.endTime}
                                onValueChange={(value) =>
                                  updateShiftTime(
                                    day.key,
                                    shiftIndex,
                                    "endTime",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem
                                      key={time.value}
                                      value={time.value}
                                    >
                                      {time.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {isValid && (
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span>
                                  مدة العمل:{" "}
                                  {Math.abs(
                                    parseInt(shift.endTime.split(":")[0]) * 60 +
                                      parseInt(shift.endTime.split(":")[1]) -
                                      (parseInt(shift.startTime.split(":")[0]) *
                                        60 +
                                        parseInt(shift.startTime.split(":")[1]))
                                  ) / 60}{" "}
                                  ساعة
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Add Shift Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addShift(day.key)}
                      className="w-full h-9 border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="w-4 h-4 ml-1" />
                      إضافة فترة عمل
                    </Button>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleSettings;
