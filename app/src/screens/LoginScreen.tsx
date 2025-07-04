import React from "react";
import {
  ActivityIndicator,
  Button,
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageToggle from "../components/LanguageToggle";
import { useLogin } from "../hooks/useLogin";
import loginStyles from "../styles/loginStyles";



const LoginScreen = () => {
  const {
    t,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
  } = useLogin();

  return (
    <SafeAreaView style={loginStyles.container} edges={["top", "left", "right"]}>
      <View style={loginStyles.topRow}>
        <LanguageToggle />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={[
            loginStyles.title,
            {
              textAlign: I18nManager.isRTL ? "right" : "left",
              writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
            },
          ]}
        >
          {t("login.title")}
        </Text>
        <TextInput
          style={[
            loginStyles.input,
            { textAlign: I18nManager.isRTL ? "right" : "left" },
          ]}
          placeholder={t("login.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[
            loginStyles.input,
            { textAlign: I18nManager.isRTL ? "right" : "left" },
          ]}
          placeholder={t("login.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Button title={t("login.submit")} onPress={handleLogin} />
            <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 16 }}>
              <Text style={{ color: "#007AFF", textAlign: "center" }}>
                {t("login.signupButton")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
