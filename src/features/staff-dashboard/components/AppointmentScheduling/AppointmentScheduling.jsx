import { AppointmentForm, SchedulePreview } from ".";

export default function AppointmentScheduling() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Appointment Form */}
          <div className="xl:col-span-2">
            <AppointmentForm />
          </div>

          {/* Schedule Preview */}
          <div className="xl:col-span-1">
            <SchedulePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
