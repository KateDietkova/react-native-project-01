import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import ArrowSend from "../../src/components/icons/ArrowUpSend";
import { db } from "../../firebase/config";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectNickname,
  selectCurrentUserAvatar,
} from "../../redux/auth/authSelectors";
import { CommentItem } from "../../src/components/pagesComponents/CommentItem";

const screenHeight = Dimensions.get("window").height;

const CommentsScreen = ({ onLayout, route, isHideBar }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { postId, userId, ownerNickName, postImage } = route.params;
  const currentUserId = useSelector(selectCurrentUserId);
  const currentNickName = useSelector(selectNickname);
  const currentUserAvatar = useSelector(selectCurrentUserAvatar);
  console.log("Comments", comments);

  const createComments = async () => {
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
    setComment("");
  };

  const getAllComments = async () => {
    try {
      const q = query(collection(db, "posts", postId, "comments"));
      const unsubscribe = onSnapshot(q, (docs) => {
        docs.forEach((doc) => {
          console.log("Doc", doc);
          const isComment = comments.filter((comment) => comment.id === doc.id);
          if (isComment.length === 0) {
            
            comments.push({ id: doc.id, ...doc.data() });
          }
        });
        comments.sort(
          (firstComment, secondComment) =>
            firstComment.createAt - secondComment.createAt
        );
      });
      setComments(comments);
    } catch (error) {
      console.log("Error in getAllComments in CommebtScreen", error);
    }
  };

  useEffect(() => {
    if (route.name === "Comments") {
      isHideBar(true);
    }

    (async () => {
      await getAllComments();
    })();

    return () => {
      isHideBar(false);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.commentsScreenContainer} onLayout={onLayout}>
        <FlatList
          style={{
            paddingHorizontal: 16,
            flex: 1,
          }}
          ListHeaderComponent={
            <>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.postImage}
                  source={
                    postImage
                      ? { uri: postImage }
                      : require("../../assets/images/posts/default_image.png")
                  }
                />
              </View>
            </>
          }
          data={comments}
          renderItem={({ item, index }) => (
            <CommentItem key={index} comment={item} />
          )}
          keyExtractor={(item, indx) => indx.toString()}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.commentForm}>
          <TextInput
            style={styles.commentInput}
            onChangeText={(value) => setComment(value)}
            placeholder={"Comment..."}
            placeholderTextColor={"#bdbdbd"}
            value={comment}
          />
          <TouchableOpacity
            style={styles.commentBtnSend}
            onPress={() => createComments()}
          >
            <ArrowSend />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  commentsScreenContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    height: screenHeight - (screenHeight / 100) * 8,
  },
  imageContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 34,
  },
  postImage: {
    borderRadius: 8,
    height: 240,
    width: Dimensions.get("window").width - 32,
  },

  postCommentsContainer: {
    flex: 1,
    // marginTop: 34,
    marginBottom: 31,
    // paddingHorizontal: 16,
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  commentTextContainer: {
    flex: 1,
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
  },
  commentTextData: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
    marginTop: 8,
  },
  commentForm: {
    position: "relative",
    paddingHorizontal: 16,
  },
  commentInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 100,
    fontSize: 16,
    lineHeight: 19,
  },

  commentBtnSend: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -18 }],
    right: 25,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
