import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CalendarPlus,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Stethoscope,
  FileText,
  Check,
  Search,
  UserCheck,
} from "lucide-react";
import { format } from "date-fns";

export default function AppointmentScheduling() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+966501234567",
      lastVisit: "2024-01-15",
    },
    {
      id: 2,
      name: "أحمد محمد العلي",
      phone: "+966509876543",
      lastVisit: "2024-01-20",
    },
    {
      id: 3,
      name: "Emma Davis",
      phone: "+966555123456",
      lastVisit: "2024-01-10",
    },
    {
      id: 4,
      name: "محمد الرشيد",
      phone: "+966556789012",
      lastVisit: "2024-01-18",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      phone: "+966551234567",
      lastVisit: "2024-01-22",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Ahmed Al-Rashid",
      specialization: "General Dentistry",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      specialization: "Orthodontics",
      available: true,
    },
    {
      id: 3,
      name: "Dr. Mohammed Hassan",
      specialization: "Oral Surgery",
      available: false,
    },
  ];

  const treatments = [
    "Dental Cleaning",
    "Root Canal",
    "Teeth Whitening",
    "Dental Implant",
    "Cavity Filling",
    "Orthodontic Consultation",
    "Wisdom Tooth Extraction",
    "Crown Placement",
    "Gum Treatment",
    "Dental X-Ray",
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.phone.includes(patientSearch)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selectedTime ||
      !selectedPatient ||
      !selectedDoctor ||
      !treatment
    ) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const patient = patients.find((p) => p.id.toString() === selectedPatient);
      const doctor = doctors.find((d) => d.id.toString() === selectedDoctor);

      toast.success(
        `تم جدولة موعد لـ ${patient?.name} مع ${doctor?.name} في ${format(
          selectedDate,
          "PPP"
        )} عند ${selectedTime}`
      );

      // Reset form
      setSelectedDate(null);
      setSelectedTime("");
      setSelectedPatient("");
      setSelectedDoctor("");
      setTreatment("");
      setNotes("");
      setPatientSearch("");
    } catch (error) {
      toast.error("فشل جدولة الموعد. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    {
      label: "حجوزات اليوم",
      value: 12,
      icon: CalendarIcon,
      color: "text-blue-600",
    },
    {
      label: "المواعيد المتاحة",
      value: 8,
      icon: Clock,
      color: "text-green-600",
    },
    {
      label: "الأطباء المتاحون",
      value: 2,
      icon: Stethoscope,
      color: "text-teal-600",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <CalendarPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Schedule Appointment
            </h1>
            <p className="text-slate-600">Book new appointments for patients</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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
        {/* Appointment Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <CalendarPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    New Appointment
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    Fill in appointment details
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    اختر المريض *
                  </Label>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="البحث عن المرضى بالاسم أو الهاتف..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="pl-10 h-12 border-2 border-slate-200 focus:border-primary rounded-xl"
                    />
                  </div>

                  {patientSearch && (
                    <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg bg-white">
                      {filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          onClick={() => {
                            setSelectedPatient(patient.id.toString());
                            setPatientSearch(patient.name);
                          }}
                          className={`p-3 cursor-pointer hover:bg-secondary/50 border-b last:border-b-0 ${
                            selectedPatient === patient.id.toString()
                              ? "bg-secondary/30"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-slate-800">
                                {patient.name}
                              </p>
                              <p className="text-sm text-slate-600">
                                {patient.phone}
                              </p>
                            </div>
                            <div className="text-xs text-slate-500">
                              آخر زيارة: {patient.lastVisit}
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredPatients.length === 0 && (
                        <div className="p-4 text-center text-slate-500">
                          لم يتم العثور على مرضى
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    اختر التاريخ *
                  </Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full h-12 justify-start text-left font-normal border-2 border-slate-200 rounded-xl ${
                          !selectedDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "اختر تاريخاً"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() ||
                          date.getDay() === 5 ||
                          date.getDay() === 6
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Time Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      اختر الوقت *
                    </Label>

                    <Select
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-primary rounded-xl">
                        <SelectValue placeholder="اختر فترة زمنية" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Doctor Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      اختر الطبيب *
                    </Label>

                    <Select
                      value={selectedDoctor}
                      onValueChange={setSelectedDoctor}
                    >
                      <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-primary rounded-xl">
                        <SelectValue placeholder="اختر طبيباً" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors
                          .filter((doc) => doc.available)
                          .map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id.toString()}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{doctor.name}</span>
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  {doctor.specialization}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Treatment Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    نوع العلاج *
                  </Label>

                  <Select value={treatment} onValueChange={setTreatment}>
                    <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-primary rounded-xl">
                      <SelectValue placeholder="اختر نوع العلاج" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatments.map((treatmentType) => (
                        <SelectItem key={treatmentType} value={treatmentType}>
                          {treatmentType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    ملاحظات (اختياري)
                  </Label>

                  <Textarea
                    placeholder="أضف أي ملاحظات إضافية للموعد..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-20 border-2 border-slate-200 focus:border-primary rounded-xl"
                  />
                </div>

                <Separator className="my-6" />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري جدولة الموعد...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5" />
                      <span>جدولة الموعد</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule Preview */}
        <div>
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Mock today's appointments */}
              {[
                {
                  time: "09:00 AM",
                  patient: "Sarah Johnson",
                  doctor: "Dr. Ahmed",
                },
                { time: "09:30 AM", patient: "أحمد محمد", doctor: "Dr. Sarah" },
                {
                  time: "10:00 AM",
                  patient: "Emma Davis",
                  doctor: "Dr. Ahmed",
                },
                {
                  time: "11:30 AM",
                  patient: "Available",
                  doctor: "-",
                  isAvailable: true,
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    appointment.isAvailable
                      ? "bg-green-50 border border-green-200"
                      : "bg-secondary/30"
                  }`}
                >
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        appointment.isAvailable
                          ? "text-green-700"
                          : "text-slate-800"
                      }`}
                    >
                      {appointment.time}
                    </p>
                    <p
                      className={`text-xs ${
                        appointment.isAvailable
                          ? "text-green-600"
                          : "text-slate-600"
                      }`}
                    >
                      {appointment.patient}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        appointment.isAvailable ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {appointment.doctor}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Doctors */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                Available Doctors
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    doctor.available
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        doctor.available ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {doctor.name}
                    </p>
                    <p
                      className={`text-xs ${
                        doctor.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {doctor.specialization}
                    </p>
                  </div>
                  <Badge
                    variant={doctor.available ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {doctor.available ? "Available" : "Busy"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
