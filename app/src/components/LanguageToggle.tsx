import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n, { LANGUAGE_KEY, setAppDirection } from "../i18n";
import { toggleLanguage } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.user.language
  );
  const { t } = useTranslation();

  const handleToggle = async () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";

    Alert.alert(
      t("language_toggle.restart_title"),
      t("language_toggle.restart_message"),
      [
        {
          text: t("language_toggle.ok"),
          onPress: async () => {
            dispatch(toggleLanguage());
            await i18n.changeLanguage(newLang);
            setAppDirection(newLang);
            await AsyncStorage.setItem(LANGUAGE_KEY, newLang);
            await Updates.reloadAsync();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, styles.alignBasedOnRTL]}>
      <TouchableOpacity onPress={handleToggle} style={styles.button}>
        <Text style={[styles.text, styles.textAlignBasedOnRTL]}>
          {currentLanguage === "en"
            ? t("language_toggle.to_arabic")
            : t("language_toggle.to_english")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  alignBasedOnRTL: {
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 140,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
  textAlignBasedOnRTL: {
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
});

export default LanguageToggle;
