import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, tagsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export default store;
