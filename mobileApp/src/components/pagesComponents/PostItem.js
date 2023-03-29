import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CommentIcon from "../icons/CommentIcon";
import LocationIcon from "../icons/LocationIcon";
import LikesIcon from "../../../src/components/icons/LikesIcon";
import { db } from "../../../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../redux/auth/authSelectors";

export const PostItem = ({ post, navigation }) => {
  const [comments, setComments] = useState([]);
  const [isALreadyLikedId, setIsALreadyLikedId] = useState([]);
  const currentUserId = useSelector(selectCurrentUserId);
  const likes = isALreadyLikedId.length;

  const updatePostLikes = async () => {
    const postRef = doc(db, "posts", post.id);
    const isLikedUserId = isALreadyLikedId.includes(currentUserId);

    const filteredUserId = isALreadyLikedId.filter(
      (id) => id !== currentUserId
    );
    const newListId = isLikedUserId
      ? filteredUserId
      : [currentUserId, ...isALreadyLikedId];

    await updateDoc(postRef, {
      likesInfo: {
        whoLiked: newListId.length >= 0 ? [...newListId] : [],
      },
    });

    setIsALreadyLikedId(newListId);
  };

  const getPostLikes = () => {
    try {
      const unsubscribePostLikes = onSnapshot(
        doc(db, "posts", post.id),
        (doc) => {
          const whoLikedList = doc.data().likesInfo?.whoLiked;
          if (whoLikedList && isALreadyLikedId.length === 0) {
            setIsALreadyLikedId((whoLikedList && [...whoLikedList]) || []);
          }
        }
      );

      return unsubscribePostLikes;
    } catch (error) {
      console.log("getPostLikes", error);
    }
    
  };

  useEffect(() => {
    const q = query(collection(db, "posts", post.id, "comments"));
    const unsubscribe = onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        const isComment = comments.filter((comment) => comment.id === doc.id);
        if (isComment.length === 0) {
          setComments((prevState) => [
            ...prevState,
            { id: doc.id, ...doc.data() },
          ]);
        }
      });
    });

    const unsubscribePostLikes = getPostLikes();
    return () => {
      unsubscribe();
      unsubscribePostLikes();
    };
  }, [Date.now()]);

  return (
    <View style={styles.postItemContainer}>
      <View style={styles.postItem}>
        <View style={styles.postImageContainer}>
          <Image
            style={styles.postImage}
            source={
              post.uri
                ? { uri: post.uri }
                : require("../../../assets/images/posts/default_image.png")
            }
          />
        </View>
        <Text style={styles.imageDesc}>{post.title}</Text>
        <View style={styles.postInfoContainer}>
          <View style={styles.postInfoBtnContainer}>
            <TouchableOpacity
              style={styles.commentBtn}
              onPress={() =>
                navigation.navigate("Comments", {
                  postId: post.id,
                  postImage: post.uri,
                  userId: post.userId,
                  ownerNickName: post.nickName,
                })
              }
            >
              <CommentIcon commentsAmount={comments.length} />
              <Text
                style={
                  comments.length > 0
                    ? { ...styles.commentAmount, color: "#212121" }
                    : styles.commentAmount
                }
              >
                {comments.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.likesBtn}
              onPress={async () => {
                await updatePostLikes();
              }}
            >
              <LikesIcon likes={likes} />
              <Text
                style={
                  likes > 0
                    ? { ...styles.commentAmount, color: "#212121" }
                    : styles.commentAmount
                }
              >
                {likes}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.postInfo}
            onPress={() =>
              navigation.navigate("Map", {
                nameScreen: "DefaultScreen",
                location: post.locationMap,
              })
            }
          >
            <LocationIcon />
            <Text style={styles.locationInfo}>{post.location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  postItem: {
    position: "relative",
    flex: 1,
    height: 300,
    width: "100%",
    marginTop: 32,
    justifyContent: "flex-end",
  },

  postImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: "100%",
    // width: Dimensions.get("window").width,
    borderRadius: 8,
    alignItems: "center",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    height: 240,
    width: "100%",
  },
  imageDesc: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  postInfoContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInfoBtnContainer: {
    flexDirection: "row",
  },
  locationInfo: {
    marginLeft: 4,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  commentBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  commentAmount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
});
