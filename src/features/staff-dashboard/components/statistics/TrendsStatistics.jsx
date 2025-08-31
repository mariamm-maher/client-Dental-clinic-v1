import {
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  UserCheck,
  Calendar,
  Users,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  UserCheck,
  Calendar,
  Users,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
};

export default function TrendsStatistics() {
  const { getStatsSection, getColorClasses } = useStatisticsStore();
  const trendsStats = getStatsSection("trends");

  return (
    <div className="space-y-6">
      {/* Growth Metrics */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            مؤشرات النمو
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendsStats.growth?.map((metric, index) => {
              const IconComponent = iconMap[metric.icon];
              const isPositive = metric.icon === "TrendingUp";

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${getColorClasses(
                    metric.color,
                    "border"
                  )} bg-gradient-to-br from-white to-gray-50`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg ${getColorClasses(
                        metric.color,
                        "bg"
                      )}`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${getColorClasses(
                          metric.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <Badge
                      variant={isPositive ? "default" : "destructive"}
                      className={`${
                        isPositive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {metric.value}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2">
                    {metric.metric}
                  </h3>
                  <p className="text-sm text-gray-600">{metric.comparison}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              الرؤى الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendsStats.insights?.map((insight, index) => {
              const IconComponent = iconMap[insight.icon];

              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        insight.color,
                        "bg"
                      )}`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${getColorClasses(
                          insight.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <h4 className="font-medium text-gray-800">
                      {insight.title}
                    </h4>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mr-9">
                    {insight.value}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-sky-600" />
              مؤشرات الأداء
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "هدف المواعيد الشهرية",
                current: 340,
                target: 400,
                percentage: 85,
                color: "sky",
                status: "جيد",
              },
              {
                title: "هدف المرضى الجدد",
                current: 127,
                target: 150,
                percentage: 84.7,
                color: "emerald",
                status: "جيد",
              },
              {
                title: "معدل الرضا المستهدف",
                current: 92,
                target: 95,
                percentage: 96.8,
                color: "violet",
                status: "ممتاز",
              },
              {
                title: "معدل الحضور المستهدف",
                current: 87.6,
                target: 90,
                percentage: 97.3,
                color: "amber",
                status: "جيد جداً",
              },
            ].map((indicator, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">
                    {indicator.title}
                  </h4>
                  <Badge
                    className={`${getColorClasses(
                      indicator.color,
                      "bg"
                    )} ${getColorClasses(indicator.color, "text")}`}
                  >
                    {indicator.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">الحالي / الهدف:</span>
                    <span className="font-medium">
                      {indicator.current} / {indicator.target}
                    </span>
                  </div>
                  <Progress value={indicator.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{indicator.percentage}% من الهدف</span>
                    <span>{indicator.target - indicator.current} متبقي</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-emerald-50 to-sky-50 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            التوصيات والاقتراحات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "تحسين معدل الحضور",
                description:
                  "إرسال تذكيرات إضافية للمرضى قبل 24 ساعة من الموعد",
                impact: "قد يزيد معدل الحضور بنسبة 5-8%",
                priority: "عالية",
                color: "emerald",
                icon: "UserCheck",
              },
              {
                title: "تقليل وقت الانتظار",
                description: "تحسين جدولة المواعيد وتقليل الفجوات الزمنية",
                impact: "تحسين تجربة المرضى ورضاهم",
                priority: "متوسطة",
                color: "sky",
                icon: "Clock",
              },
              {
                title: "زيادة الحجوزات في الأوقات الهادئة",
                description:
                  "تقديم خصومات أو حوافز للحجز في الأوقات أقل ازدحاماً",
                impact: "استغلال أفضل لسعة العيادة",
                priority: "متوسطة",
                color: "violet",
                icon: "Calendar",
              },
              {
                title: "تحسين متابعة المرضى",
                description: "تطوير نظام متابعة منتظم للمرضى المزمنين",
                impact: "زيادة عدد المواعيد المتكررة",
                priority: "عالية",
                color: "amber",
                icon: "Activity",
              },
            ].map((recommendation, index) => {
              const IconComponent = iconMap[recommendation.icon];
              const priorityColor =
                recommendation.priority === "عالية"
                  ? "red"
                  : recommendation.priority === "متوسطة"
                  ? "amber"
                  : "green";

              return (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${getColorClasses(
                        recommendation.color,
                        "bg"
                      )} mt-1`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${getColorClasses(
                          recommendation.color,
                          "icon"
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">
                          {recommendation.title}
                        </h4>
                        <Badge
                          variant={
                            priorityColor === "red" ? "destructive" : "default"
                          }
                          className={
                            priorityColor === "amber"
                              ? "bg-amber-100 text-amber-700"
                              : ""
                          }
                        >
                          {recommendation.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {recommendation.description}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        {recommendation.impact}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-violet-50 to-emerald-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">تحليل متقدم</h3>
                <p className="text-sm text-gray-600">
                  استكشف البيانات والاتجاهات بعمق أكبر
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium">
                تقرير مفصل
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                تصدير التحليل
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
