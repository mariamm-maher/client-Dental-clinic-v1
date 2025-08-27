import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useLanguageInitialization() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get language preference from localStorage or browser
    const savedLanguage = localStorage.getItem("preferredLanguage");
    const browserLanguage = navigator.language.split("-")[0];

    // Determine the language to use
    let languageToUse = "en"; // default

    if (savedLanguage && ["en", "ar"].includes(savedLanguage)) {
      languageToUse = savedLanguage;
    } else if (["ar"].includes(browserLanguage)) {
      languageToUse = browserLanguage;
    }

    // Set the language and document direction
    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    }

    document.dir = languageToUse === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = languageToUse;

    // Store the language preference
    localStorage.setItem("preferredLanguage", languageToUse);
  }, [i18n]);
}

export default useLanguageInitialization;
