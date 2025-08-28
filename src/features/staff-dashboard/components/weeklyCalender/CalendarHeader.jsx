import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Activity,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";
import { startOfWeek, addDays } from "date-fns";

export default function CalendarHeader() {
  const {
    currentWeek,
    selectedFilter,
    doctors,
    setSelectedFilter,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
  } = useWeeklyCalendarStore();

  const dateLocale = arSA;

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();

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
              التقويم الأسبوعي
            </h1>
            <p className="text-slate-600 mt-1">
              عرض وإدارة المواعيد الأسبوعية للعيادة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm font-medium px-3 py-2">
            <Activity className="w-4 h-4 mr-2" />
            مباشر
          </Badge>
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
        </div>
      </div>

      {/* Week Range and Filters */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  أسبوع {format(weekDays[0], "MMM d", { locale: dateLocale })} -{" "}
                  {format(weekDays[6], "MMM d, yyyy", { locale: dateLocale })}
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
