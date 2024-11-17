import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios.js";

export const fetchAuth = createAsyncThunk("auth/fetchAuth",
  async (params) => {
    const { data } = await api.post("auth/login", params);
    return data;
  },
);

export const fetchRegistration = createAsyncThunk("auth/fetchRegistration",
  async (params) => {
    const { data } = await api.post("auth/register", params);
    return data;
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
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
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
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.status = "loading";
        state.data = null;
      }) // registration
      .addCase(fetchRegistration.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.status = "loading";
        state.data = null;
      })
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
