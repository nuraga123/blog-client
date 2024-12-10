import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios.js";
import { AxiosError } from "axios";

export const fetchLogin = createAsyncThunk("auth/fetchLogin",
  async (params) => {
    try {
      const { data } = await api.post("auth/login", params);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response.data.message,
          user: null,
        };
      }
    }
  },
);

export const fetchRegistration = createAsyncThunk("auth/fetchRegistration",
  async (params) => {
    try {
      const { data } = await api.post("auth/register", params);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response.data.message,
          user: null,
        };
      }
    }
  },
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe",
  async () => {
    const { data } = await api.get("auth/me");
    return data;
  },
);

const initialState = {
  data: null,
  message: "",
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (bulder) =>

    bulder // login
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const actionsMessage = action.payload?.message
        state.data = actionsMessage ? null : action.payload;
        state.message = actionsMessage;
        state.status = actionsMessage ? "error" : "loaded";
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.message = action.payload;
        state.status = "error";
        state.data = null;
      }) // get me
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      }) // registration
      .addCase(fetchRegistration.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        const actionsMessage = action.payload?.message
        state.message = actionsMessage;
        state.data = actionsMessage ? null : action.payload;
        state.status = actionsMessage ? "error" : "loaded";
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.message = action.payload;
        state.status = "error";
        state.data = null;
      })
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
