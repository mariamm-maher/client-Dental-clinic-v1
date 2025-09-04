import React from "react";
import DayScheduleCard from "./DayScheduleCard";

const WeeklyScheduleGrid = ({
  daysOfWeek,
  schedule,
  timeOptions,
  onToggleDay,
  onAddShift,
  onUpdateShiftTime,
  onRemoveShift,
}) => {
  return (
    <div className="grid gap-4">
      {daysOfWeek.map((day) => {
        const daySchedule = schedule[day.key];

        return (
          <DayScheduleCard
            key={day.key}
            day={day}
            daySchedule={daySchedule}
            timeOptions={timeOptions}
            onToggleDay={onToggleDay}
            onAddShift={onAddShift}
            onUpdateShiftTime={onUpdateShiftTime}
            onRemoveShift={onRemoveShift}
          />
        );
      })}
    </div>
  );
};

export default WeeklyScheduleGrid;
