import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../navigation/AppNavigator";
import { signUp } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";

export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignUp = () => {
    if (password === confirmPassword && password.length >= 6) {
      dispatch(signUp({ name, email, password }))
        .unwrap()
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        })
        .catch((error) => {
          Alert.alert(t("login.error"), error.message);
        });
    } else {
      Alert.alert(t("signup.passwordsNotMatch"));
    }
  };

  return {
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
  };
};
