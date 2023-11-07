import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "@/Locale/en";
import kn from "@/Locale/kn";
import ml from "@/Locale/ml";
import mr from "@/Locale/mr";
import ta from "@/Locale/ta";

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  ml: { translation: ml },
  mr: { translation: mr },
  kn: { translation: kn },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
  });

export default i18n;
