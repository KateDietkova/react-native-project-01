import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
};
export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postsUpdate(state, { payload }) {
      payload.docs.forEach((doc) => {
        const isPost = state.posts.filter((post) => post.id === doc.id);

        if (isPost.length === 0) {
          console.log(doc.data());
          state.posts.push({ id: doc.id, ...doc.data() });
        }
      });
    },
    postsUpdatePending(state, { payload }) {
      state.isLoading = true;
    },
    postsUpdateSuccess(state, { payload }) {
      state.isLoading = false;
    },
  },
});

export const { postsUpdate, postsUpdatePending, postsUpdateSuccess } =
  postsSlice.actions;
