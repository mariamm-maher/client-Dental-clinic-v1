import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuthStore } from "@/stores";
import { navigateByRole } from "@/lib/utils";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  LogIn,
} from "lucide-react";

// Google OAuth configuration - moved outside component to prevent re-renders
const GOOGLE_CLIENT_ID =
  "1046697718146-en8fc55dv382vsgtclvv3pgrco16oj3f.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:4000/api/auth/google/callback";
const GOOGLE_SCOPE = "openid email profile";

// Construct Google OAuth URL for login
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  GOOGLE_REDIRECT_URI
)}&response_type=code&scope=${encodeURIComponent(
  GOOGLE_SCOPE
)}&access_type=offline&prompt=consent`;

export default function Login() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn({
        email: formData.email,
        password: formData.password,
      });
      if (result?.success) {
        toast.success("تم تسجيل الدخول بنجاح");

        // Role-based navigation using utility function
        const { role } = result.data;
        navigateByRole(navigate, role);
      }
    } catch (error) {
      if (error.details && Array.isArray(error.details)) {
        const errorList = error.details.map(
          (detail) => detail.message || detail
        );
        const formattedErrors = errorList.map((err) => `• ${err}`).join("\n");
        toast.error(
          <div>
            <div className="whitespace-pre-line text-sm">{formattedErrors}</div>
          </div>,
          {
            duration: 6000,
            style: {
              minWidth: "350px",
              maxWidth: "500px",
            },
          }
        );
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("بيانات اعتماد غير صحيحة");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            عيادة الشفاء
          </h1>
        </div>

        <Card className="shadow-xl border border-slate-200 bg-white rounded-2xl">
          {" "}
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">
              أهلاً بعودتك
            </CardTitle>
            <p className="text-slate-600">يرجى إدخال بيانات الدخول</p>
          </CardHeader>{" "}
          <CardContent className="space-y-6">
            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-11 border-slate-300 hover:bg-orange-50 hover:border-orange-300 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              المتابعة عبر Google
            </Button>{" "}
            {/* Divider */}
            <div className="relative">
              <Separator className="bg-slate-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-slate-500">أو المتابعة عبر</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                {" "}
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11 pl-10 border-slate-300 focus:border-orange-400 focus:ring-orange-400 rounded-xl"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              {/* Password Field */}
              <div className="space-y-2">
                {" "}
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className="h-11 pl-10 pr-10 border-slate-300 focus:border-orange-400 focus:ring-orange-400 rounded-xl"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked)
                    }
                  />{" "}
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-slate-700"
                  >
                    تذكرني
                  </Label>{" "}
                </div>{" "}
                <Link
                  to="/forget-password"
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              {/* Submit Button */}{" "}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    تسجيل الدخول
                  </>
                )}
              </Button>
            </form>{" "}
            {/* Navigation Links */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="text-center text-sm">
                <span className="text-slate-600">ليس لديك حساب؟ </span>
                <Link
                  to="/register"
                  className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
                >
                  أنشئ حسابًا جديدًا
                </Link>
              </div>
            </div>{" "}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
