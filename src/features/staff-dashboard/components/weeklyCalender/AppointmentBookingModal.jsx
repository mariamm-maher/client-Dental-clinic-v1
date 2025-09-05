import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  User,
  Phone,
  Search,
  UserCheck,
  FileText,
  Check,
  Loader2,
  X,
} from "lucide-react";
import useSettingsStore from "@/stores/settingsStore";

export default function AppointmentBookingModal({
  isOpen,
  onClose,
  selectedDate,
  onSubmit,
}) {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  // Get weekly schedule for time validation
  const { weeklySchedule } = useSettingsStore();

  // Mock services - replace with actual data
  const services = ["استشارة ", "كشف"];

  // Mock patient search function
  const searchPatients = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setShowSearchResults(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          _id: "1",
          generalInfo: {
            name: "أحمد محمد علي",
            phone: "01234567890",
          },
        },
        {
          _id: "2",
          generalInfo: {
            name: "فاطمة أحمد",
            phone: "01987654321",
          },
        },
      ].filter(
        (patient) =>
          patient.generalInfo.name.includes(query) ||
          patient.generalInfo.phone.includes(query)
      );

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  // Time validation function
  const isTimeWithinWorkingHours = (
    selectedDate,
    selectedTime,
    weeklySchedule
  ) => {
    if (!selectedDate || !selectedTime || !weeklySchedule) return true;

    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayName = dayNames[selectedDate.getDay()];
    const daySchedule = weeklySchedule.find((d) => d.day === dayName);

    if (!daySchedule || !Array.isArray(daySchedule.shifts)) return false;

    // Parse selected time
    let [hour, minPeriod] = selectedTime.split(":");
    let [minute, period] = minPeriod.split(" ");
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);

    if (period === "م" && hour !== 12) hour += 12;
    if (period === "ص" && hour === 12) hour = 0;

    // Check if within any enabled shift
    return daySchedule.shifts.some((shift) => {
      if (!shift.enabled) return false;
      const start = shift.startHour * 60 + shift.startMinute;
      const end = shift.endHour * 60 + shift.endMinute;
      const selected = hour * 60 + minute;
      return selected >= start && selected < end;
    });
  };

  // Handle patient search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPatients(patientSearch);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [patientSearch]);

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient._id);
    setPatientSearch(patient.generalInfo?.name || patient.name);
    setShowSearchResults(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedTime || !service) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        patientId: selectedPatient,
        time: selectedTime,
        service,
        notes,
        date: selectedDate,
      });

      // Reset form
      setPatientSearch("");
      setSelectedPatient(null);
      setSelectedTime("");
      setService("");
      setNotes("");
      onClose();
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setPatientSearch("");
    setSelectedPatient(null);
    setSelectedTime("");
    setService("");
    setNotes("");
    setSearchResults([]);
    setShowSearchResults(false);
    onClose();
  };

  const isValidTime =
    !selectedTime ||
    isTimeWithinWorkingHours(selectedDate, selectedTime, weeklySchedule);
  const canSubmit = selectedPatient && selectedTime && service && isValidTime;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
            حجز موعد جديد
          </DialogTitle>
          <p className="text-slate-600 text-sm">
            املأ البيانات التالية لحجز موعد للمريض
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Search */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <User className="w-4 h-4 text-sky-600" />
              المريض *
            </Label>
            <div className="relative">
              {isSearching ? (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              )}
              <Input
                placeholder="ابحث عن مريض بالاسم أو رقم الهاتف..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="pr-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>

            {patientSearch && showSearchResults && (
              <Card className="max-h-60 overflow-y-auto border border-slate-200 shadow-lg">
                <CardContent className="p-0">
                  {isSearching ? (
                    <div className="p-6 text-center text-slate-500">
                      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm">جاري البحث عن المرضى...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-56 overflow-y-auto">
                      {searchResults.map((patient, index) => (
                        <div key={patient._id}>
                          <div
                            onClick={() => handleSelectPatient(patient)}
                            className={`p-4 cursor-pointer hover:bg-slate-50 transition-all duration-200 ${
                              selectedPatient === patient._id
                                ? "bg-sky-50 border-r-4 border-sky-500"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-sky-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {patient.generalInfo?.name || patient.name}
                                  </p>
                                  <p className="text-sm text-slate-600 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {patient.generalInfo?.phone ||
                                      patient.phone}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200"
                              >
                                مريض موجود
                              </Badge>
                            </div>
                          </div>
                          {index < searchResults.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-500">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="font-medium mb-1">
                        لا يوجد مريض بهذا الاسم
                      </p>
                      <p className="text-sm">
                        جرب البحث برقم الهاتف أو تأكد من الاسم
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock className="w-4 h-4 text-sky-600" />
              الوقت *
            </Label>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-end">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 mb-1">الساعة</span>
                  <Select
                    value={selectedTime ? selectedTime.split(":")[0] : ""}
                    onValueChange={(hour) => {
                      let min = selectedTime
                        ? selectedTime.split(":")[1]
                        : "00 ص";
                      setSelectedTime(`${hour}:${min}`);
                    }}
                  >
                    <SelectTrigger className="w-28 min-w-[6.5rem] h-10 text-sm">
                      <SelectValue placeholder="الساعة" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[90px]">
                      {[...Array(12)].map((_, i) => (
                        <SelectItem
                          key={i + 1}
                          value={String(i + 1).padStart(2, "0")}
                          className="min-w-[7.5rem] text-right"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 mb-1">الدقيقة</span>
                  <Select
                    value={
                      selectedTime
                        ? selectedTime.split(":")[1]?.split(" ")[0]
                        : ""
                    }
                    onValueChange={(minute) => {
                      let hour = selectedTime
                        ? selectedTime.split(":")[0]
                        : "08";
                      let period = selectedTime
                        ? selectedTime.split(" ")[1]
                        : "ص";
                      setSelectedTime(`${hour}:${minute} ${period}`);
                    }}
                  >
                    <SelectTrigger className="w-24 min-w-[5.5rem] h-10 text-sm">
                      <SelectValue placeholder="الدقيقة" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[70px]">
                      {["00", "15", "30", "45"].map((min) => (
                        <SelectItem
                          key={min}
                          value={min}
                          className="min-w-[6.5rem] text-right"
                        >
                          {min}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 mb-1">الفترة</span>
                  <Select
                    value={selectedTime ? selectedTime.split(" ")[1] : "ص"}
                    onValueChange={(period) => {
                      let [hour, min] = selectedTime
                        ? selectedTime.split(":")
                        : ["08", "00 ص"];
                      min = min.split(" ")[0];
                      setSelectedTime(`${hour}:${min} ${period}`);
                    }}
                  >
                    <SelectTrigger className="w-36 min-w-[8.5rem] h-10 text-sm">
                      <SelectValue placeholder="الفترة" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[120px]">
                      <SelectItem
                        value="ص"
                        className="min-w-[9.5rem] text-right"
                      >
                        صباحاً
                      </SelectItem>
                      <SelectItem
                        value="م"
                        className="min-w-[9.5rem] text-right"
                      >
                        مساءً
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Time validation error */}
              {selectedTime && !isValidTime && (
                <div className="text-xs text-red-600 mt-1 font-semibold">
                  اختر الوقت ضمن أوقات عمل العيادة لهذا اليوم.
                </div>
              )}

              <div className="text-xs text-slate-500 mt-1">
                اختر الوقت يدوياً ضمن أوقات عمل العيادة لهذا اليوم.
              </div>
            </div>

            {/* Time preview */}
            {selectedTime && isValidTime && (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 mt-2">
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <Clock className="w-4 h-4" />
                  <span>الموعد المحدد: {selectedTime}</span>
                </div>
              </div>
            )}
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <UserCheck className="w-4 h-4 text-sky-600" />
              نوع الخدمة *
            </Label>

            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {services.map((serviceType) => (
                <Button
                  key={serviceType}
                  type="button"
                  variant={service === serviceType ? "default" : "outline"}
                  size="sm"
                  onClick={() => setService(serviceType)}
                  className="h-12 text-sm justify-start"
                >
                  {serviceType}
                </Button>
              ))}
            </div>

            {/* Service preview */}
            {service && (
              <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                <div className="flex items-center gap-2 text-sm text-violet-700">
                  <UserCheck className="w-4 h-4" />
                  <span>الخدمة المحددة: {service}</span>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="w-4 h-4 text-sky-600" />
              ملاحظات إضافية
            </Label>
            <Textarea
              placeholder="أضف ملاحظات حول الموعد أو حالة المريض... (اختياري)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white resize-none"
            />
          </div>

          {/* Summary Section */}
          {(selectedPatient || selectedTime || service) && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  ملخص الموعد
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  مراجعة تفاصيل الموعد قبل التأكيد
                </p>
              </div>

              <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    {selectedPatient && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">المريض</p>
                          <p className="font-medium">{patientSearch}</p>
                        </div>
                      </div>
                    )}

                    {selectedTime && isValidTime && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">الوقت</p>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                      </div>
                    )}

                    {service && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">الخدمة</p>
                          <p className="font-medium">{service}</p>
                        </div>
                      </div>
                    )}

                    {notes && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">ملاحظات</p>
                          <p className="font-medium text-sm">{notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer Buttons */}
          <Separator />
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 ml-2" />
                  تأكيد الموعد
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 text-slate-700 border-slate-300 hover:bg-slate-50"
              onClick={handleClose}
            >
              <X className="w-5 h-5 ml-2" />
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
