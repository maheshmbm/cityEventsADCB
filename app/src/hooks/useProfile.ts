import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseLogout } from "../apiCalls/firebaseAuth";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  clearUserInfo,
  fetchUserProfile,
  toggleBiometricLogin,
} from "../redux/slices/userSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userProfile = useSelector((state: RootState) => state.user.userInfo);
  const isBiometricEnabled = useSelector(
    (state: RootState) => state.user.isBiometricEnabled
  );

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleToggleBiometric = () => {
    dispatch(toggleBiometricLogin());
  };

  const handleLogout = async () => {
    await FirebaseLogout();
    dispatch(clearUserInfo());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return {
    userProfile,
    isBiometricEnabled,
    handleToggleBiometric,
    handleLogout,
  };
};
