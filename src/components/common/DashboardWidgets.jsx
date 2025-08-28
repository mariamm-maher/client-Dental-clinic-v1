import { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function DashboardWidgets() {
  const [liveData, setLiveData] = useState({
    patientsToday: 12,
    appointmentsCompleted: 8,
    revenue: 15750,
    waitingTime: 8,
    systemStatus: "healthy",
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        patientsToday: prev.patientsToday + Math.floor(Math.random() * 2),
        waitingTime: Math.max(
          5,
          prev.waitingTime + (Math.random() > 0.5 ? 1 : -1)
        ),
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const widgets = [
    {
      title: "حالة النظام",
      value: "صحي",
      icon: Activity,
      color: "emerald",
      description: "جميع الأنظمة تعمل بشكل طبيعي",
      trend: "stable",
    },
    {
      title: "المرضى اليوم",
      value: liveData.patientsToday,
      icon: Users,
      color: "sky",
      description: `+${Math.floor(liveData.patientsToday * 0.3)} من الأمس`,
      trend: "up",
    },
    {
      title: "متوسط الانتظار",
      value: `${liveData.waitingTime} دقيقة`,
      icon: Clock,
      color: liveData.waitingTime > 15 ? "red" : "amber",
      description: "الهدف: أقل من 15 دقيقة",
      trend: liveData.waitingTime > 15 ? "warning" : "good",
    },
    {
      title: "الإيرادات اليوم",
      value: `${liveData.revenue.toLocaleString()} ر.س`,
      icon: DollarSign,
      color: "violet",
      description: "+18% من الأمس",
      trend: "up",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: "bg-emerald-100",
        icon: "text-emerald-600",
        text: "text-emerald-700",
      },
      sky: {
        bg: "bg-sky-100",
        icon: "text-sky-600",
        text: "text-sky-700",
      },
      amber: {
        bg: "bg-amber-100",
        icon: "text-amber-600",
        text: "text-amber-700",
      },
      red: {
        bg: "bg-red-100",
        icon: "text-red-600",
        text: "text-red-700",
      },
      violet: {
        bg: "bg-violet-100",
        icon: "text-violet-600",
        text: "text-violet-700",
      },
    };
    return colors[color] || colors.sky;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {widgets.map((widget, index) => {
        const Icon = widget.icon;
        const colorClasses = getColorClasses(widget.color);

        return (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {widget.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {widget.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {widget.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    )}
                    {widget.trend === "warning" && (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm ${
                        widget.trend === "up"
                          ? "text-emerald-600"
                          : widget.trend === "warning"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {widget.description}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
                  <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                </div>
              </div>

              {/* Live indicator for some widgets */}
              {(widget.title.includes("المرضى") ||
                widget.title.includes("الانتظار")) && (
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">مباشر</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
