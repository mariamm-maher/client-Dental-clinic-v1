import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  MapPin,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AdvancedSearch({ onSearch, onFiltersChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: null,
    status: "",
    city: "",
    ageRange: "",
    lastVisit: "",
  });

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      dateRange: null,
      status: "",
      city: "",
      ageRange: "",
      lastVisit: "",
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value, filters);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Main Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="البحث في جميع البيانات..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pr-12 h-12 text-right bg-white/80 border-gray-200 focus:border-sky-500 focus:ring-sky-500 text-lg"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-12 px-4 relative ${
                activeFiltersCount > 0 ? "border-sky-500 bg-sky-50" : ""
              }`}
            >
              <SlidersHorizontal className="w-5 h-5 ml-2" />
              المرشحات
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -left-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-sky-500">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-sky-600" />
                  المرشحات المتقدمة
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 ml-1" />
                    مسح الكل
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    حالة المريض
                  </label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      handleFilterChange("status", value)
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                      <SelectItem value="blocked">محظور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* City Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-600" />
                    المدينة
                  </label>
                  <Select
                    value={filters.city}
                    onValueChange={(value) => handleFilterChange("city", value)}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">الرياض</SelectItem>
                      <SelectItem value="jeddah">جدة</SelectItem>
                      <SelectItem value="dammam">الدمام</SelectItem>
                      <SelectItem value="khobar">الخبر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    الفئة العمرية
                  </label>
                  <Select
                    value={filters.ageRange}
                    onValueChange={(value) =>
                      handleFilterChange("ageRange", value)
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="اختر العمر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-18">0-18 سنة</SelectItem>
                      <SelectItem value="19-35">19-35 سنة</SelectItem>
                      <SelectItem value="36-50">36-50 سنة</SelectItem>
                      <SelectItem value="51+">51+ سنة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Last Visit Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-600" />
                    آخر زيارة
                  </label>
                  <Select
                    value={filters.lastVisit}
                    onValueChange={(value) =>
                      handleFilterChange("lastVisit", value)
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">اليوم</SelectItem>
                      <SelectItem value="week">هذا الأسبوع</SelectItem>
                      <SelectItem value="month">هذا الشهر</SelectItem>
                      <SelectItem value="3months">آخر 3 أشهر</SelectItem>
                      <SelectItem value="6months">آخر 6 أشهر</SelectItem>
                      <SelectItem value="year">هذا العام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">
                      المرشحات النشطة:
                    </span>
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value) return null;

                      const filterLabels = {
                        status: "الحالة",
                        city: "المدينة",
                        ageRange: "العمر",
                        lastVisit: "آخر زيارة",
                      };

                      return (
                        <Badge
                          key={key}
                          variant="secondary"
                          className="bg-sky-100 text-sky-700 border-sky-200"
                        >
                          {filterLabels[key]}: {value}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFilterChange(key, "")}
                            className="h-4 w-4 p-0 ml-1 hover:bg-sky-200"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
