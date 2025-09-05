import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores";
import NotFound from "./components/common/NotFound.jsx";
import ReceptionistDashboard from "./features/staff-dashboard/index.jsx";
import { Toaster } from "@/components/ui/sonner";
import {
  SettingsContainer,
  ScheduleSettings,
  ProfileSettings,
} from "@/features/staff-dashboard/components/settings";

// Import dashboard components
import TodaysAppointments from "./features/staff-dashboard/components/todaysAppointment/TodaysAppointments";
import AppointmentScheduling from "./features/staff-dashboard/components/AppointmentScheduling/AppointmentScheduling";
import PatientRegistration from "./features/staff-dashboard/components/patientRegistration/PatientRegistration";
import Calendar from "./features/staff-dashboard/components/weeklyCalender/Calendar.jsx";
import PatientSearch from "./features/staff-dashboard/components/patientSearch/PatientSearch";
import Statistics from "./features/staff-dashboard/components/statistics/Statistics";

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
  // Initialize authentication state from localStorage
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // This runs once when the app loads
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Routes>
        {/* Root redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Routes - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["receptionist", "staff"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<TodaysAppointments />} />
          <Route path="schedule" element={<AppointmentScheduling />} />
          <Route path="register" element={<PatientRegistration />} />
          <Route path="calendar/*" element={<Calendar />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="search" element={<PatientSearch />} />
        </Route>

        {/* Legacy redirects */}
        <Route
          path="/receptionist-dashboard"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="/staff-dashboard"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Settings Routes */}
        <Route path="/settings" element={<SettingsContainer />} />
        <Route path="/settings/schedule" element={<SettingsContainer />} />
        <Route path="/settings/profile" element={<SettingsContainer />} />
        <Route path="/settings/notifications" element={<SettingsContainer />} />
        <Route path="/settings/appearance" element={<SettingsContainer />} />
        <Route path="/settings/system" element={<SettingsContainer />} />

        {/* 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
