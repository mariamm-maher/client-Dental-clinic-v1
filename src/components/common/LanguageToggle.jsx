import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { setDocumentAttributes } from "@/i18n";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode) => {
    // Change the language in i18n (this will trigger the languageChanged event)
    i18n.changeLanguage(languageCode);

    // The document attributes will be set automatically by the event listener in i18n/index.js
    // But we can also call it directly to ensure immediate update
    setDocumentAttributes(languageCode);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    changeLanguage(newLang);
  };

  const getNextLanguageDisplay = () => {
    return i18n.language === "ar" ? "EN" : "عر";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 min-w-[80px] transition-all duration-200 hover:bg-primary/10"
      title={`Switch to ${i18n.language === "ar" ? "English" : "Arabic"}`}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{getNextLanguageDisplay()}</span>
    </Button>
  );
}
