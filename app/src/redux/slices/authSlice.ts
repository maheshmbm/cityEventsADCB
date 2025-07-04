import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseLogin, FirebaseSignUp, getUserData } from '../../apiCalls/firebaseAuth';

interface AuthState {
  user: null | { uid: string; email: string; displayName?: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const userCredential = await FirebaseLogin(credentials.email, credentials.password);
  alert('login successful: ' + userCredential.user.email);
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName || '',
  };
});

// signUp thunk
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const user = await FirebaseSignUp(email, password, name);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || name || '',
    };
  }
);

// Add checkUserSession thunk
export const checkUserSession = createAsyncThunk('auth/checkUserSession', async () => {
  const user = await getUserData();
  if (user && user.uid && user.email) {
    return { uid: user.uid, email: user.email , displayName: user.displayName || '' };
  } else {
    throw new Error('No user session');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email ?? '',
          displayName: action.payload.displayName ?? '',
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email ?? '',
          displayName: action.payload.displayName ?? '',
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      // Handle checkUserSession
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email ?? '',
          displayName: action.payload.displayName ?? '',
        };
      })
      .addCase(checkUserSession.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;