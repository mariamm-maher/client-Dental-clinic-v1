import {
  StatisticsHeader,
  OverviewCards,
  AppointmentStatus,
  ServicesPerformance,
  DoctorsPerformance,
  QuickActions,
} from "./index";

export default function Statistics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      <div className="p-6 space-y-6">
        <StatisticsHeader />

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentStatus />
          <ServicesPerformance />
        </div>

        <DoctorsPerformance />

        <QuickActions />
      </div>
    </div>
  );
}
