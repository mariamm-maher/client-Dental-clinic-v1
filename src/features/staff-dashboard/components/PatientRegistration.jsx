import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  UserPlus,
  Phone,
  User,
  Check,
  AlertCircle,
  Users,
  Calendar,
  Clock,
} from "lucide-react";

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentPatients, setRecentPatients] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      phone: "+966501234567",
      registeredAt: "10:30 AM",
    },
    {
      id: 2,
      name: "Sara Al-Rashid",
      phone: "+966509876543",
      registeredAt: "11:45 AM",
    },
    {
      id: 3,
      name: "محمد العلي",
      phone: "+966555123456",
      registeredAt: "02:15 PM",
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("يرجى تعبئة الاسم ورقم الهاتف");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("يرجى إدخال رقم هاتف صالح");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPatient = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        registeredAt: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setRecentPatients((prev) => [newPatient, ...prev.slice(0, 4)]);
      setFormData({ name: "", phone: "" });
      toast.success(`تم تسجيل المريض ${formData.name} بنجاح!`);
    } catch {
      toast.error("فشل في تسجيل المريض. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    {
      label: "تسجيلات اليوم",
      value: 8,
      icon: Users,
      color: "text-teal-600",
    },
    { label: "هذا الأسبوع", value: 47, icon: Calendar, color: "text-blue-600" },
    {
      label: "متوسط الوقت",
      value: "< 2 د",
      icon: Clock,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              تسجيل سريع للمريض
            </h1>
            <p className="text-slate-600">
              تسجيل المرضى الجدد بالاسم ورقم الهاتف فقط
            </p>
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
        {/* Registration Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    تسجيل مريض جديد
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    املأ المعلومات الأساسية للمريض
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Name */}
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    الاسم الكامل للمريض
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل الاسم الكامل للمريض"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 text-base border-2 border-slate-200 focus:border-primary rounded-xl"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+966 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 text-base border-2 border-slate-200 focus:border-primary rounded-xl"
                    required
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
                      <span>جاري التسجيل...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5" />
                      <span>تسجيل المريض</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">تسجيل سريع</p>
                    <p>
                      هذا النموذج يسجل المرضى بمعلومات الاتصال الأساسية فقط.
                      يمكن تحديث الملفات الشخصية الكاملة أثناء الزيارة الأولى.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Registrations */}
        <div>
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            {" "}
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                التسجيلات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">
                      {patient.name}
                    </p>
                    <p className="text-xs text-slate-600">{patient.phone}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {patient.registeredAt}
                    </Badge>
                  </div>
                </div>
              ))}{" "}
              {recentPatients.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>لا توجد تسجيلات حديثة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
