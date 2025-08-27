import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import useAuthStore from "@/stores/authStore";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      setError(t("auth.invalidOrMissingToken"));
    }
  }, [token, t]);

  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long";
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter";
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter";
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.number = "Password must contain at least one number";
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.special =
        "Password must contain at least one special character (@$!%*?&)";
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
      setError(t("auth.passwordsDontMatch"));
      setIsLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setError(t("auth.fixPasswordRequirements"));
      setValidationErrors(passwordErrors);
      setIsLoading(false);
      return;
    }
    try {
      const result = await confirmPasswordReset(token, password);

      if (result.success) {
        setIsSuccess(true);
        toast.success(result.message || t("auth.passwordResetSuccess"));
      } else {
        setError(result.error || t("auth.passwordResetFailed"));
        toast.error(result.error || t("auth.passwordResetFailed"));
      }
    } catch (err) {
      console.error("Reset password error:", err);
      const errorMessage = err.error || t("auth.passwordResetTryAgain");
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("logo.clinicName")}
              </h1>
              <p className="text-gray-600">
                {t("auth.professionalHealthcare")}
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-bold">
                  {t("auth.passwordResetSuccessfully")}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {t("auth.passwordUpdatedInstruction")}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t("auth.backToLogin")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
        <LeftSide />

        {/* Right Side - Error Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("logo.clinicName")}
              </h1>
              <p className="text-gray-600">
                {t("auth.professionalHealthcare")}
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-bold">
                  {t("auth.invalidResetLink")}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {t("auth.invalidResetInstruction")}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <Link to="/forget-password">
                  <Button
                    type="button"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                  >
                    {t("auth.requestNewResetLink")}
                  </Button>
                </Link>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToLogin}
                  className="w-full h-12"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t("auth.backToLogin")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <LeftSide />

      {/* Right Side - Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("logo.clinicName")}
            </h1>
            <p className="text-gray-600">{t("auth.professionalHealthcare")}</p>
          </div>

          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900 font-bold">
                {t("auth.setNewPassword")}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {t("auth.enterNewPasswordInstruction")}
              </p>
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
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t("auth.newPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.enterNewPassword")}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="h-12 pl-12 pr-12 border-2 focus:border-blue-500 transition-all duration-200"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                      {Object.entries(validationErrors).map(
                        ([key, message]) => (
                          <p
                            key={key}
                            className="text-red-600 flex items-center"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {message}
                          </p>
                        )
                      )}
                      {Object.keys(validationErrors).length === 0 && (
                        <p className="text-green-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {t("auth.passwordMeetsAllRequirements")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t("auth.confirmNewPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("auth.confirmNewPasswordPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 pl-12 pr-12 border-2 focus:border-blue-500 transition-all duration-200"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-600 text-xs flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {t("auth.passwordsDontMatch")}
                    </p>
                  )}

                  {confirmPassword && password === confirmPassword && (
                    <p className="text-green-600 text-xs flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t("auth.passwordsMatch")}
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
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-3" />
                      {t("auth.resettingPassword")}
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-3" />
                      {t("auth.resetPassword")}
                    </>
                  )}
                </Button>
              </form>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("auth.backToLogin")}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
