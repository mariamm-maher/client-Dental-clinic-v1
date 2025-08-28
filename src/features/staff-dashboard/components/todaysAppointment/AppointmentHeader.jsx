import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCw } from "lucide-react";
import { useAppointmentStore } from "@/stores";

export default function AppointmentHeader() {
  const refreshAppointments = useAppointmentStore(
    (state) => state.refreshAppointments
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <CalendarDays className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            مواعيد اليوم
          </h1>
          <p className="text-slate-600 mt-1">
            {new Date().toLocaleDateString("ar", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={refreshAppointments}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث
        </Button>
      </div>
    </div>
  );
}
