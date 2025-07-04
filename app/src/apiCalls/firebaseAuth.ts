import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "../constants/apiConstants";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const FirebaseSignUp = async (
  email: string,
  password: string,
  name: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential.user;
};

export const FirebaseLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const FirebaseLogout = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getUserData = async () => {
  const userData = await AsyncStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
