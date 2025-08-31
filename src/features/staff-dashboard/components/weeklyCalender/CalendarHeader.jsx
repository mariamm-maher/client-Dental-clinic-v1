import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Activity,
  Filter,
  CalendarDays,
  Grid3X3,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";
import { startOfWeek, addDays } from "date-fns";

export default function CalendarHeader() {
  const {
    currentWeek,
    currentDate,
    selectedFilter,
    viewType,
    doctors,
    setSelectedFilter,
    setViewType,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    goToPreviousDay,
    goToNextDay,
    goToToday,
  } = useWeeklyCalendarStore();
  const dateLocale = arSA;

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();

  const getNavigationButtons = () => {
    if (viewType === "day") {
      return (
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousDay}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="px-3"
          >
            اليوم
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextDay}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToCurrentWeek}
            className="px-3"
          >
            اليوم
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextWeek}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      );
    }
  };

  const getDateTitle = () => {
    if (viewType === "day") {
      return format(currentDate, "EEEE d MMMM yyyy", { locale: dateLocale });
    } else if (viewType === "week") {
      return `أسبوع ${format(weekDays[0], "MMM d", {
        locale: dateLocale,
      })} - ${format(weekDays[6], "MMM d, yyyy", { locale: dateLocale })}`;
    } else {
      return format(currentWeek, "MMMM yyyy", { locale: dateLocale });
    }
  };
  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              التقويم الطبي
            </h1>
            <p className="text-slate-600 mt-1">
              عرض وإدارة المواعيد بطريقة ذكية ومتقدمة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Type Tabs */}
          <Tabs
            value={viewType}
            onValueChange={setViewType}
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

          <Badge variant="secondary" className="text-sm font-medium px-3 py-2">
            <Activity className="w-4 h-4 mr-2" />
            مباشر
          </Badge>

          {getNavigationButtons()}
        </div>
      </div>

      {/* Date Range and Filters */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                {" "}
                <h3 className="font-semibold text-slate-900">
                  {getDateTitle()}
                </h3>
                <p className="text-sm text-slate-600">تصفية حسب الطبيب</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className="text-sm"
              >
                جميع الأطباء
              </Button>
              {doctors.map((doctor) => (
                <Button
                  key={doctor.id}
                  variant={
                    selectedFilter === doctor.name ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(doctor.name)}
                  className="text-sm flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${doctor.color}`}></div>
                  {doctor.name.replace("د. ", "")}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
