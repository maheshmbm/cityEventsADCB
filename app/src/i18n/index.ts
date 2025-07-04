// src/i18n/index.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

export const LANGUAGE_KEY = "APP_LANGUAGE";

export const setAppDirection = (lang: string) => {
  const isRTL = lang === "ar";
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }
};

export const initI18n = async () => {
  let savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (!savedLang) {
    savedLang = Localization.getLocales()[0]?.languageCode || "en";
  }
  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: savedLang,
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
  setAppDirection(savedLang);
};

export default i18n;
