import {
  Download,
  FileText,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  Download,
  FileText,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
};

export default function ExportStatistics() {
  const { getStatsSection, getColorClasses } = useStatisticsStore();
  const exportStats = getStatsSection("exports");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getExportIcon = (type) => {
    if (type.includes("المواعيد")) return Calendar;
    if (type.includes("المرضى")) return Users;
    if (type.includes("المالية")) return DollarSign;
    if (type.includes("الإحصائيات")) return BarChart3;
    return FileText;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exportStats.overview?.map((stat, index) => {
          const IconComponent = iconMap[stat.icon];
          const isPositive = stat.trend === "up";

          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${getColorClasses(
                      stat.color,
                      "bg"
                    )}`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${getColorClasses(
                        stat.color,
                        "icon"
                      )}`}
                    />
                  </div>
                </div>

                {stat.change && stat.trend !== "neutral" && (
                  <div className="flex items-center mt-4">
                    <Badge
                      variant={isPositive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-gray-500 mr-2">
                      من الشهر السابق
                    </span>
                  </div>
                )}

                {stat.trend === "neutral" && stat.change && (
                  <div className="flex items-center mt-4">
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Types */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-600" />
              أنواع التصديرات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportStats.types?.map((type, index) => {
              const IconComponent = getExportIcon(type.type);

              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${getColorClasses(
                          type.color,
                          "bg"
                        )}`}
                      >
                        <IconComponent
                          className={`w-4 h-4 ${getColorClasses(
                            type.color,
                            "icon"
                          )}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {type.type}
                        </h4>
                        <p className="text-xs text-gray-500">
                          آخر تصدير: {formatDate(type.lastExport)}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-gray-900">
                        {type.count}
                      </p>
                      <p className="text-xs text-gray-500">تصدير</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        النسبة من إجمالي التصديرات:
                      </span>
                      <span className="font-medium">{type.percentage}%</span>
                    </div>
                    <Progress value={type.percentage} className="h-2" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Exports */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              التصديرات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "تقرير المواعيد الشهري",
                date: "2025-08-31",
                time: "10:30 ص",
                size: "2.4 MB",
                format: "PDF",
                status: "مكتمل",
              },
              {
                name: "قائمة المرضى النشطين",
                date: "2025-08-30",
                time: "03:15 م",
                size: "1.8 MB",
                format: "Excel",
                status: "مكتمل",
              },
              {
                name: "التقرير المالي الأسبوعي",
                date: "2025-08-29",
                time: "09:45 ص",
                size: "3.2 MB",
                format: "PDF",
                status: "مكتمل",
              },
              {
                name: "إحصائيات الخدمات",
                date: "2025-08-28",
                time: "02:20 م",
                size: "950 KB",
                format: "Excel",
                status: "مكتمل",
              },
            ].map((export_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">
                      {export_.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        {formatDate(export_.date)} - {export_.time}
                      </span>
                      <span>{export_.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {export_.format}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">
                      {export_.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Actions */}
      <Card className="bg-gradient-to-r from-sky-50 to-violet-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-100 rounded-lg">
                <Download className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">تصدير التقارير</h3>
                <p className="text-sm text-gray-600">
                  إنشاء وتصدير التقارير المختلفة
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                تقرير جديد
              </button>
              <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                الإحصائيات
              </button>
            </div>
          </div>

          {/* Quick Export Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { name: "المواعيد", icon: Calendar, color: "sky" },
              { name: "المرضى", icon: Users, color: "emerald" },
              { name: "التقارير المالية", icon: DollarSign, color: "violet" },
              { name: "الإحصائيات", icon: BarChart3, color: "amber" },
            ].map((option, index) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={index}
                  className={`p-4 rounded-lg border-2 border-dashed ${getColorClasses(
                    option.color,
                    "border"
                  )} hover:bg-gray-50 transition-colors group`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${getColorClasses(
                      option.color,
                      "icon"
                    )} mx-auto mb-2 group-hover:scale-110 transition-transform`}
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {option.name}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
