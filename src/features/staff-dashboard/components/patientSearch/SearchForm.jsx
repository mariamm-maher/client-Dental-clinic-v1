import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Phone,
  Mail,
  Calendar,
  History,
  MoreVertical,
  Eye,
  Edit,
  CalendarPlus,
} from "lucide-react";
import usePatientSearchStore from "@/stores/patientSearchStore";

export default function SearchForm() {
  const {
    searchTerm,
    searchType,
    selectedPatient,
    setSearchTerm,
    setSearchType,
    setSelectedPatient,
    getFilteredPatients,
    getStatusBadge,
  } = usePatientSearchStore();

  const filteredPatients = getFilteredPatients();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
          <Search className="w-6 h-6 text-sky-600" />
          البحث عن المرضى
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="البحث عن المرضى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-12 text-right bg-white/80 border-gray-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full sm:w-[200px] h-12 bg-white/80 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحقول</SelectItem>
              <SelectItem value="name">الاسم فقط</SelectItem>
              <SelectItem value="phone">الهاتف فقط</SelectItem>
              <SelectItem value="email">البريد الإلكتروني فقط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => {
            const statusConfig = getStatusBadge(patient.status);
            return (
              <div
                key={patient.id}
                className={`p-4 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                  selectedPatient?.id === patient.id
                    ? "bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200"
                    : "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white"
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {patient.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={statusConfig.className}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-violet-600" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          آخر زيارة: {patient.lastVisit}
                        </div>
                        <div className="flex items-center gap-2">
                          <History className="w-4 h-4 text-amber-600" />
                          {patient.totalVisits} زيارة
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 ml-2" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل المريض
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CalendarPlus className="w-4 h-4 ml-2" />
                          جدولة موعد
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="w-4 h-4 ml-2" />
                          عرض التاريخ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPatients.length === 0 && searchTerm && (
            <div className="text-center py-12 text-gray-500">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                لم يتم العثور على مرضى
              </h3>
              <p>جرّب تعديل شروط البحث أو المرشحات</p>
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-12 text-gray-500">
              <div className="p-4 bg-sky-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-sky-600" />
              </div>
              <p className="text-lg">ابدأ بالكتابة للبحث عن المرضى</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
