import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import ShiftEditor from "./ShiftEditor";
import useSettingsStore from "@/stores/settingsStore";

const DayScheduleCard = ({ day, timeOptions }) => {
  const { getDayShifts, toggleDay, addShift } = useSettingsStore();

  // Get shifts for this specific day
  const dayShifts = getDayShifts(day.key);
  const isEnabled = Array.isArray(dayShifts) && dayShifts.length > 0;

  return (
    <Card
      className={`transition-all duration-200 min-w-[250px] max-w-[350px] mx-auto ${
        isEnabled
          ? "border-blue-200 shadow-sm bg-white"
          : "border-slate-200 bg-slate-50/50 opacity-70"
      }`}
    >
      <CardHeader className="pb-2 px-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                isEnabled
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {day.shortLabel}
            </div>
            <div>
              <h3 className="font-medium text-slate-900 text-sm mb-1">
                {day.label}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isEnabled ? `${dayShifts.length} فترة` : "عطلة"}
              </p>
            </div>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={() => toggleDay(day.key)}
            className="scale-90 ml-2"
          />
        </div>
      </CardHeader>

      {isEnabled && (
        <CardContent className="pt-0 px-3 pb-3 flex flex-col gap-2">
          {/* Shifts */}
          {dayShifts.map((shift, shiftIndex) => (
            <ShiftEditor
              key={shiftIndex}
              shift={shift}
              shiftIndex={shiftIndex}
              dayKey={day.key}
              timeOptions={timeOptions}
              canRemove={dayShifts.length > 1}
            />
          ))}

          {/* Add Shift Button */}
          <Button
            variant="outline"
            size="xs"
            onClick={() => addShift(day.key)}
            className="w-full h-8 border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 text-xs"
          >
            <Plus className="w-3 h-3 ml-1" />
            إضافة فترة
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default DayScheduleCard;
