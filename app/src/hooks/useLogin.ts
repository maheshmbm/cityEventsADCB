import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
};

export const useLogin = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [email, setEmail] = useState("citypulsetest1@email.com");
  const [password, setPassword] = useState("Test@1234");

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }))
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
      Alert.alert(t("login.fillFields"));
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return {
    t,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
  };
};
