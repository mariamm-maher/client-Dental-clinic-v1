import { Clock, Users, Table, Grid3X3, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export default function QueueHeader({
  viewMode,
  setViewMode,
  currentTime,
  queueCount,
  onRefresh,
}) {
  const { t, i18n } = useTranslation();
  const formatTime = (date) => {
    return date.toLocaleTimeString(i18n.language || "ar", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("staff.queue.header.title")}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>
                {t("staff.queue.header.currentTime")} {formatTime(currentTime)}
              </span>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {queueCount} {t("staff.queue.header.inQueue")}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === "box" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("box")}
            className="h-8 px-3"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8 px-3"
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>

        {/* Refresh Button */}
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {t("common.refresh", { defaultValue: "تحديث" })}
        </Button>
      </div>
    </div>
  );
}
