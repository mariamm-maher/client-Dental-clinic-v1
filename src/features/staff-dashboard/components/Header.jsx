import { LogoutButton } from "@/features/auth";
import {
  Calendar,
  Clock,
  User,
  Settings,
  Cog,
  UserCog,
  Bell,
  Palette,
} from "lucide-react";
import { useAuthStore } from "@/stores";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const currentTime = new Date();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo & Title - Right side (primary position for Arabic) */}
          <Logo />

          {/* Date & Time - Center (Hidden on mobile, shown in second row) */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-sky-200 shadow-sm">
              <Calendar className="w-5 h-5 text-sky-600" />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
          </div>

          {/* User Profile & Actions - Left side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Settings - Show on all screen sizes */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 sm:h-10 sm:w-10 p-0 bg-white/90 backdrop-blur-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-60 sm:w-64 p-2 mr-2"
              >
                <DropdownMenuLabel className="text-slate-700 font-semibold px-2">
                  إعدادات النظام
                </DropdownMenuLabel>
                <DropdownMenuSeparator />{" "}
                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                  className="cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        جميع الإعدادات
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        إدارة إعدادات النظام الكاملة
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/settings/schedule")}
                  className="cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        جدول العمل
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        إدارة أوقات عمل العيادة
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings/profile")}
                  className="cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCog className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        الملف الشخصي
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        إدارة بيانات الحساب
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-emerald-200 shadow-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block text-right min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "المستخدم"}
                </p>
                <p className="text-xs text-gray-600">موظف استقبال</p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="hidden sm:block">
              <LogoutButton variant="outline" size="sm" />
            </div>
          </div>
        </div>

        {/* Mobile Second Row - Date/Time and Logout */}
        <div className="xl:hidden mt-3 sm:mt-4">
          <div className="flex items-center justify-between gap-3">
            {/* Date/Time for mobile and tablet */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-sky-200 shadow-sm">
                <Calendar className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <div className="text-center sm:text-left min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {formatDate(currentTime)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                    {currentTime.toLocaleTimeString("ar", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Clock className="w-4 h-4 text-sky-500 flex-shrink-0" />
              </div>
            </div>

            {/* Mobile Logout Button */}
            <div className="sm:hidden">
              <LogoutButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
