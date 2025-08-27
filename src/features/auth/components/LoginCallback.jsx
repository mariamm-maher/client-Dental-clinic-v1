import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const LoginCallback = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle } = useAuthStore();
  const [status, setStatus] = useState("processing"); // processing, success, error

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);

        // Extract parameters from the callback URL
        const accessToken = queryParams.get("accessToken");
        const name = queryParams.get("name");
        const role = queryParams.get("role");
        const userId = queryParams.get("id");
        const redirect = queryParams.get("redirect") || "/";

        console.log("📥 Callback parameters received:", {
          accessToken: accessToken ? "✓ Present" : "✗ Missing",
          name: name || "✗ Missing",
          role: role || "✗ Missing",
          userId: userId || "✗ Missing",
          redirect,
        });

        if (accessToken && name && role && userId) {
          // Save authentication data to Zustand store
          await signInWithGoogle({
            name,
            accessToken,
            role,
            userId,
          });

          setStatus("success");

          // Wait a moment to show success state, then redirect
          setTimeout(() => {
            // Determine redirect destination based on role
            let redirectPath = redirect;

            if (redirect === "/" || redirect === "/login") {
              switch (role.toLowerCase()) {
                case "doctor":
                  redirectPath = "/doctor-dashboard";
                  break;
                case "staff":
                  redirectPath = "/staff-dashboard";
                  break;
                case "patient":
                  redirectPath = "/patient-profile";
                  break;
                default:
                  redirectPath = "/";
              }
            }

            console.log("🚀 Redirecting to:", redirectPath);
            navigate(redirectPath, { replace: true });
          }, 1500);
        } else {
          console.error("❌ Missing required authentication parameters");
          setStatus("error");

          // Redirect to login after showing error
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        }
      } catch (error) {
        console.error("❌ Error processing login callback:", error);
        setStatus("error");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [location, navigate, signInWithGoogle]);

  const renderContent = () => {
    switch (status) {
      case "processing":
        return (
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("callback.completingSignIn")}
              </h3>
              <p className="text-gray-600">{t("callback.pleaseWait")}</p>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("callback.welcomeBack")}
              </h3>
              <p className="text-gray-600">{t("callback.redirecting")}</p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("callback.signInFailed")}
              </h3>
              <p className="text-gray-600">{t("callback.issueRedirecting")}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-900">
            {t("logo.clinicName")}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">{renderContent()}</CardContent>
      </Card>
    </div>
  );
};

export default LoginCallback;
