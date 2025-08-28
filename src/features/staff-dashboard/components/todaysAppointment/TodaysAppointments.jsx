import AppointmentHeader from "./AppointmentHeader";
import AppointmentStatistics from "./AppointmentStatistics";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentsList from "./AppointmentsList";

export default function TodaysAppointments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <AppointmentHeader />

        {/* Statistics Cards */}
        <AppointmentStatistics />

        {/* Filters and Search */}
        <AppointmentFilters />

        {/* Appointments List */}
        <AppointmentsList />
      </div>
    </div>
  );
}
