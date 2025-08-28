import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import useAuthStore from "@/stores/authStore";
import {
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirmPasswordReset = useAuthStore(
    (state) => state.confirmPasswordReset
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("رمز التحقق غير صالح أو مفقود");
    }
  }, [token]);

  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.length = "يجب أن تكون كلمة المرور 8 أحرف على الأقل";
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.lowercase = "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل";
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.uppercase = "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل";
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.number = "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل";
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.special =
        "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (@$!%*?&)";
    }

    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword) {
      const errors = validatePassword(newPassword);
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords
    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setError("يرجى استيفاء متطلبات كلمة المرور");
      setValidationErrors(passwordErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await confirmPasswordReset(token, password);

      if (result.success) {
        setIsSuccess(true);
        toast.success(result.message || "تم إعادة تعيين كلمة المرور بنجاح");
      } else {
        setError(result.error || "فشل إعادة تعيين كلمة المرور");
        toast.error(result.error || "فشل إعادة تعيين كلمة المرور");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      const errorMessage = err.error || "حدث خطأ. يرجى المحاولة مرة أخرى";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Success state
  if (isSuccess) {
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
            <p className="text-slate-600">رعاية صحية احترافية</p>
          </div>

          <Card className="shadow-xl border-0 bg-white rounded-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800 font-bold">
                تم إعادة تعيين كلمة المرور بنجاح
              </CardTitle>
              <p className="text-slate-600 mt-2">تم تحديث كلمة المرور الخاصة بك. يمكنك الآن تسجيل الدخول.</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                type="button"
                onClick={handleBackToLogin}
                className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                العودة إلى تسجيل الدخول
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!token) {
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
            <p className="text-slate-600">رعاية صحية احترافية</p>
          </div>

          <Card className="shadow-xl border-0 bg-white rounded-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-2xl text-slate-800 font-bold">
                رابط إعادة التعيين غير صالح
              </CardTitle>
              <p className="text-slate-600 mt-2">قد تكون صلاحية الرابط انتهت أو تم استخدامه من قبل. يرجى طلب رابط جديد.</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Link to="/forget-password">
                <Button
                  type="button"
                  className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl"
                >
                  طلب رابط إعادة تعيين جديد
                </Button>
              </Link>

              <Button
                type="button"
                variant="outline"
                onClick={handleBackToLogin}
                className="w-full h-12 border-slate-300 hover:bg-orange-50 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                العودة إلى تسجيل الدخول
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Reset password form
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
          <p className="text-slate-600">رعاية صحية احترافية</p>
        </div>

        <Card className="shadow-xl border-0 bg-white rounded-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-slate-800 font-bold">
              تعيين كلمة مرور جديدة
            </CardTitle>
            <p className="text-slate-600 mt-2">يرجى إدخال كلمة مرور قوية واستيفاء المتطلبات التالية.</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور الجديدة"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="h-12 pl-12 pr-12 border-slate-300 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 rounded-xl"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="space-y-1 text-xs">
                    {Object.entries(validationErrors).map(([key, message]) => (
                      <p key={key} className="text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {message}
                      </p>
                    ))}
                    {Object.keys(validationErrors).length === 0 && (
                      <p className="text-teal-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        كلمة المرور تستوفي جميع المتطلبات
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-slate-700"
                >
                  تأكيد كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 pl-12 pr-12 border-slate-300 focus:border-orange-400 focus:ring-orange-400 transition-all duration-200 rounded-xl"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-500 text-xs flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    كلمات المرور غير متطابقة
                  </p>
                )}

                {confirmPassword && password === confirmPassword && (
                  <p className="text-teal-600 text-xs flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    كلمات المرور متطابقة
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={
                  isLoading ||
                  Object.keys(validationErrors).length > 0 ||
                  password !== confirmPassword
                }
                className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold transition-all duration-200 disabled:opacity-50 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    جاري إعادة تعيين كلمة المرور...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-3" />
                    إعادة تعيين كلمة المرور
                  </>
                )}
              </Button>
            </form>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center text-sm text-slate-600 hover:text-teal-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
