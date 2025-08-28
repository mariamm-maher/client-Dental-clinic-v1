import { Card, CardContent } from "@/components/ui/card";
import { CalendarPlus, Calendar as CalendarIcon } from "lucide-react";

export default function AppointmentHeader() {
  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <CalendarPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              جدولة المواعيد
            </h1>
            <p className="text-slate-600 mt-1">
              إدارة وحجز المواعيد لمرضى العيادة
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
