import { useState } from "react";
import {
  Bell,
  Clock,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  X,
  Calendar,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "موعد جديد",
      message: "موعد جديد مع د. أحمد في الساعة 3:00 م",
      time: "منذ 5 دقائق",
      isRead: false,
      priority: "high",
      icon: Calendar,
      color: "emerald",
    },
    {
      id: 2,
      type: "reminder",
      title: "تذكير مكالمة",
      message: "اتصال بالمريض سارة أحمد لتأكيد الموعد",
      time: "منذ 15 دقيقة",
      isRead: false,
      priority: "medium",
      icon: Phone,
      color: "amber",
    },
    {
      id: 3,
      type: "patient",
      title: "مريض جديد",
      message: "تم تسجيل مريض جديد: محمد العلي",
      time: "منذ ساعة",
      isRead: true,
      priority: "low",
      icon: UserCheck,
      color: "sky",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-600",
      amber: "bg-amber-100 text-amber-600",
      sky: "bg-sky-100 text-sky-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.sky;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="absolute left-4 top-20 w-96 max-h-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-sky-600" />
                الإشعارات
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    notification.isRead
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-sky-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        notification.color
                      )}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 text-xs px-2"
                          >
                            تم القراءة
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>لا توجد إشعارات جديدة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
