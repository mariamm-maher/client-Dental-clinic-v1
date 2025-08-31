import { Stethoscope, User } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
        <Stethoscope className="w-8 h-8 text-white" />
      </div>
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          عيادة دكتور ايهاب
        </h1>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          لوحة تحكم موظف الاستقبال
        </p>
      </div>
    </div>
  );
}
