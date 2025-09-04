import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useAppointmentStore } from "@/stores";

export default function AppointmentFilters() {
  const searchTerm = useAppointmentStore((state) => state.searchTerm);
  const filterStatus = useAppointmentStore((state) => state.filterStatus);
  const setSearchTerm = useAppointmentStore((state) => state.setSearchTerm);
  const setFilterStatus = useAppointmentStore((state) => state.setFilterStatus);

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
            <Input
              placeholder="ابحث باسم المريض أو الهاتف أو الخدمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-slate-50 border-slate-200">
              <SelectValue placeholder="تصفية المواعيد" />
            </SelectTrigger>{" "}
            <SelectContent>
              <SelectItem value="all">جميع المواعيد</SelectItem>
              <SelectItem value="pending">في الانتظار</SelectItem>
              <SelectItem value="confirmed">مؤكدة</SelectItem>
              <SelectItem value="done">تمت</SelectItem>
              <SelectItem value="canceled">ملغاة</SelectItem>
              <SelectItem value="missed">فائتة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
