import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // default language set to Arabic
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
