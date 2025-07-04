import React from "react";
import { Button, I18nManager, Text, TextInput, View } from "react-native";
import { useSignUp } from "../hooks/useSignUp";
import signUpStyles from "../styles/signUpStyles";

const SignUpScreen = () => {
  const {
    t,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
  } = useSignUp();

  return (
    <View style={signUpStyles.container}>
      <Text
        style={[
          signUpStyles.title,
          {
            textAlign: "center",
            writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
          },
        ]}
      >
        {t("signup.title")}
      </Text>
      <TextInput
        style={[
          signUpStyles.input,
          { textAlign: I18nManager.isRTL ? "right" : "left" },
        ]}
        placeholder={t("signup.name")}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={[
          signUpStyles.input,
          { textAlign: I18nManager.isRTL ? "right" : "left" },
        ]}
        placeholder={t("signup.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          signUpStyles.input,
          { textAlign: I18nManager.isRTL ? "right" : "left" },
        ]}
        placeholder={t("signup.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[
          signUpStyles.input,
          { textAlign: I18nManager.isRTL ? "right" : "left" },
        ]}
        placeholder={t("signup.confirmPassword")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title={t("signup.submit")} onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
