import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  email: null,
  avatar: null,
  stateChange: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUserProfile(state, { payload }) {
      state.userId = payload.userId;
      state.nickName = payload.nickName;
      state.email = payload.email;
      state.avatar = payload.avatar;
    },

    authStateChange(state, { payload }) {
      state.stateChange = payload.stateChange;
    },

    authSignOut(state, action) {
      state.userId = initialState.userId;
      state.nickName = initialState.nickName;
      state.stateChange = initialState.stateChange;
      state.email = initialState.email;
    },
  },

  //   extraReducers: {
  //     [authSignUpUser.fulfilled](state, action) {
  //       console.log(action.payload);
  //       state.userId = action.payload.user.userId;
  //     },
  //   },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;
