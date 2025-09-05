import React from "react";
import DayScheduleCard from "./DayScheduleCard";

const WeeklyScheduleGrid = ({ daysOfWeek }) => {
  // Generate time options for the shift selectors with Arabic format
  const timeOptions = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      // Create Arabic format
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? "ص" : "م";
      const arabicLabel = `${hour12.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;

      timeOptions.push({
        value: timeString,
        label: timeString,
        labelArabic: arabicLabel,
      });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {daysOfWeek.map((day) => (
        <DayScheduleCard key={day.key} day={day} timeOptions={timeOptions} />
      ))}
    </div>
  );
};

export default WeeklyScheduleGrid;
