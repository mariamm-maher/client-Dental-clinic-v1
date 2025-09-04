import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";

export default function ReceptionistDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-stone-50 to-cyan-50/20">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="transition-all duration-300 ease-in-out">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
