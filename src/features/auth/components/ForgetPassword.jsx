import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "@/stores";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Mail,
  ArrowLeft,
  Loader2,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ForgetPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const forgetPassword = useAuthStore((state) => state.forgetPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await forgetPassword(email);

      if (result.success) {
        setIsEmailSent(true);
        toast.success(t("auth.resetEmailSent"));
        console.log("Password reset email sent to:", email);
      } else {
        toast.error(result.error || t("auth.resetEmailFailed"));
      }
    } catch (err) {
      console.error("Forget password error:", err);
      const errorMessage = err.error || t("auth.resetEmailFailed");

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };
  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>{" "}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t("logo.clinicName")}
              </h1>
            </div>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-bold">
                  {t("auth.checkYourEmail")}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {t("auth.resetEmailSentInstruction")}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>{t("auth.emailSentTo")}</strong> {email}
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    {t("auth.checkSpam")}
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t("auth.backToLogin")}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    {t("auth.tryDifferentEmail")}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
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
            </div>{" "}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("logo.clinicName")}
            </h1>
            <p className="text-gray-600">{t("auth.professionalHealthcare")}</p>
          </div>
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900 font-bold">
                {t("auth.resetYourPassword")}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {t("auth.enterEmailToReset")}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    {t("auth.emailAddress")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 pl-12 border-2 focus:border-blue-500 transition-all duration-200"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-3" />
                      {t("auth.sendingResetLink")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      {t("auth.sendResetLink")}
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
          </Card>{" "}
        </div>
      </div>
    </div>
  );
}
