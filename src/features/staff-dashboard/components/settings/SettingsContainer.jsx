import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Clock,
  UserCog,
  Bell,
  Palette,
  Cog,
  ArrowLeft,
  ArrowRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScheduleSettings from "./ScheduleSettings";
import ProfileSettings from "./ProfileSettings";

import SettingsQuickNav from "./SettingsQuickNav";

const settingsConfig = [
  {
    id: "schedule",
    title: "جدول العمل",
    description: "إدارة أوقات عمل العيادة والإجازات",
    icon: Clock,
    color: "blue",
    component: ScheduleSettings,
  },
  {
    id: "profile",
    title: "الملف الشخصي",
    description: "إدارة بيانات الحساب والأمان",
    icon: UserCog,
    color: "emerald",
    component: ProfileSettings,
  },
];

const getColorClasses = (color) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      hover: "hover:bg-blue-50",
      active: "bg-blue-50 border-blue-300 text-blue-700",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
      hover: "hover:bg-emerald-50",
      active: "bg-emerald-50 border-emerald-300 text-emerald-700",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200",
      hover: "hover:bg-amber-50",
      active: "bg-amber-50 border-amber-300 text-amber-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:bg-purple-50",
      active: "bg-purple-50 border-purple-300 text-purple-700",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      hover: "hover:bg-slate-50",
      active: "bg-slate-50 border-slate-300 text-slate-700",
    },
  };

  return colorMap[color] || colorMap.slate;
};

export default function SettingsContainer() {
  const location = useLocation();

  // Extract current setting from URL path
  const currentPath = location.pathname.split("/").pop();
  const currentSetting =
    settingsConfig.find((setting) => setting.id === currentPath) || null;

  const selectedSetting = currentSetting?.id || null;

  const SettingComponent = selectedSetting
    ? settingsConfig.find((s) => s.id === selectedSetting)?.component
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
                العودة للرئيسية
              </Button>
            </Link>
            {selectedSetting && (
              <Link
                to="/settings"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                  عودة للإعدادات
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {selectedSetting
                  ? settingsConfig.find((s) => s.id === selectedSetting)?.title
                  : "إعدادات النظام"}
              </h1>
              <p className="text-slate-600 mt-1">
                {selectedSetting
                  ? settingsConfig.find((s) => s.id === selectedSetting)
                      ?.description
                  : "إدارة وتخصيص إعدادات نظام العيادة"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedSetting && SettingComponent ? (
          // Render specific setting component
          <div className="animate-in slide-in-from-right-4 duration-300">
            <SettingComponent />
          </div>
        ) : (
          // Render settings overview
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-0 duration-300">
            {settingsConfig.map((setting) => {
              const IconComponent = setting.icon;
              const colorClasses = getColorClasses(setting.color);

              return (
                <Link
                  key={setting.id}
                  to={`/settings/${setting.id}`}
                  className={`block`}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 ${colorClasses.border} ${colorClasses.hover}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${colorClasses.text}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 mb-2">
                            {setting.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {setting.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            اضغط للتخصيص
                          </span>
                          <ArrowLeft className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick Navigation Bar - Only show when viewing specific setting */}
        {selectedSetting && (
          <SettingsQuickNav
            settingsConfig={settingsConfig}
            selectedSetting={selectedSetting}
            getColorClasses={getColorClasses}
          />
        )}
      </div>
    </div>
  );
}
