import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserData } from "../../apiCalls/firebaseAuth";
import { LANGUAGE_KEY } from "../../i18n";
import { RootState } from "../store";

// UserState interface
interface UserState {
  userInfo: {
    displayName?: string;
    email: string;
    favorites: string[];
    uid: string;
  } | null;
  isBiometricEnabled: boolean;
  language: "en" | "ar";
}

// Initial state
const initialState: UserState = {
  userInfo: null,
  isBiometricEnabled: false,
  language: "en",
};

// Async thunk to fetch user profile (from authSlice or AsyncStorage)
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const authUser = state.auth.user;

    if (authUser && authUser.uid && authUser.email) {
      return {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || "",
        favorites: [],
      };
    }
    // Fallback: get from AsyncStorage (firebaseAuth)
    const userData = await getUserData();
    if (userData && userData.uid && userData.email) {
      return {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName || "",
        favorites: [],
      };
    }
    return null;
  }
);

export const hydrateLanguage = createAsyncThunk(
  "user/hydrateLanguage",
  async () => {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return lang === "ar" || lang === "en" ? lang : "en";
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState["userInfo"]>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
    toggleBiometric(state) {
      state.isBiometricEnabled = !state.isBiometricEnabled;
    },
    addFavoriteEvent(state, action: PayloadAction<string>) {
      if (
        state.userInfo &&
        !state.userInfo.favorites.includes(action.payload)
      ) {
        state.userInfo.favorites.push(action.payload);
      }
    },
    removeFavoriteEvent(state, action: PayloadAction<string>) {
      if (state.userInfo) {
        state.userInfo.favorites = state.userInfo.favorites.filter(
          (eventId) => eventId !== action.payload
        );
      }
    },
    toggleLanguage(state) {
      state.language = state.language === "en" ? "ar" : "en";
    },
    setLanguage(state, action: PayloadAction<"en" | "ar">) {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.userInfo = action.payload;
        }
      })
      .addCase(hydrateLanguage.fulfilled, (state, action) => {
        state.language = action.payload;
      });
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  toggleBiometric,
  addFavoriteEvent,
  removeFavoriteEvent,
  toggleLanguage,
  setLanguage,
} = userSlice.actions;

export const toggleBiometricLogin = userSlice.actions.toggleBiometric;

export default userSlice.reducer;
