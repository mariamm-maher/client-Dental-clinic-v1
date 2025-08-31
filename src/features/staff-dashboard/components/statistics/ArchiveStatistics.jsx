import {
  Archive,
  HardDrive,
  Shield,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  Archive,
  HardDrive,
  Shield,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Calendar,
};

export default function ArchiveStatistics() {
  const { getStatsSection, getColorClasses } = useStatisticsStore();
  const archiveStats = getStatsSection("archive");

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {archiveStats.overview?.map((stat, index) => {
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

                {stat.change && (
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              حالة النسخ الاحتياطية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {archiveStats.backups?.map((backup, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{backup.type}</h4>
                  <Badge
                    className={`${getColorClasses(
                      backup.color,
                      "bg"
                    )} ${getColorClasses(backup.color, "text")}`}
                  >
                    {backup.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>آخر نسخة احتياطية:</span>
                    <span className="font-medium">{backup.lastDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>حجم الملف:</span>
                    <span className="font-medium">{backup.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Archived Data */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-600" />
              البيانات المؤرشفة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {archiveStats.archivedData?.map((data, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">{data.type}</h4>
                  <div
                    className={`p-2 rounded-lg ${getColorClasses(
                      data.color,
                      "bg"
                    )}`}
                  >
                    <Database
                      className={`w-4 h-4 ${getColorClasses(
                        data.color,
                        "icon"
                      )}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">عدد السجلات:</span>
                    <span className="font-medium text-gray-800">
                      {data.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">حجم البيانات:</span>
                    <span className="font-medium text-gray-800">
                      {data.size}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Storage Usage */}
            <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg border border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  إجمالي المساحة المستخدمة
                </span>
                <span className="text-lg font-bold text-gray-900">2.8 GB</span>
              </div>
              <Progress value={68} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2.8 GB مستخدمة</span>
                <span>من أصل 4.1 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-emerald-50 to-sky-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">إجراءات سريعة</h3>
                <p className="text-sm text-gray-600">
                  إدارة النسخ الاحتياطية والأرشيف
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                نسخة احتياطية جديدة
              </button>
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium">
                عرض الأرشيف
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
