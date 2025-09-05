import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import useSettingsStore from "@/stores/settingsStore";

const ShiftEditor = ({ shift, shiftIndex, dayKey, timeOptions, canRemove }) => {
  const { updateShift, removeShift } = useSettingsStore();

  const handleTimeChange = (field, value) => {
    const [hour, minute] = value.split(":").map(Number);
    const updatedShift = {
      ...shift,
      [field === "start" ? "startHour" : "endHour"]: hour,
      [field === "start" ? "startMinute" : "endMinute"]: minute,
    };
    updateShift(dayKey, shiftIndex, updatedShift);
  };

  const handleRemove = () => {
    removeShift(dayKey, shiftIndex);
  };
  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const startTime = formatTime(shift.startHour, shift.startMinute);
  const endTime = formatTime(shift.endHour, shift.endMinute);

  // Calculate working hours
  const getWorkingHours = () => {
    const start = shift.startHour * 60 + shift.startMinute;
    const end = shift.endHour * 60 + shift.endMinute;
    let diff = end - start;
    if (diff < 0) diff += 24 * 60; // handle overnight shifts
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes };
  };
  const { hours, minutes } = getWorkingHours();

  // Validation: end time must be after start time
  const isInvalid =
    shift.endHour < shift.startHour ||
    (shift.endHour === shift.startHour && shift.endMinute <= shift.startMinute);

  return (
    <div className="flex flex-col gap-1 p-2 bg-slate-50 rounded-md">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-700">
          فترة رقم {shiftIndex + 1}
        </span>
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] text-slate-500 mb-0.5">من</span>
          <Select
            value={startTime}
            onValueChange={(value) => handleTimeChange("start", value)}
          >
            <SelectTrigger className="w-20 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem
                  key={time.value}
                  value={time.value}
                  className="text-xs"
                >
                  {time.labelArabic || time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-slate-400 mx-1 mt-5">-</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] text-slate-500 mb-0.5">إلى</span>
          <Select
            value={endTime}
            onValueChange={(value) => handleTimeChange("end", value)}
          >
            <SelectTrigger className="w-20 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem
                  key={time.value}
                  value={time.value}
                  className="text-xs"
                >
                  {time.labelArabic || time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Working hours and validation */}
      <div className="mt-1 text-xs text-right">
        {isInvalid ? (
          <span className="text-red-500 font-semibold">
            وقت النهاية يجب أن يكون بعد وقت البداية
          </span>
        ) : (
          <span className="text-slate-600">
            عدد ساعات العمل: {hours} ساعة{" "}
            {minutes > 0 ? `و ${minutes} دقيقة` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShiftEditor;
