import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QueueFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  onRefresh,
}) {
  const { t } = useTranslation();
  const hasActiveFilters =
    searchTerm || filterStatus !== "all" || filterPriority !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  return (
    <Card className="backdrop-blur-sm border border-gray-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t("staff.filters.title")}
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              {t("staff.filters.clearAll")}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-gray-700"
            >
              {t("staff.filters.searchPatients")}
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder={t("staff.filters.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {t("staff.filters.status")}
            </Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder={t("staff.filters.allStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("staff.filters.allStatus")}
                </SelectItem>
                <SelectItem value="waiting">
                  {t("staff.filters.waiting")}
                </SelectItem>
                <SelectItem value="in-progress">
                  {t("staff.filters.inProgress")}
                </SelectItem>
                <SelectItem value="on-hold">
                  {t("staff.filters.onHold")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {t("staff.filters.priority")}
            </Label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder={t("staff.filters.allPriorities")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("staff.filters.allPriorities")}
                </SelectItem>
                <SelectItem value="normal">
                  {t("staff.filters.normal")}
                </SelectItem>
                <SelectItem value="urgent">
                  {t("staff.filters.urgent")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
