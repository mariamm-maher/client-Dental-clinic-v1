import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Timer, Users } from "lucide-react";
import useWeeklyCalendarStore from "@/stores/weeklyCalendarStore";
import { startOfWeek, addDays } from "date-fns";

export default function CalendarStats() {
  const { currentWeek, getWeekStatistics } = useWeeklyCalendarStore();

  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, {
      weekStartsOn: 6, // السبت أول أيام الأسبوع للتقويم العربي
    });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const weekDays = getWeekDays();
  const { weekTotal, todayTotal, doctorsCount } = getWeekStatistics(weekDays);

  const stats = [
    {
      label: "مواعيد الأسبوع",
      value: weekTotal,
      icon: CalendarDays,
      color: "text-sky-600",
      bgColor: "bg-sky-50 border-sky-200",
      trend: "هذا الأسبوع",
    },
    {
      label: "مواعيد اليوم",
      value: todayTotal,
      icon: Timer,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      trend: "اليوم",
    },
    {
      label: "الأطباء المتاحون",
      value: doctorsCount,
      icon: Users,
      color: "text-violet-600",
      bgColor: "bg-violet-50 border-violet-200",
      trend: "نشط",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-2 ${stat.bgColor} hover:shadow-lg transition-all duration-200`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.trend}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor} ${stat.color}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
