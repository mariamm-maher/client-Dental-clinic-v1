import { usePatientSearchStore } from "@/stores";
import { SearchHeader, SearchForm, PatientDetails } from "./index";

export default function PatientSearch() {
  const { selectedPatient } = usePatientSearchStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      <div className="p-6 space-y-6">
        <SearchHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SearchForm />
          </div>
          <div>
            <PatientDetails patient={selectedPatient} />
          </div>
        </div>
      </div>
    </div>
  );
}
