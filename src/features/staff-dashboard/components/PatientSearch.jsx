import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  User,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Mail,
  MoreVertical,
  Eye,
  Edit,
  CalendarPlus,
  History,
  Filter,
  Users,
} from "lucide-react";

export default function PatientSearch() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+966501234567",
      email: "sarah.johnson@email.com",
      address: "123 King Street, Riyadh",
      dateOfBirth: "1985-03-15",
      lastVisit: "2024-01-20",
      totalVisits: 12,
      status: "active",
      notes: "Regular patient, prefers morning appointments",
      treatments: ["Dental Cleaning", "Root Canal", "Teeth Whitening"],
      upcomingAppointments: [
        {
          date: "2025-01-30",
          time: "10:00 AM",
          treatment: "Follow-up",
          doctor: "Dr. Ahmed",
        },
      ],
    },
    {
      id: 2,
      name: "أحمد محمد العلي",
      phone: "+966509876543",
      email: "ahmed.ali@email.com",
      address: "456 Prince Street, Jeddah",
      dateOfBirth: "1978-07-22",
      lastVisit: "2024-01-18",
      totalVisits: 8,
      status: "active",
      notes: "Allergic to latex, prefers Arabic-speaking staff",
      treatments: ["Orthodontic Treatment", "Cavity Filling"],
      upcomingAppointments: [],
    },
    {
      id: 3,
      name: "Emma Davis",
      phone: "+966555123456",
      email: "emma.davis@email.com",
      address: "789 Commercial Street, Dammam",
      dateOfBirth: "1992-11-08",
      lastVisit: "2024-01-10",
      totalVisits: 5,
      status: "active",
      notes: "First-time patient, nervous about dental procedures",
      treatments: ["Dental Cleaning", "Teeth Whitening"],
      upcomingAppointments: [
        {
          date: "2025-02-05",
          time: "2:30 PM",
          treatment: "Check-up",
          doctor: "Dr. Sarah",
        },
      ],
    },
    {
      id: 4,
      name: "محمد الرشيد",
      phone: "+966556789012",
      email: "mohammed.rashid@email.com",
      address: "321 Business District, Riyadh",
      dateOfBirth: "1970-04-14",
      lastVisit: "2023-12-15",
      totalVisits: 15,
      status: "inactive",
      notes: "VIP patient, owns multiple businesses",
      treatments: ["Dental Implants", "Crown Placement", "Gum Treatment"],
      upcomingAppointments: [],
    },
    {
      id: 5,
      name: "Lisa Anderson",
      phone: "+966551234567",
      email: "lisa.anderson@email.com",
      address: "654 Residential Area, Al Khobar",
      dateOfBirth: "1988-09-30",
      lastVisit: "2024-01-25",
      totalVisits: 7,
      status: "active",
      notes: "Prefers afternoon appointments, insurance covered",
      treatments: ["Regular Checkup", "Cavity Filling"],
      upcomingAppointments: [
        {
          date: "2025-01-28",
          time: "3:00 PM",
          treatment: "Cleaning",
          doctor: "Dr. Ahmed",
        },
      ],
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    switch (searchType) {
      case "name":
        return patient.name.toLowerCase().includes(searchLower);
      case "phone":
        return patient.phone.includes(searchTerm);
      case "email":
        return patient.email.toLowerCase().includes(searchLower);
      default:
        return (
          patient.name.toLowerCase().includes(searchLower) ||
          patient.phone.includes(searchTerm) ||
          patient.email.toLowerCase().includes(searchLower)
        );
    }
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">محظور</Badge>;
      default:
        return <Badge variant="secondary">غير معروف</Badge>;
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const stats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Active",
      value: patients.filter((p) => p.status === "active").length,
      icon: User,
      color: "text-green-600",
    },
    {
      label: "Recent Visits",
      value: patients.filter(
        (p) =>
          new Date(p.lastVisit) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length,
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Patient Search
            </h1>
            <p className="text-slate-600">
              Find patients by name, phone, or email
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-md bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Section */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                البحث عن المرضى
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Search Input */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="البحث عن المرضى..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-2 border-slate-200 focus:border-primary rounded-xl"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-12"
                    >
                      <Filter className="w-4 h-4" />
                      {searchType === "all"
                        ? "جميع الحقول"
                        : searchType.charAt(0).toUpperCase() +
                          searchType.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSearchType("all")}>
                      جميع الحقول
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchType("name")}>
                      الاسم فقط
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchType("phone")}>
                      الهاتف فقط
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSearchType("email")}>
                      البريد الإلكتروني فقط
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Results */}
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer ${
                      selectedPatient?.id === patient.id
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-slate-800">
                              {patient.name}
                            </h3>
                            {getStatusBadge(patient.status)}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {patient.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Last visit: {patient.lastVisit}
                            </div>
                            <div className="flex items-center gap-1">
                              <History className="w-3 h-3" />
                              {patient.totalVisits} visits
                            </div>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" size="sm" className="p-2">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CalendarPlus className="w-4 ه-4 mr-2" />
                            جدولة موعد
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="w-4 h-4 mr-2" />
                            عرض التاريخ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                {filteredPatients.length === 0 && searchTerm && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      لم يتم العثور على مرضى
                    </h3>
                    <p className="text-slate-500">
                      جرّب تعديل شروط البحث أو المرشحات
                    </p>
                  </div>
                )}

                {!searchTerm && (
                  <div className="text-center py-12 text-slate-500">
                    <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p>ابدأ بالكتابة للبحث عن المرضى</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Details */}
        <div>
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                تفاصيل المريض
              </CardTitle>
            </CardHeader>

            <CardContent>
              {selectedPatient ? (
                <div className="space-y-6">
                  {/* Patient Header */}
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl font-bold">
                        {selectedPatient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-800">
                      {selectedPatient.name}
                    </h3>
                    <p className="text-slate-600">
                      العمر: {calculateAge(selectedPatient.dateOfBirth)} سنة
                    </p>
                    {getStatusBadge(selectedPatient.status)}
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      معلومات الاتصال
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">الهاتف:</span>
                        <span className="font-medium">
                          {selectedPatient.phone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">
                          البريد الإلكتروني:
                        </span>
                        <span className="font-medium text-xs">
                          {selectedPatient.email}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-slate-600">العنوان:</span>
                        <span className="font-medium text-xs text-right flex-1 ml-2">
                          {selectedPatient.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Visit Information */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <History className="w-4 h-4" />
                      تاريخ الزيارات
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">آخر زيارة:</span>
                        <span className="font-medium">
                          {selectedPatient.lastVisit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">إجمالي الزيارات:</span>
                        <span className="font-medium">
                          {selectedPatient.totalVisits}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Treatments */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">
                      العلاجات السابقة
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPatient.treatments.map((treatment, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {treatment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Appointments */}
                  {selectedPatient.upcomingAppointments.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Upcoming Appointments
                        </h4>
                        <div className="space-y-2">
                          {selectedPatient.upcomingAppointments.map(
                            (apt, index) => (
                              <div
                                key={index}
                                className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                              >
                                <div className="text-sm">
                                  <div className="font-semibold text-blue-800">
                                    {apt.treatment}
                                  </div>
                                  <div className="text-blue-600">
                                    {apt.date} at {apt.time}
                                  </div>
                                  <div className="text-blue-500">
                                    with {apt.doctor}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Notes */}
                  {selectedPatient.notes && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">
                          ملاحظات
                        </h4>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                          {selectedPatient.notes}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full">
                      <CalendarPlus className="w-4 h-4 mr-2" />
                      جدولة موعد
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      تعديل المريض
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <User className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p>Select a patient to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
