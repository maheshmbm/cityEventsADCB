import * as Localization from "expo-localization";
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { I18nManager, StatusBar, useColorScheme } from "react-native";
import RNRestart from "react-native-restart";
import { Provider, useDispatch } from "react-redux";

import i18n, { initI18n } from "./i18n";
import AppNavigator from "./navigation/AppNavigator";
import { hydrateLanguage } from "./redux/slices/userSlice";
import { AppDispatch, store } from "./redux/store";

const AppInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useColorScheme() === "dark";
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initI18n();
      setI18nReady(true);
    };
    setup();
  }, []);

  useEffect(() => {
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    const currentLanguageCode =
      Localization.getLocales()[0]?.languageCode || "en";
    const isRTL = rtlLanguages.includes(currentLanguageCode);
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      RNRestart.Restart();
    }
  }, []);

  useEffect(() => {
    dispatch(hydrateLanguage());
  }, [dispatch]);

  if (!i18nReady) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppNavigator />
    </I18nextProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppInitializer />
  </Provider>
);

export default App;
