import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  isLoading: false,
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    commentsUpdate(state, { payload }) {
      payload.docs.forEach((doc) => {
        const isPost = state.comments.filter((post) => post.id === doc.id);

        if (isPost.length === 0) {
          console.log(doc.data());
          state.comments.push({ id: doc.id, ...doc.data() });
        }
      });
    },
    commentsUpdatePending(state, { payload }) {
      state.isLoading = true;
    },

    commentsUpdateSuccess(state, { payload }) {
      state.isLoading = false;
    },

    createCommentsRejected(state, { payload }) {},
  },
});

export const { commentsUpdate, commentsUpdatePending, commentsUpdateSuccess } =
  commentsSlice.actions;
