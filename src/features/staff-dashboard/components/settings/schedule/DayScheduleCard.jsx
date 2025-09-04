import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import ShiftEditor from "./ShiftEditor";

const DayScheduleCard = ({
  day,
  daySchedule,
  timeOptions,
  onToggleDay,
  onAddShift,
  onUpdateShiftTime,
  onRemoveShift,
}) => {
  return (
    <Card
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
              <h3 className="font-medium text-slate-900">{day.label}</h3>
              <p className="text-xs text-slate-500">
                {daySchedule.enabled
                  ? `${daySchedule.shifts.length} فترة عمل`
                  : "يوم عطلة"}
              </p>
            </div>
          </div>
          <Switch
            checked={daySchedule.enabled}
            onCheckedChange={() => onToggleDay(day.key)}
          />
        </div>
      </CardHeader>

      {daySchedule.enabled && (
        <CardContent className="pt-0 space-y-4">
          {/* Shifts */}
          {daySchedule.shifts.map((shift, shiftIndex) => (
            <ShiftEditor
              key={shiftIndex}
              shift={shift}
              shiftIndex={shiftIndex}
              dayKey={day.key}
              timeOptions={timeOptions}
              canRemove={daySchedule.shifts.length > 1}
              onUpdateTime={onUpdateShiftTime}
              onRemove={onRemoveShift}
            />
          ))}

          {/* Add Shift Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddShift(day.key)}
            className="w-full h-9 border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 ml-1" />
            إضافة فترة عمل
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default DayScheduleCard;
