import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios.js';
import { AxiosError } from 'axios';

export const fetchUsers = createAsyncThunk('/users', async () => {
  try {
    const { data } = await api.get('/users');
    console.log(data);
    return data;
  } catch (error) {
    console.log('error ');
    console.log(error.message);
    if (error instanceof AxiosError) {
      console.log('error instanceof AxiosError');
      console.log(error);
      return {
        message: error.message,
        user: null,
      };
    }
  }
});

const initialState = {
  users: {
    items: [],
    status: 'loading',
    message: '',
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
        const actionsMessage = action?.payload?.message;
        console.log(action);
        state.users.items = actionsMessage ? null : action.payload;
        state.users.message = actionsMessage;
        state.users.status = actionsMessage ? 'error' : 'loaded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.items = null;
        state.users.status = 'error';
        state.message = action.payload.message;
      });
  },
});

export const usersReducer = usersSlice.reducer;
