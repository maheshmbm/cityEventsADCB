import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import LanguageToggle from "../components/LanguageToggle";
import { ProfileHeaderIcon } from "../components/ProfileIcon";
import EventDetailScreen from "../screens/EventDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  EventDetails: { eventId: string };
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: true, title: t("signup.title") }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: t("events.title"),
          headerRight: () =>
            I18nManager.isRTL ? (
              <LanguageToggle />
            ) : (
              <ProfileHeaderIcon navigation={navigation} />
            ),
          headerLeft: () =>
            I18nManager.isRTL ? (
              <ProfileHeaderIcon navigation={navigation} />
            ) : (
              <LanguageToggle />
            ),
        })}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailScreen}
        options={({ navigation }) => ({
          title: t("events.details"),
          headerRight: () => <ProfileHeaderIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("profile.title"),
          headerRight: () => <LanguageToggle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
