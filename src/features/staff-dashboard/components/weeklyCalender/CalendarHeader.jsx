import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Activity,
  CalendarDays,
  Grid3X3,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import useCalendarStore from "@/stores/weeklyCalendarStore";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

export default function CalendarHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentWeek,
    currentDate,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
  } = useCalendarStore();

  const dateLocale = arSA;

  // Get current view type from URL
  const viewType = location.pathname.split("/").pop() || "week";

  // Get week range display
  const startDate = startOfWeek(currentWeek, { weekStartsOn: 6 });
  const endDate = endOfWeek(currentWeek, { weekStartsOn: 6 });
  const weekRange = `${format(startDate, "d MMM", {
    locale: dateLocale,
  })} - ${format(endDate, "d MMM yyyy", { locale: dateLocale })}`;

  // Get month range display
  const monthStart = startOfMonth(currentWeek);
  const monthEnd = endOfMonth(currentWeek);
  const monthRange = `${format(monthStart, "d MMM", {
    locale: dateLocale,
  })} - ${format(monthEnd, "d MMM yyyy", { locale: dateLocale })}`;

  // Navigation Buttons
  const getNavigationButtons = () => {
    const isDay = viewType === "day";
    const isMonth = viewType === "month";
    const prevHandler = isDay
      ? goToPreviousDay
      : isMonth
      ? goToPreviousMonth
      : goToPreviousWeek;
    const nextHandler = isDay
      ? goToNextDay
      : isMonth
      ? goToNextMonth
      : goToNextWeek;
    const todayHandler = isDay
      ? goToToday
      : isMonth
      ? goToCurrentMonth
      : goToCurrentWeek;

    return (
      <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-md border transition-all">
        {/* Previous */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevHandler}
          className="h-8 w-8 p-0 hover:bg-slate-100 transition"
          title={
            isDay ? "اليوم السابق" : isMonth ? "الشهر السابق" : "الأسبوع السابق"
          }
        >
          <ArrowRight className="w-4 h-4" /> {/* RTL-friendly */}
        </Button>

        {/* Today */}
        <Button
          variant="outline"
          size="sm"
          onClick={todayHandler}
          className="px-4 font-semibold"
        >
          {isDay ? "اليوم" : isMonth ? "هذا الشهر" : "هذا الأسبوع"}
        </Button>

        {/* Next */}
        <Button
          variant="ghost"
          size="sm"
          onClick={nextHandler}
          className="h-8 w-8 p-0 hover:bg-slate-100 transition"
          title={
            isDay ? "اليوم التالي" : isMonth ? "الشهر التالي" : "الأسبوع التالي"
          }
        >
          <ArrowLeft className="w-4 h-4" /> {/* RTL-friendly */}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      {/* Title + Description */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            التقويم الطبي
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            إدارة المواعيد وعرض الجدول بطريقة حديثة وسلسة
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Tabs */}
        <Tabs
          value={viewType}
          onValueChange={(value) => navigate(`/dashboard/calendar/${value}`)}
          className="bg-white rounded-lg border shadow-sm"
        >
          <TabsList className="grid w-full grid-cols-3 p-1">
            <TabsTrigger
              value="day"
              className="flex items-center gap-2 text-sm"
            >
              <Clock className="w-4 h-4" />
              يومي
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="flex items-center gap-2 text-sm"
            >
              <CalendarDays className="w-4 h-4" />
              أسبوعي
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className="flex items-center gap-2 text-sm"
            >
              <Grid3X3 className="w-4 h-4" />
              شهري
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Week / Day / Month Range */}
        {viewType === "day" && (
          <span className="text-sm text-slate-600 font-medium">
            {format(currentDate, "EEEE d MMMM yyyy", { locale: dateLocale })}
          </span>
        )}
        {viewType === "week" && (
          <span className="text-sm text-slate-600 font-medium">
            {weekRange}
          </span>
        )}
        {viewType === "month" && (
          <span className="text-sm text-slate-600 font-medium">
            {monthRange}
          </span>
        )}

        {/* Navigation */}
        {getNavigationButtons()}
      </div>
    </div>
  );
}
