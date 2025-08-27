import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  CalendarPlus,
  UserPlus,
  Calendar,
  Search,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NavigationTabs({ activeTab, onTabChange }) {
  const { t } = useTranslation();
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    {
      id: "today",
      label: t("receptionist.tabs.today.label"),
      icon: CalendarDays,
      count: 8,
    },
    {
      id: "schedule",
      label: t("receptionist.tabs.schedule.label"),
      icon: CalendarPlus,
      count: 0,
    },
    {
      id: "register",
      label: t("receptionist.tabs.register.label"),
      icon: UserPlus,
      count: 5,
    },
    {
      id: "calendar",
      label: t("receptionist.tabs.calendar.label"),
      icon: Calendar,
      count: 45,
    },
    {
      id: "search",
      label: t("receptionist.tabs.search.label"),
      icon: Search,
      count: 1247,
    },
  ];
  const getTabStyles = (isActive, isHovered) => {
    if (isActive) {
      return "bg-primary text-white border-primary shadow-sm";
    } else if (isHovered) {
      return "bg-secondary/80 text-secondary-foreground border-secondary hover:bg-secondary";
    } else {
      return "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800";
    }
  };
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            const IconComponent = tab.icon;

            return (
              <Button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                variant="ghost"
                className={`
                  relative flex items-center gap-3 px-4 py-3 h-auto min-w-0
                  border transition-all duration-200 rounded-lg
                  ${getTabStyles(isActive, isHovered)}
                `}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {tab.label}
                </span>
                {tab.count > 0 && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={`ml-2 text-xs px-2 py-0.5 ${
                      isActive 
                        ? "bg-white/20 text-white border-white/30" 
                        : "bg-slate-100 text-slate-600 border-slate-300"
                    }`}
                  >
                    {tab.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
