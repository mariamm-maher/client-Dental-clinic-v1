import React, { useEffect } from "react";
import useSettingsStore from "@/stores/settingsStore";
import ScheduleHeader from "./schedule/ScheduleHeader";
import WeeklyScheduleGrid from "./schedule/WeeklyScheduleGrid";
import EmptySchedule from "./schedule/EmptySchedule";

const ScheduleSettings = () => {
  const { hasWeeklySchedule, loadSchedule, clearError } = useSettingsStore();

  // Days of the week configuration
  const daysOfWeek = [
    { key: "sunday", label: "الأحد", shortLabel: "أح" },
    { key: "monday", label: "الإثنين", shortLabel: "إث" },
    { key: "tuesday", label: "الثلاثاء", shortLabel: "ثل" },
    { key: "wednesday", label: "الأربعاء", shortLabel: "أر" },
    { key: "thursday", label: "الخميس", shortLabel: "خم" },
    { key: "friday", label: "الجمعة", shortLabel: "جم" },
    { key: "saturday", label: "السبت", shortLabel: "سب" },
  ];

  // Load settings on component mount
  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);
  return (
    <div className="space-y-6">
      <ScheduleHeader />

      {!hasWeeklySchedule ? (
        <EmptySchedule />
      ) : (
        <WeeklyScheduleGrid daysOfWeek={daysOfWeek} />
      )}
    </div>
  );
};

export default ScheduleSettings;
