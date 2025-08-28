import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function MobileNavigation({
  activeTab,
  onTabChange,
  notifications = 3,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const mobileActions = [
    {
      id: "search",
      label: "بحث سريع",
      icon: Search,
      color: "sky",
    },
    {
      id: "calendar",
      label: "التقويم",
      icon: Calendar,
      color: "emerald",
    },
    {
      id: "patients",
      label: "المرضى",
      icon: Users,
      color: "violet",
    },
    {
      id: "reports",
      label: "التقارير",
      icon: BarChart3,
      color: "amber",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      sky: "bg-sky-100 text-sky-600",
      emerald: "bg-emerald-100 text-emerald-600",
      violet: "bg-violet-100 text-violet-600",
      amber: "bg-amber-100 text-amber-600",
    };
    return colors[color] || colors.sky;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="bg-gradient-to-b from-sky-50 to-blue-50 h-full">
                <div className="p-6 border-b border-sky-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      عم
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">عيادة الأسنان</h3>
                      <p className="text-sm text-gray-600">موظف الاستقبال</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {mobileActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        variant="ghost"
                        onClick={() => {
                          onTabChange?.(action.id);
                          setIsOpen(false);
                        }}
                        className="w-full justify-start h-12 text-right"
                      >
                        <div
                          className={`p-2 rounded-lg ${getColorClasses(
                            action.color
                          )} ml-3`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-lg font-bold text-gray-900">عيادة الأسنان</h1>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 p-2">
          {mobileActions.map((action) => {
            const Icon = action.icon;
            const isActive = activeTab === action.id;

            return (
              <Button
                key={action.id}
                variant="ghost"
                onClick={() => onTabChange?.(action.id)}
                className={`flex flex-col gap-1 h-16 p-2 ${
                  isActive
                    ? `${getColorClasses(
                        action.color
                      )} border-2 border-current/20`
                    : "text-gray-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}
