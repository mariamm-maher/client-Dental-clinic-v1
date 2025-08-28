import { TrendingUp, Users, Calendar, DollarSign, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useStatisticsStore from "@/stores/statisticsStore";

const iconMap = {
  Users,
  Calendar,
  DollarSign,
  Star,
};

export default function OverviewCards() {
  const { getFilteredStats, getColorClasses } = useStatisticsStore();
  const stats = getFilteredStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.overview.map((stat, index) => {
        const IconComponent = iconMap[stat.icon];

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
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${getColorClasses(stat.color, "icon")}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
