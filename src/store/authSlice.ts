import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import iptvApi from "../config/axios";

export const register = createAsyncThunk<PayloadAction, any>(
  "auth/register",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/register`,
      payload
    );
    return result.data;
  }
);

export const login = createAsyncThunk<PayloadAction, any>(
  "auth/login",
  async ({ phone, password, device_token }, { rejectWithValue }) => {
    try {
      const result = await iptvApi.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          phone,
          password,
          device_token,
        }
      );

      if (result.data.success) {
        return result.data;
      } else {
        return rejectWithValue(result.data);
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const changePassword = createAsyncThunk<PayloadAction, any>(
  "auth/changePassword",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/change-password`,
      payload
    );
    return result.data;
  }
);

export const resetPassword = createAsyncThunk<PayloadAction, any>(
  "auth/resetPassword",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/reset-password`,
      payload
    );
    return result.data;
  }
);

export const updateProfile = createAsyncThunk<PayloadAction, any>(
  "auth/updateProfile",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/update-profile`,
      payload
    );
    return result.data;
  }
);

export const verificationCode = createAsyncThunk<PayloadAction, any>(
  "auth/verificationCode",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/verify-otp`,
      payload
    );
    return result.data;
  }
);

export const registerPassword = createAsyncThunk<PayloadAction, any>(
  "auth/registerPassword",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/register-password`,
      payload
    );
    return result.data;
  }
);

export const deleteSubAccount = createAsyncThunk(
  "auth/deleteSubAccount",
  async (id: number) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/delete-subaccount/${id}`
    );
    return result.data.data;
  }
);

export const fetchUserFromToken = createAsyncThunk<PayloadAction, any>(
  "auth/fetchUserFromToken",
  async (payload) => {
    return Promise.resolve(payload);
  }
);


export const logout = createAsyncThunk("auth/logout", async () => { });

interface AuthState {
  customer: object;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  customer: {},
  isLoggedIn: false,
  isLoggedOut: false,
  isAuthenticated: false,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.customer = action.payload.data.customer;
      state.isLoggedIn = true;
      state.isAuthenticated = true;

      Cookies.set("isAuthenticated", "true", {
        expires: 1, // Set expiration time (optional)
        path: "/", // The cookie will be available on the entire site
        // secure: true, // Secure flag to ensure cookie is sent only over HTTPS
        sameSite: "Strict", // Prevents CSRF attacks
      });
      Cookies.set(
        "customerInfo",
        JSON.stringify(action.payload.data.customer),
        {
          expires: 1, // Set expiration time (optional)
          path: "/", // The cookie will be available on the entire site
          // secure: true, // Secure flag to ensure cookie is sent only over HTTPS
          sameSite: "Strict", // Prevents CSRF attacks
        }
      );
      Cookies.set("token", action.payload.data.accessToken, {
        expires: 1, // Set expiration time (optional)
        path: "/", // The cookie will be available on the entire site
        // secure: true, // Secure flag to ensure cookie is sent only over HTTPS
        sameSite: "Strict", // Prevents CSRF attacks
      });
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.customer = {};
      state.isAuthenticated = false;
      state.isLoggedOut = true;
      Cookies.remove("customerInfo");
      Cookies.remove("isAuthenticated");
      Cookies.remove("token");
    });
    builder.addCase(fetchUserFromToken.fulfilled, (state, action: any) => {
      console.log(action.payload);
      state.customer = action.payload.data.customer;
      state.isLoggedIn = true;
      state.isAuthenticated = true;
      state.isLoggedOut = false;

      // Refresh cookies to extend session
      Cookies.set("token", action.payload.data.accessToken, { expires: 1, path: "/", sameSite: "Strict" });
      Cookies.set("isAuthenticated", "true", { expires: 1, path: "/", sameSite: "Strict" });
      Cookies.set("customerInfo", JSON.stringify(action.payload.data.customer), { expires: 1, path: "/", sameSite: "Strict" });
    });

    builder.addCase(fetchUserFromToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.customer = {};
      Cookies.remove("isAuthenticated");
      Cookies.remove("customerInfo");
      Cookies.remove("token");
    });
  },
});

export default authSlice.reducer;
