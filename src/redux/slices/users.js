import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios.js';
import { AxiosError } from 'axios';

export const fetchUsers = createAsyncThunk('/users', async () => {
  try {
    const { data } = await api.get('/users');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        message: error.response.data.message,
        user: null,
      };
    }
  }
});

const initialState = {
  users: {
    items: [],
    status: 'loading',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users.status = 'loading';
        state.users.items = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.items = action.payload;
        state.users.status = 'load';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.users.items = [];
        state.users.status = 'error';
      });
  },
});

export const usersReducer = usersSlice.reducer;
