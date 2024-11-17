import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await api.get("posts");
  return data;
});

export const fetchRemovePostById = createAsyncThunk("posts/fetchRemovePostById",
  async (id) => await api.delete(`posts/${id}`)
);

export const fetchUpdatePost = createAsyncThunk("posts/fetchUpdatePost",
  async (id) => await api.patch(`posts/${id}`)
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await api.get("tags");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "load";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      .addCase(fetchRemovePostById.pending, (state, action) => {
        state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
      })
  },
});

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "load";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      });
  },
});

export const tagsReducer = tagsSlice.reducer;

export const postsReducer = postsSlice.reducer;
