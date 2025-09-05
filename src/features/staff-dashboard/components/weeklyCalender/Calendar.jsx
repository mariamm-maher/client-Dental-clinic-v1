import { Routes, Route, Navigate } from "react-router-dom";
import { CalendarHeader } from ".";
import EnhancedCalendarGrid from "./EnhancedCalendarGrid";
import MonthView from "./MonthView";

// Route Components for different calendar views
function DayView() {
  return <EnhancedCalendarGrid />;
}

function WeekView() {
  return <EnhancedCalendarGrid />;
}

function MonthlyView() {
  return <MonthView />;
}

export default function Calendar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader />

        {/* Nested Routes for Calendar Views */}
        <Routes>
          <Route index element={<Navigate to="week" replace />} />
          <Route path="day" element={<DayView />} />
          <Route path="week" element={<WeekView />} />
          <Route path="month" element={<MonthlyView />} />
        </Routes>
      </div>
    </div>
  );
}
