import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { checkUserSession } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import splashStyles from "../styles/splashStyles";

import type { StackNavigationProp } from "@react-navigation/stack";

type SplashScreenProps = {
  navigation: StackNavigationProp<any>;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await dispatch(checkUserSession()).unwrap();
        navigation.replace("Home");
      } catch {
        navigation.replace("Login");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <View style={splashStyles.container}>
      <Text style={splashStyles.title}>{t("welcome")}</Text>
      <ActivityIndicator
        size="large"
        color="#007AFF"
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default SplashScreen;
