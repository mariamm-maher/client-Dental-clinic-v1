import { CalendarHeader, CalendarLegend } from ".";
import EnhancedCalendarGrid from "./EnhancedCalendarGrid";
import MonthView from "./MonthView";
import useCalendarStore from "@/stores/weeklyCalendarStore";

export default function WeeklyCalendar() {
  const { viewType } = useCalendarStore();

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

        {renderCalendarView()}

        {/* Legend */}
        <CalendarLegend />
      </div>
    </div>
  );
}
