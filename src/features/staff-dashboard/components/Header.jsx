import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LanguageToggle from "@/components/common/LanguageToggle";
import { LogoutButton } from "@/features/auth";
import {
  Building2,
  Bell,
  Settings,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString(i18n.language || "ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  {t("logo.clinicName")}
                </h1>
                <p className="text-sm text-slate-600 font-medium">
                  {t("receptionist.header.receptionistDashboard")}
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Date & Time */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-stone-100 px-4 py-2 rounded-xl border border-orange-200/50">
              <Calendar className="w-5 h-5 text-slate-600" />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            <Separator orientation="vertical" className="h-8" />

            <Separator orientation="vertical" className="h-8" />

            {/* Logout Button */}
            <LogoutButton variant="ghost" size="sm" />

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white font-semibold">
                  RC
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-slate-900">
                  {t("receptionist.header.receptionistName", "مايا أحمد")}
                </p>
                <p className="text-slate-600">
                  {t("receptionist.header.receptionistRole", "موظف الاستقبال")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Date/Time - Show on smaller screens */}
        <div className="md:hidden mt-4 flex justify-center">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-stone-100 px-4 py-2 rounded-xl border border-orange-200/50">
            <Calendar className="w-4 h-4 text-slate-600" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900">
                {formatDate(currentTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
