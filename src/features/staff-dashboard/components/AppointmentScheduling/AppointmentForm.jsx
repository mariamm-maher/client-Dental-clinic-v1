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
import { format, addDays, isToday, isTomorrow, isWeekend } from "date-fns";
import { ar } from "date-fns/locale";
import useAppointmentStore from "@/stores/appointmentStore";

export default function AppointmentForm() {
  const {
    selectedDate,
    selectedTime,
    selectedPatient,
    service,
    notes,
    patientSearch,
    isSubmitting,
    services,
    timeSlots,
    searchResults,
    isSearching,
    showSearchResults,
    setSelectedDate,
    setSelectedTime,
    setService,
    setNotes,
    setPatientSearch,
    selectPatient,
    submitAppointment,
    cancelAppointmentForm,
  } = useAppointmentStore();
  const filteredPatients = searchResults;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitAppointment();
  };

  const handleSelectPatient = (patient) => {
    selectPatient(patient);
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
            </Label>{" "}
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
            </div>{" "}
            {patientSearch && showSearchResults && (
              <Card className="max-h-60 overflow-y-auto border border-slate-200 shadow-lg">
                <CardContent className="p-0">
                  {isSearching ? (
                    <div className="p-6 text-center text-slate-500">
                      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm">جاري البحث عن المرضى...</p>
                    </div>
                  ) : filteredPatients.length > 0 ? (
                    <div className="max-h-56 overflow-y-auto">
                      {filteredPatients.map((patient, index) => (
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
                          {index < filteredPatients.length - 1 && <Separator />}
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
          </div>{" "}
          {/* Date and Time Selection */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                تحديد الموعد
              </h3>
              <p className="text-sm text-slate-600">
                اختر التاريخ والوقت المناسب للمريض
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CalendarIcon className="w-4 h-4 text-sky-600" />
                  التاريخ *
                </Label>

                {/* Quick Date Options */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button
                    type="button"
                    variant={
                      selectedDate && isToday(selectedDate)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                    className="h-10 text-sm"
                  >
                    اليوم
                  </Button>
                  <Button
                    type="button"
                    variant={
                      selectedDate && isTomorrow(selectedDate)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedDate(addDays(new Date(), 1))}
                    className="h-10 text-sm"
                  >
                    غداً
                  </Button>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-between text-right bg-slate-50 border-slate-200 hover:bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                        {selectedDate ? (
                          <div className="text-right">
                            <div className="font-medium">
                              {format(selectedDate, "EEEE", { locale: ar })}
                            </div>
                            <div className="text-sm text-slate-500">
                              {format(selectedDate, "dd MMMM yyyy", {
                                locale: ar,
                              })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500">اختر التاريخ</span>
                        )}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || isWeekend(date);
                      }}
                      initialFocus
                      locale={ar}
                    />
                  </PopoverContent>
                </Popover>

                {selectedDate && (
                  <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                    <div className="flex items-center gap-2 text-sm text-sky-700">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {isToday(selectedDate) && "اليوم - "}
                        {isTomorrow(selectedDate) && "غداً - "}
                        {format(selectedDate, "EEEE، dd MMMM yyyy", {
                          locale: ar,
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-sky-600" />
                  الوقت *
                </Label>

                {/* Time Slots Grid */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      الفترة الصباحية
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots
                        .filter((time) => time.includes("ص"))
                        .map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="h-10 text-sm"
                          >
                            {time}
                          </Button>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      الفترة المسائية
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots
                        .filter((time) => time.includes("م"))
                        .map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="h-10 text-sm"
                          >
                            {time}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                {selectedTime && (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <Clock className="w-4 h-4" />
                      <span>الموعد المحدد: {selectedTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
          {/* Service Selection */}
          <div className="space-y-6">
            {" "}
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                تفاصيل الخدمة
              </h3>
              <p className="text-sm text-slate-600">اختر نوع الخدمة المطلوبة</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {" "}
              {/* Service Selection */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  نوع الخدمة *
                </Label>

                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
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

                {service && (
                  <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                    <div className="flex items-center gap-2 text-sm text-violet-700">
                      <UserCheck className="w-4 h-4" />
                      <span>الخدمة المحددة: {service}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
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
          </div>{" "}
          {/* Appointment Summary */}
          {(selectedPatient || selectedDate || selectedTime || service) && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  ملخص الموعد
                </h3>
                <p className="text-sm text-slate-600">
                  مراجعة تفاصيل الموعد قبل التأكيد
                </p>
              </div>

              <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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

                      {selectedDate && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">التاريخ</p>
                            <p className="font-medium">
                              {format(selectedDate, "EEEE، dd MMMM yyyy", {
                                locale: ar,
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedTime && (
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
                    </div>{" "}
                    <div className="space-y-4">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Submit & Cancel Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
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
                  حجز الموعد
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 text-sky-700 border-sky-300 hover:bg-sky-50"
              onClick={cancelAppointmentForm}
            >
              إلغاء النموذج
            </Button>
          </div>
        </form>{" "}
      </CardContent>
    </Card>
  );
}
