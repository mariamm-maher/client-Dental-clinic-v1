import { BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatisticsStore from "@/stores/statisticsStore";

export default function StatisticsHeader() {
  const { timeRange, setTimeRange, exportReport } = useStatisticsStore();

  const handleExportReport = async () => {
    try {
      const filename = await exportReport("pdf");
      // In a real app, this would trigger a download
      console.log(`Report exported: ${filename}`);
    } catch (error) {
      console.error("Failed to export report:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            الإحصائيات والتقارير
          </h1>
          <p className="text-gray-600">
            عرض شامل لأداء العيادة والإحصائيات المهمة
          </p>
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
      </div>
    </div>
  );
}
