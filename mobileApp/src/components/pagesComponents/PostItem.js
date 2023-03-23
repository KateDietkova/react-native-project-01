import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CommentIcon from "../icons/CommentIcon";
import LocationIcon from "../icons/LocationIcon";
import { db } from "../../../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export const PostItem = ({ post, navigation }) => {
  const [comments, setComments] = useState([]);

  const getAllComments = async () => {
    try {
      const q = query(collection(db, "posts", post.id, "comments"));
      const unsubscribe = onSnapshot(q, (docs) => {
        docs.forEach((doc) => {
          const isComment = comments.filter((comment) => comment.id === doc.id);
          if (isComment.length === 0) {
            // console.log("Doc", doc);
            comments.push({ id: doc.id, ...doc.data() });
          }
        });
      });
      setComments(comments);
    } catch (error) {
      console.log("Error in getAllComments PostItem", error);
    }
    
  };

  useEffect(() => {
    (async () => {
      await getAllComments();
    })();
  }, []);

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
    width: 350,
    marginTop: 32,
    justifyContent: "flex-end",
  },

  postImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: 350,
    borderRadius: 8,
    alignItems: "center",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    height: 240,
    width: 350,
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
  commentAmount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
});
