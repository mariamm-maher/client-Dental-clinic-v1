import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setDocumentAttributes } from "@/i18n";

export function useLanguageInitialization() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get language preference from localStorage first
    const savedLanguage = localStorage.getItem("preferredLanguage");
    const browserLanguage = navigator.language.split("-")[0];

    // Determine the language to use - Arabic is default
    let languageToUse = "ar"; // default to Arabic

    if (savedLanguage && ["en", "ar"].includes(savedLanguage)) {
      languageToUse = savedLanguage;
    } else if (["en"].includes(browserLanguage)) {
      // Only switch to English if browser language is explicitly English
      languageToUse = browserLanguage;
    }
    // For any other browser language or no preference, keep Arabic as default

    // Set the language and document direction
    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    } else {
      // If language is already set, ensure document attributes are correct
      setDocumentAttributes(languageToUse);
    }

    // Store the language preference
    localStorage.setItem("preferredLanguage", languageToUse);
  }, [i18n]);
}

export default useLanguageInitialization;
