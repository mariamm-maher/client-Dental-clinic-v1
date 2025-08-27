import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";
import PatientRegistration from "./components/PatientRegistration";
import AppointmentScheduling from "./components/AppointmentScheduling";
import TodaysAppointments from "./components/TodaysAppointments";
import WeeklyCalendar from "./components/WeeklyCalendar";
import PatientSearch from "./components/PatientSearch";
import { useScrollToTopOnRouteChange } from "@/hooks/useScrollToTop";

export default function ReceptionistDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("today");
  
  // Scroll to top when tab changes
  useScrollToTopOnRouteChange({ smooth: true, delay: 100 });
  
  // Also scroll to top when activeTab state changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "today" && <TodaysAppointments />}
          {activeTab === "schedule" && <AppointmentScheduling />}
          {activeTab === "register" && <PatientRegistration />}
          {activeTab === "calendar" && <WeeklyCalendar />}
          {activeTab === "search" && <PatientSearch />}
        </div>
      </main>
    </div>
  );
}
