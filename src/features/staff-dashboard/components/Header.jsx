import { LogoutButton } from "@/features/auth";
import { Building2, Calendar, Clock, Bell, User } from "lucide-react";

export default function Header() {
  const currentTime = new Date();

  const formatDate = (date) => {
    return date.toLocaleDateString("ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <header className="bg-gradient-to-l from-white via-sky-50 to-blue-50 border-b border-sky-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title - Right side (primary position for Arabic) */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                مركز الندى
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                لوحة تحكم موظف الاستقبال
              </p>
            </div>
          </div>

          {/* Date & Time - Center */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-sky-200 shadow-sm">
              <Calendar className="w-5 h-5 text-sky-600" />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Staff Profile & Actions - Left side */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-emerald-200 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900">أحمد محمد</p>
                <p className="text-xs text-gray-600">موظف استقبال</p>
              </div>
            </div>
            <LogoutButton variant="outline" size="sm" />
          </div>
        </div>

        {/* Mobile Date/Time - Show on smaller screens */}
        <div className="lg:hidden mt-4 flex justify-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-sky-200 shadow-sm">
            <Calendar className="w-4 h-4 text-sky-600" />
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(currentTime)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {currentTime.toLocaleTimeString("ar", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
