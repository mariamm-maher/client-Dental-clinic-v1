import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Timer, AlertTriangle, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QueueStats({ stats }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* Total Patients */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">
                {t("staff.stats.total")}
              </p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Waiting Patients */}
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-700">
                {t("staff.stats.waiting")}
              </p>
              <p className="text-2xl font-bold text-yellow-900">
                {stats.waiting}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      {/* In Progress */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">
                {t("staff.stats.inProgress")}
              </p>
              <p className="text-2xl font-bold text-green-900">
                {stats.inProgress}
              </p>
            </div>
            <Timer className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Urgent Priority */}
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">
                {t("staff.stats.urgent")}
              </p>
              <p className="text-2xl font-bold text-red-900">{stats.urgent}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      {/* On Hold */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {t("staff.stats.onHold")}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.onHold}</p>
            </div>
            <Pause className="w-8 h-8 text-gray-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
