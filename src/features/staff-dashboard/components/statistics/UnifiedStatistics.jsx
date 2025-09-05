import { useState } from "react";
import {
  BarChart3,
  Calendar,
  Users,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Activity,
  Download,
  CalendarCheck,
  UserPlus,
  FileText,
  CheckCircle,
  XCircle,
  Timer,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import useStatisticsStore from "@/stores/statisticsStore";

export default function UnifiedStatistics() {
  const [refreshing, setRefreshing] = useState(false);
  const { timeRange, setTimeRange, getColorClasses, exportReport } =
    useStatisticsStore();

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExportReport = async () => {
    try {
      const filename = await exportReport("pdf");
      console.log(`Report exported: ${filename}`);
    } catch (error) {
      console.error("Failed to export report:", error);
    }
  };

  // Overview stats with icons
  const overviewStats = [
    {
      title: "إجمالي المرضى",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "emerald",
    },
    {
      title: "المواعيد المستقبلية",
      value: "23",
      change: "+5%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "مواعيد شهرية",
      value: "15,750 ج.م",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "معدل الرضا",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "yellow",
    },
  ];

  // Appointment statistics
  const appointmentStats = [
    {
      status: "confirmed",
      count: 45,
      label: "مؤكدة",
      color: "emerald",
      icon: CheckCircle,
    },
    {
      status: "pending",
      count: 12,
      label: "في الانتظار",
      color: "yellow",
      icon: Timer,
    },
    {
      status: "canceled",
      count: 3,
      label: "ملغية",
      color: "red",
      icon: XCircle,
    },
    {
      status: "completed",
      count: 156,
      label: "مكتملة",
      color: "blue",
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-sky-50 to-emerald-50 border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    الإحصائيات والتقارير الشاملة
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">يومي</SelectItem>
                    <SelectItem value="weekly">أسبوعي</SelectItem>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="yearly">سنوي</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90"
                  onClick={handleExportReport}
                >
                  <Download className="w-4 h-4 ml-2" />
                  تصدير التقرير
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <TrendingUp
                          className={`w-4 h-4 ${
                            stat.trend === "up"
                              ? "text-emerald-600"
                              : "text-red-600 rotate-180"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Statistics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  إحصائيات المواعيد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {appointmentStats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={stat.status}
                        className={`p-4 rounded-lg border ${
                          stat.color === "emerald"
                            ? "bg-emerald-50 border-emerald-200"
                            : stat.color === "yellow"
                            ? "bg-yellow-50 border-yellow-200"
                            : stat.color === "red"
                            ? "bg-red-50 border-red-200"
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <IconComponent
                            className={`w-5 h-5 ${
                              stat.color === "emerald"
                                ? "text-emerald-600"
                                : stat.color === "yellow"
                                ? "text-yellow-600"
                                : stat.color === "red"
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          />
                          <span className="text-2xl font-bold text-gray-900">
                            {stat.count}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sky-600" />
                  إجراءات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CalendarCheck className="w-4 h-4 ml-2" />
                    حجز موعد جديد
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <UserPlus className="w-4 h-4 ml-2" />
                    إضافة مريض جديد
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 ml-2" />
                    إنشاء تقرير
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
