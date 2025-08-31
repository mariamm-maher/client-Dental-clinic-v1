import { CalendarHeader, CalendarStats, CalendarLegend } from ".";
import EnhancedCalendarGrid from "./EnhancedCalendarGrid";
import MonthView from "./MonthView";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";

export default function WeeklyCalendar() {
  const { viewType } = useWeeklyCalendarStore();

  const renderCalendarView = () => {
    switch (viewType) {
      case "day":
        return <EnhancedCalendarGrid />;
      case "week":
        return <EnhancedCalendarGrid />;
      case "month":
        return <MonthView />;
      default:
        return <EnhancedCalendarGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader />

        {/* Statistics Cards */}
        <CalendarStats />

        {/* Calendar View */}
        {renderCalendarView()}

        {/* Legend */}
        <CalendarLegend />
      </div>
    </div>
  );
}
