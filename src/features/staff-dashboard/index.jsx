import { useState, useEffect } from "react";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";
import PatientRegistration from "./components/patientRegistration/PatientRegistration";
import AppointmentScheduling from "./components/AppointmentScheduling/AppointmentScheduling";
import TodaysAppointments from "./components/todaysAppointment/TodaysAppointments";
import WeeklyCalendar from "./components/weeklyCalender/WeeklyCalendar";
import PatientSearch from "./components/patientSearch/PatientSearch";
import Statistics from "./components/statistics/Statistics";

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState("today");

  // Also scroll to top when activeTab state changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
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
        {" "}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "today" && <TodaysAppointments />}
          {activeTab === "schedule" && <AppointmentScheduling />}
          {activeTab === "register" && <PatientRegistration />}
          {activeTab === "calendar" && <WeeklyCalendar />}
          {activeTab === "statistics" && <Statistics />}
          {activeTab === "search" && <PatientSearch />}
        </div>
      </main>
    </div>
  );
}
