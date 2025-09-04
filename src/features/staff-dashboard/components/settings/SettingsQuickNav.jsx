import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// settingsConfig and getColorClasses should be imported from parent or passed as props

export default function SettingsQuickNav({
  settingsConfig,
  selectedSetting,
  getColorClasses,
}) {
  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl rounded-4xl px-2">
        <CardContent className="py-2 px-2 flex items-center gap-2">
          {settingsConfig.map((setting) => {
            const IconComponent = setting.icon;
            const colorClasses = getColorClasses(setting.color);
            const isActive = setting.id === selectedSetting;
            return (
              <Link
                key={setting.id}
                to={`/settings/${setting.id}`}
                title={setting.title}
                className=""
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="icon"
                  className={`w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center text-base shadow-none border-none ${
                    isActive
                      ? `${colorClasses.active} font-bold ring-2 ring-offset-2 ring-${setting.color}-200`
                      : `${colorClasses.hover} text-slate-500`
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isActive ? colorClasses.text : "text-slate-500"
                    }`}
                  />
                </Button>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
