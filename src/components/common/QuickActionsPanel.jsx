import {
  Plus,
  Phone,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  Search,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function QuickActionsPanel({ onActionClick }) {
  const quickActions = [
    {
      id: "new-appointment",
      title: "موعد سريع",
      description: "حجز موعد جديد",
      icon: Plus,
      color: "emerald",
      shortcut: "Ctrl+N",
      urgent: false,
    },
    {
      id: "call-patient",
      title: "اتصال بمريض",
      description: "مكالمة سريعة",
      icon: Phone,
      color: "blue",
      shortcut: "Ctrl+P",
      urgent: true,
    },
    {
      id: "send-sms",
      title: "إرسال رسالة",
      description: "تذكير بالموعد",
      icon: MessageSquare,
      color: "violet",
      shortcut: "Ctrl+M",
      urgent: false,
    },
    {
      id: "generate-report",
      title: "تقرير يومي",
      description: "إنشاء تقرير",
      icon: FileText,
      color: "amber",
      shortcut: "Ctrl+R",
      urgent: false,
    },
    {
      id: "check-schedule",
      title: "مراجعة الجدول",
      description: "عرض المواعيد",
      icon: Calendar,
      color: "sky",
      shortcut: "Ctrl+S",
      urgent: false,
    },
    {
      id: "backup-data",
      title: "نسخ احتياطي",
      description: "حفظ البيانات",
      icon: Download,
      color: "rose",
      shortcut: "Ctrl+B",
      urgent: false,
    },
  ];

  const recentActions = [
    "تم حجز موعد للمريض سارة أحمد",
    "تم إرسال تذكير لـ 5 مرضى",
    "تم إنشاء تقرير المبيعات اليومي",
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: "bg-emerald-100",
        hover: "hover:bg-emerald-200",
        icon: "text-emerald-600",
        border: "border-emerald-200",
      },
      blue: {
        bg: "bg-blue-100",
        hover: "hover:bg-blue-200",
        icon: "text-blue-600",
        border: "border-blue-200",
      },
      violet: {
        bg: "bg-violet-100",
        hover: "hover:bg-violet-200",
        icon: "text-violet-600",
        border: "border-violet-200",
      },
      amber: {
        bg: "bg-amber-100",
        hover: "hover:bg-amber-200",
        icon: "text-amber-600",
        border: "border-amber-200",
      },
      sky: {
        bg: "bg-sky-100",
        hover: "hover:bg-sky-200",
        icon: "text-sky-600",
        border: "border-sky-200",
      },
      rose: {
        bg: "bg-rose-100",
        hover: "hover:bg-rose-200",
        icon: "text-rose-600",
        border: "border-rose-200",
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Actions */}
      <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-sky-600" />
            الإجراءات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClasses = getColorClasses(action.color);

              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  onClick={() => onActionClick?.(action.id)}
                  className={`h-auto p-4 justify-start ${colorClasses.bg} ${colorClasses.hover} border-2 ${colorClasses.border} transition-all duration-200 hover:scale-105 hover:shadow-md relative`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                    <div className="text-right flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {action.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {action.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {action.shortcut}
                      </div>
                    </div>
                    {action.urgent && (
                      <Badge
                        variant="destructive"
                        className="absolute top-1 left-1 h-5 px-1"
                      >
                        عاجل
                      </Badge>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActions.map((action, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
            >
              <p className="text-sm text-gray-700">{action}</p>
              <p className="text-xs text-gray-500 mt-1">
                منذ {(index + 1) * 5} دقائق
              </p>
            </div>
          ))}
          <Button variant="outline" className="w-full text-sm">
            عرض جميع الأنشطة
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
