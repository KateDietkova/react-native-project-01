import {
  postsUpdate,
  postsUpdatePending,
  postsUpdateSuccess,
} from "./postsSlice";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(postsUpdatePending());
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (docs) => {
      dispatch(postsUpdate({ docs }));
    });
    dispatch(postsUpdateSuccess());
  } catch (error) {
    console.log("In getPosts", error);
  }
};
