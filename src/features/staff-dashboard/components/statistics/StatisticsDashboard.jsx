import { useState } from "react";
import {
  BarChart3,
  Calendar,
  Users,
  Archive,
  Download,
  TrendingUp,
  ChevronDown,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatisticsStore from "@/stores/statisticsStore";

// Import all statistics components
import AppointmentsStatistics from "./AppointmentsStatistics";
import PatientsStatistics from "./PatientsStatistics";
import ArchiveStatistics from "./ArchiveStatistics";
import ExportStatistics from "./ExportStatistics";
import TrendsStatistics from "./TrendsStatistics";

const statisticsCategories = [
  {
    id: "appointments",
    name: "المواعيد",
    icon: Calendar,
    color: "sky",
    component: AppointmentsStatistics,
    description: "إحصائيات المواعيد والخدمات",
  },
  {
    id: "patients",
    name: "المرضى",
    icon: Users,
    color: "emerald",
    component: PatientsStatistics,
    description: "إحصائيات المرضى والفئات العمرية",
  },
  {
    id: "archive",
    name: "الأرشيف والنسخ الاحتياطية",
    icon: Archive,
    color: "violet",
    component: ArchiveStatistics,
    description: "إدارة البيانات والنسخ الاحتياطية",
  },
  {
    id: "exports",
    name: "التصدير والتقارير",
    icon: Download,
    color: "amber",
    component: ExportStatistics,
    description: "تصدير البيانات والتقارير",
  },
  {
    id: "trends",
    name: "الاتجاهات والرؤى",
    icon: TrendingUp,
    color: "red",
    component: TrendsStatistics,
    description: "تحليل الاتجاهات والتوصيات",
  },
];

export default function StatisticsDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const { timeRange, setTimeRange, getColorClasses } = useStatisticsStore();

  const timeRangeOptions = [
    { value: "daily", label: "يومي" },
    { value: "weekly", label: "أسبوعي" },
    { value: "monthly", label: "شهري" },
    { value: "quarterly", label: "ربع سنوي" },
    { value: "yearly", label: "سنوي" },
  ];

  const ActiveComponent = statisticsCategories.find(
    (cat) => cat.id === activeTab
  )?.component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-sky-50 to-emerald-50 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-7 h-7 text-sky-600" />
                لوحة الإحصائيات الشاملة
              </CardTitle>
              <p className="text-gray-600 mt-1">
                نظرة شاملة على أداء العيادة وإحصائياتها
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>

              {/* Export Button */}
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statisticsCategories.map((category) => {
          const IconComponent = category.icon;
          const isActive = activeTab === category.id;

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isActive
                  ? "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 shadow-lg"
                  : "bg-white/80 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`p-3 rounded-lg ${
                      isActive
                        ? getColorClasses(category.color, "bg")
                        : "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        isActive
                          ? getColorClasses(category.color, "icon")
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-medium text-sm ${
                        isActive ? "text-gray-800" : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </h3>
                    {isActive && (
                      <Badge
                        className={`mt-1 ${getColorClasses(
                          category.color,
                          "bg"
                        )} ${getColorClasses(category.color, "text")}`}
                      >
                        نشط
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Statistics Content */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const activeCategory = statisticsCategories.find(
                  (cat) => cat.id === activeTab
                );
                const IconComponent = activeCategory?.icon;
                return (
                  <>
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        activeCategory?.color,
                        "bg"
                      )}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${getColorClasses(
                          activeCategory?.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {activeCategory?.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {activeCategory?.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                محدث: الآن
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>{ActiveComponent && <ActiveComponent />}</CardContent>
      </Card>

      {/* Quick Actions Footer */}
      <Card className="bg-gradient-to-r from-violet-50 to-sky-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">إجراءات سريعة</h3>
                <p className="text-sm text-gray-600">اختصارات لأهم الوظائف</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium">
                تقرير شامل
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                تصدير البيانات
              </button>
              <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium">
                النسخ الاحتياطية
              </button>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
                الإعدادات
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
