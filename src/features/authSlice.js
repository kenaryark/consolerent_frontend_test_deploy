import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://consolerentapideploytest-production.up.railway.app/api/login",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true } // Kirim cookie lintas-origin
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message); // Log error
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://consolerentapideploytest-production.up.railway.app/api/me",
      { withCredentials: true } // Kirim cookie lintas-origin
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("GetMe Error:", error.response?.data || error.message); // Log error
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete(
    "https://consolerentapideploytest-production.up.railway.app/api/logout",
    { withCredentials: true } // Kirim cookie lintas-origin
  );
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Handle Logout
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null; // Hapus user dari state setelah logout
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
