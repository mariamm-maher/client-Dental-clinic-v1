import { CalendarHeader, CalendarStats, CalendarGrid, CalendarLegend } from ".";

export default function WeeklyCalendar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader />

        {/* Statistics Cards */}
        <CalendarStats />

        {/* Weekly Calendar Grid */}
        <CalendarGrid />

        {/* Legend */}
        <CalendarLegend />
      </div>
    </div>
  );
}
