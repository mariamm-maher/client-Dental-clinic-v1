import { PatientHeader, PatientForm, RecentPatients } from ".";

export default function PatientRegistration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      <div className="p-6 space-y-6">
        <PatientHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <PatientForm />
          </div>

          {/* Recent Registrations */}
          <div>
            <RecentPatients />
          </div>
        </div>
      </div>
    </div>
  );
}
