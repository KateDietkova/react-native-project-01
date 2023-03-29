import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlise";
import { postsSlice } from "./dashboard/postsSlice";
import { commentsSlice } from "./dashboard/commentsSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
