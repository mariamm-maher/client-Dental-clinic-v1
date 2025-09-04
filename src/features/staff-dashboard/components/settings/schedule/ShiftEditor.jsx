import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, AlertCircle, CheckCircle } from "lucide-react";

const ShiftEditor = ({
  shift,
  shiftIndex,
  dayKey,
  timeOptions,
  canRemove,
  onUpdateTime,
  onRemove,
}) => {
  const isValid = shift.startTime < shift.endTime;

  // Calculate work duration
  const calculateDuration = () => {
    if (!isValid) return 0;

    const startMinutes =
      parseInt(shift.startTime.split(":")[0]) * 60 +
      parseInt(shift.startTime.split(":")[1]);
    const endMinutes =
      parseInt(shift.endTime.split(":")[0]) * 60 +
      parseInt(shift.endTime.split(":")[1]);

    return (endMinutes - startMinutes) / 60;
  };

  return (
    <div
      className={`
        p-4 rounded-lg border transition-colors
        ${isValid ? "border-slate-200 bg-white" : "border-red-200 bg-red-50"}
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
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(dayKey, shiftIndex)}
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
              onUpdateTime(dayKey, shiftIndex, "startTime", value)
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time.value} value={time.value}>
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
              onUpdateTime(dayKey, shiftIndex, "endTime", value)
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time.value} value={time.value}>
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
            <span>مدة العمل: {calculateDuration()} ساعة</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftEditor;
