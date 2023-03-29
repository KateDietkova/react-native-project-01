import {
  commentsUpdate,
  commentsUpdatePending,
  commentsUpdateSuccess,
} from "./commentsSlice";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

export const getComments =
  ({ postId }) =>
  async (dispatch) => {
    try {
      dispatch(commentsUpdatePending());
      const q = query(collection(db, "posts", postId, "comments"));
      const unsubscribe = onSnapshot(q, (docs) => {
        console.log(docs);
        dispatch(commentsUpdate({ docs }));
      });
      dispatch(commentsUpdateSuccess());
    } catch (error) {
      console.log("In getComments", error);
    }
  };

export const createComment =
  ({ postId, currentNickName, currentUserId, currentUserAvatar, comment }) =>
  async (dispatch) => {
    console.log(postId);
    try {
      const createComment = await addDoc(
        collection(db, "posts", postId, "comments"),
        {
          postId,
          ownerNickName: currentNickName,
          ownerId: currentUserId,
          createAt: Date.now(),
          text: comment,
          ownerAvatar: currentUserAvatar
            ? currentUserAvatar
            : "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg",
        }
      );
    } catch (error) {
      console.log("In createComment", error);
    }
  };
