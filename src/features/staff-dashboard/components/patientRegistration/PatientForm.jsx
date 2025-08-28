import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Phone, User, Check, AlertCircle } from "lucide-react";
import usePatientStore from "@/stores/patientStore";

export default function PatientForm() {
  const { formData, isSubmitting, setFormData, submitPatient } =
    usePatientStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPatient();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl text-gray-900">تسجيل مريض جديد</h2>
            <p className="text-sm text-gray-600 font-normal">
              املأ المعلومات الأساسية للمريض
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <User className="w-4 h-4 text-sky-600" />
              الاسم الكامل للمريض
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="أدخل الاسم الكامل للمريض"
              value={formData.name}
              onChange={(e) => setFormData("name", e.target.value)}
              className="h-12 text-right bg-white/80 border-gray-200 focus:border-sky-500 focus:ring-sky-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+966 50 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData("phone", e.target.value)}
              className="h-12 text-right bg-white/80 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>جاري التسجيل...</span>
              </div>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>تسجيل المريض</span>
              </>
            )}
          </Button>
        </form>

        {/* Info Note */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">تسجيل سريع</p>
              <p>
                هذا النموذج يسجل المرضى بمعلومات الاتصال الأساسية فقط. يمكن
                تحديث الملفات الشخصية الكاملة أثناء الزيارة الأولى.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
