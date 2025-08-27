import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // default language set to Arabic
    fallbackLng: "en", // fallback to English
    debug: false,

    // Language detection options
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "preferredLanguage",
      caches: ["localStorage"],
      excludeCacheFor: ["cimode"], // languages to not persist (dev mode)
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: false,
    },
  });

// Set initial direction and language attribute
const setDocumentAttributes = (language) => {
  const isRTL = language === "ar";

  // Set document direction
  document.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = language;

  // Set body direction and classes
  document.body.dir = isRTL ? "rtl" : "ltr";

  // Add/remove RTL classes for CSS styling
  if (isRTL) {
    document.body.classList.add("rtl");
    document.body.classList.remove("ltr");
    document.documentElement.classList.add("rtl");
    document.documentElement.classList.remove("ltr");
  } else {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
    document.documentElement.classList.add("ltr");
    document.documentElement.classList.remove("rtl");
  }

  // Force a reflow to apply changes immediately
  document.body.offsetHeight;

  console.log(
    `Language changed to: ${language}, Direction: ${isRTL ? "RTL" : "LTR"}`
  );
};

// Set initial attributes
setDocumentAttributes(i18n.language || "ar");

// Listen for language changes
i18n.on("languageChanged", (lng) => {
  setDocumentAttributes(lng);
  localStorage.setItem("preferredLanguage", lng);
});

// Export the setDocumentAttributes function for use in components
export { setDocumentAttributes };
export default i18n;
