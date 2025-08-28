import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import useAppointmentStore from "@/stores/appointmentStore";

export default function AppointmentForm() {
  const {
    selectedDate,
    selectedTime,
    selectedPatient,
    selectedDoctor,
    treatment,
    notes,
    patientSearch,
    isSubmitting,
    doctors,
    treatments,
    timeSlots,
    setSelectedDate,
    setSelectedTime,
    setSelectedPatient,
    setSelectedDoctor,
    setTreatment,
    setNotes,
    setPatientSearch,
    getFilteredPatients,
    submitAppointment,
  } = useAppointmentStore();

  const filteredPatients = getFilteredPatients();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitAppointment();
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
            <CalendarPlus className="w-5 h-5 text-sky-600" />
          </div>
          حجز موعد جديد
        </CardTitle>
        <p className="text-slate-600 text-sm">
          املأ البيانات التالية لحجز موعد للمريض
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Search */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <User className="w-4 h-4 text-sky-600" />
              المريض *
            </Label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ابحث عن مريض بالاسم أو رقم الهاتف..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="pr-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
            {patientSearch && (
              <Card className="max-h-60 overflow-y-auto border border-slate-200">
                <CardContent className="p-0">
                  {filteredPatients.map((patient, index) => (
                    <div key={patient.id}>
                      <div
                        onClick={() => {
                          setSelectedPatient(patient.id.toString());
                          setPatientSearch(patient.name);
                        }}
                        className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                          selectedPatient === patient.id.toString()
                            ? "bg-sky-50 border-r-4 border-sky-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">
                              {patient.name}
                            </p>
                            <p className="text-sm text-slate-600 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {patient.phone}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            آخر زيارة: {patient.lastVisit}
                          </Badge>
                        </div>
                      </div>
                      {index < filteredPatients.length - 1 && <Separator />}
                    </div>
                  ))}
                  {filteredPatients.length === 0 && (
                    <div className="p-4 text-center text-slate-500">
                      لا يوجد مريض بهذا الاسم
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CalendarIcon className="w-4 h-4 text-sky-600" />
                التاريخ *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-right bg-slate-50 border-slate-200 hover:bg-white"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4 text-slate-400" />
                    {selectedDate
                      ? format(selectedDate, "PPP")
                      : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4 text-sky-600" />
                الوقت *
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                  <SelectValue placeholder="اختر الوقت" />
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
          </div>

          {/* Doctor and Treatment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                الطبيب *
              </Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                  <SelectValue placeholder="اختر الطبيب" />
                </SelectTrigger>
                <SelectContent>
                  {doctors
                    .filter((doc) => doc.available)
                    .map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            متاح
                          </Badge>
                          {doctor.name} - {doctor.specialization}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <UserCheck className="w-4 h-4 text-sky-600" />
                نوع العلاج *
              </Label>
              <Select value={treatment} onValueChange={setTreatment}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
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
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="w-4 h-4 text-sky-600" />
              ملاحظات إضافية
            </Label>
            <Textarea
              placeholder="أضف ملاحظات حول الموعد أو حالة المريض..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 ml-2" />
                حجز الموعد
              </>
            )}
          </Button>
        </form>{" "}
      </CardContent>
    </Card>
  );
}
