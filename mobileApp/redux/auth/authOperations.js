// import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app, auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authSlise";

export const authSignUpUser =
  ({ email, password, name, avatar }) =>
  async (dispatch, getState) => {
    try {
      const auth = await getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const updateUserSuccess = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updateUserSuccess.uid,
          nickName: updateUserSuccess.displayName,
          email: updateUserSuccess.email,
        })
      );
    } catch (error) {
      console.log("In Registration", error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = await getAuth(app);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
          email: user.email,
        })
      );
      dispatch(
        authStateChange({
          stateChange: true,
        })
      );
    } catch (error) {
      console.log("In authSignInUser", error);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const auth = await getAuth(app);
    await signOut(auth);
    dispatch(authSignOut());
    dispatch(
      authStateChange({
        stateChange: false,
      })
    );
  } catch (error) {
    console.log("In authSignOutUser", error);
  }
};

export const authSetChangeUser = () => async (dispatch, getState) => {
  try {
    const auth = await getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(
          updateUserProfile({
            userId: user.uid,
            nickName: user.displayName,
            email: user.email,
          })
        );
        dispatch(
          authStateChange({
            stateChange: true,
          })
        );
      }
    });
  } catch (error) {
    console.log("In authSetChangeUser", error);
  }
};
