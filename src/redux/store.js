import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, tagsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { usersReducer } from "./slices/users";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export default store;
