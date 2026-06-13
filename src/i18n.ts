import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

// Apply direction whenever language changes
const applyDirection = (lang: string) => {
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
};

// Apply on init
applyDirection(i18n.language);

// Apply on language change
i18n.on("languageChanged", (lang) => {
  applyDirection(lang);
});

export default i18n;