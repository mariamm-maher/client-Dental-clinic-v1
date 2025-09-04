import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "أحمد محمد",
    email: user?.email || "ahmed.mohamed@clinic.com",
    phone: "0123456789",
    address: "الرياض، المملكة العربية السعودية",
    bio: "موظف استقبال بخبرة 3 سنوات في إدارة المواعيد والخدمات الطبية",
    profileImage: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validate password fields if password section is shown
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        toast.error("يرجى إدخال كلمة المرور الحالية");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("كلمة المرور الجديدة غير متطابقة");
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error("كلمة المرور يجب أن تكون أكثر من 6 أحرف");
        return;
      }
    }

    // Here you would typically call an API to update the profile
    console.log("Saving profile:", formData);
    toast.success("تم حفظ الملف الشخصي بنجاح");
    setIsEditing(false);
    setShowPasswordSection(false);
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowPasswordSection(false);
    setPreviewImage(null);
    // Reset form data to original values
    setFormData({
      name: user?.name || "أحمد محمد",
      email: user?.email || "ahmed.mohamed@clinic.com",
      phone: "0123456789",
      address: "الرياض، المملكة العربية السعودية",
      bio: "موظف استقبال بخبرة 3 سنوات في إدارة المواعيد والخدمات الطبية",
      profileImage: null,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit3 className="w-4 h-4 ml-2" />
              تعديل الملف
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="hover:bg-slate-50"
              >
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={previewImage} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                        {formData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 cursor-pointer">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {formData.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    <Shield className="w-3 h-3 ml-1" />
                    موظف استقبال
                  </Badge>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>انضم في يناير 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <User className="w-5 h-5 text-blue-600" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
