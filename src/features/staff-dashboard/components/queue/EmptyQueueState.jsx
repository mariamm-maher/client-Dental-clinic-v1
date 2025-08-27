import { Users, Clock, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyQueueState({
  hasFilters,
  onClearFilters,
  onAddPatient,
}) {
  return (
    <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200">
      <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
        {hasFilters ? (
          <Clock className="h-8 w-8 text-white" />
        ) : (
          <Users className="h-8 w-8 text-white" />
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {hasFilters ? "لا توجد نتائج مطابقة للمرشحات" : "القائمة فارغة"}
      </h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {hasFilters
          ? "جرّب تعديل معايير البحث أو المرشحات لعرض المزيد من المرضى."
          : "لا يوجد مرضى بانتظار حالياً. جميع المواعيد محدثة!"}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {hasFilters && (
          <Button variant="outline" onClick={onClearFilters} className="gap-2">
            <Clock className="w-4 h-4" />
            مسح المرشحات
          </Button>
        )}

        <Button
          onClick={onAddPatient}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          إضافة مريض إلى القائمة
        </Button>
      </div>
    </div>
  );
}
