import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  CalendarPlus,
  UserPlus,
  Calendar,
  Search,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NavigationTabs() {
  const location = useLocation();

  const tabs = [
    {
      id: "today",
      path: "/dashboard",
      label: "مواعيد اليوم",
      icon: CalendarDays,
      count: 8,
      color: "sky",
      description: "إدارة مواعيد اليوم",
    },
    {
      id: "schedule",
      path: "/dashboard/schedule",
      label: "حجز موعد",
      icon: CalendarPlus,
      count: 0,
      color: "emerald",
      description: "حجز موعد جديد",
    },
    {
      id: "register",
      path: "/dashboard/register",
      label: "تسجيل مريض",
      icon: UserPlus,
      count: 5,
      color: "violet",
      description: "تسجيل مريض جديد",
    },
    {
      id: "calendar",
      path: "/dashboard/calendar",
      label: "التقويم",
      icon: Calendar,
      count: 45,
      color: "blue",
      description: "عرض المواعيد ",
    },
    {
      id: "statistics",
      path: "/dashboard/statistics",
      label: "الإحصائيات",
      icon: BarChart3,
      count: 12,
      color: "amber",
      description: "تقارير وإحصائيات",
    },
    {
      id: "search",
      path: "/dashboard/search",
      label: "البحث عن مريض",
      icon: Search,
      count: 1247,
      color: "rose",
      description: "البحث في قاعدة المرضى",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      sky: {
        active:
          "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-300 shadow-lg",
        inactive:
          "bg-white/80 text-sky-700 border-sky-200 hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 hover:border-sky-400 hover:text-sky-800",
        badge: "bg-sky-100 text-sky-700",
        activeBadge: "bg-white/20 text-white",
      },
      emerald: {
        active:
          "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-300 shadow-lg",
        inactive:
          "bg-white/80 text-emerald-700 border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 hover:border-emerald-400 hover:text-emerald-800",
        badge: "bg-emerald-100 text-emerald-700",
        activeBadge: "bg-white/20 text-white",
      },
      violet: {
        active:
          "bg-gradient-to-r from-violet-500 to-purple-600 text-white border-violet-300 shadow-lg",
        inactive:
          "bg-white/80 text-violet-700 border-violet-200 hover:bg-gradient-to-r hover:from-violet-100 hover:to-purple-100 hover:border-violet-400 hover:text-violet-800",
        badge: "bg-violet-100 text-violet-700",
        activeBadge: "bg-white/20 text-white",
      },
      blue: {
        active:
          "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-300 shadow-lg",
        inactive:
          "bg-white/80 text-blue-700 border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 hover:text-blue-800",
        badge: "bg-blue-100 text-blue-700",
        activeBadge: "bg-white/20 text-white",
      },
      amber: {
        active:
          "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-300 shadow-lg",
        inactive:
          "bg-white/80 text-amber-700 border-amber-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:border-amber-400 hover:text-amber-800",
        badge: "bg-amber-100 text-amber-700",
        activeBadge: "bg-white/20 text-white",
      },
      rose: {
        active:
          "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-300 shadow-lg",
        inactive:
          "bg-white/80 text-rose-700 border-rose-200 hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 hover:border-rose-400 hover:text-rose-800",
        badge: "bg-rose-100 text-rose-700",
        activeBadge: "bg-white/20 text-white",
      },
    };
    return colors[color] || colors.sky;
  };

  return (
    <nav className="bg-gradient-to-l from-white via-sky-50 to-blue-50 border-b border-sky-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              location.pathname === tab.path ||
              (tab.path === "/dashboard" && location.pathname === "/dashboard");
            const colorClasses = getColorClasses(tab.color);

            return (
              <Link key={tab.id} to={tab.path}>
                <Button
                  variant="ghost"
                  className={`flex-shrink-0 h-auto p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    isActive ? colorClasses.active : colorClasses.inactive
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <div className="text-right">
                        <div className="font-semibold text-sm">{tab.label}</div>
                        <div
                          className={`text-xs opacity-80 ${
                            isActive ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {tab.description}
                        </div>
                      </div>
                    </div>
                    {tab.count > 0 && (
                      <Badge
                        variant="secondary"
                        className={`text-xs font-bold px-2 py-1 ${
                          isActive
                            ? colorClasses.activeBadge
                            : colorClasses.badge
                        }`}
                      >
                        {tab.count > 999 ? "999+" : tab.count}
                      </Badge>
                    )}
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
