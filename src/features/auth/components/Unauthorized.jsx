import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

const Unauthorized = ({
  requiredRole = null,
  requiredRoles = null,
  message = null,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getRoleMessage = () => {
    if (message) return message;

    if (requiredRole) {
      return `هذه الصفحة تتطلب دور: ${requiredRole}`;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      if (requiredRoles.length === 1) {
        return `هذه الصفحة تتطلب دور: ${requiredRoles[0]}`;
      }
      return `هذه الصفحة تتطلب أحد الأدوار التالية: ${requiredRoles.join("، ")}`;
    }

    return "لا تملك صلاحية الوصول إلى هذه الصفحة";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-slate-200 rounded-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            غير مصرح بالدخول
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <ShieldX className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {getRoleMessage()}
            </AlertDescription>
          </Alert>

          <div className="text-center text-slate-600">
            <p className="text-sm">ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.</p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full h-11 border-slate-300 hover:bg-orange-50 transition-all duration-200 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>

            <Button
              onClick={handleGoHome}
              className="w-full h-11 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
            >
              <Home className="w-4 h-4 mr-2" />
              الذهاب إلى الصفحة الرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
