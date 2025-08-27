import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useLanguageInitialization } from "./hooks/useLanguageInitialization";
import { useAuthStore } from "@/stores";
import NotFound from "./components/common/NotFound.jsx";
import ReceptionistDashboard from "./features/staff-dashboard/index.jsx";
import { Toaster } from "@/components/ui/sonner";

// Import auth components from index file
import {
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  ProtectedRoute,
  LoginCallback,
} from "./features/auth";

function App() {
  // Initialize language and RTL support
  useLanguageInitialization();

  // Initialize authentication state from localStorage
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // This runs once when the app loads
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Routes>
        {/* Root redirect to receptionist dashboard */}
        <Route path="/" element={<Navigate to="/receptionist-dashboard" replace />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Receptionist Dashboard - Protected Receptionist Route */}
        <Route
          path="/receptionist-dashboard"
          element={
            <ProtectedRoute roles={["receptionist", "staff"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect old staff-dashboard to receptionist-dashboard */}
        <Route path="/staff-dashboard" element={<Navigate to="/receptionist-dashboard" replace />} />

        {/* 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
