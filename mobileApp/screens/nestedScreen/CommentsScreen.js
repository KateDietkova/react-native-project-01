import { useState, useEffect } from "react";
import {
  View,
  Text,
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
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUserId,
  selectNickname,
  selectCurrentUserAvatar,
} from "../../redux/auth/authSelectors";
import {
  getComments,
  createComment,
} from "../../redux/dashboard/commentsOperations";
import {
  selectComments,
  selectCommentsLoading,
} from "../../redux/dashboard/commentsSelectors";
import { CommentItem } from "../../src/components/pagesComponents/CommentItem";
import { styles } from "./CommentsScreen.styled";

const screenHeight = Dimensions.get("window").height;

const CommentsScreen = ({ onLayout, route, isHideBar }) => {
  const [comment, setComment] = useState("");
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsLoading);
  const { postId, postImage } = route.params;
  const currentUserId = useSelector(selectCurrentUserId);
  const currentNickName = useSelector(selectNickname);
  const currentUserAvatar = useSelector(selectCurrentUserAvatar);
  const dispatch = useDispatch();
  let commentsList;

  const createComments = async () => {

    dispatch(
      createComment({
        postId,
        currentUserId,
        currentNickName,
        currentUserAvatar,
        comment,
      })
    );
    setComment("");
  };

  useEffect(() => {
    if (route.name === "Comments") {
      isHideBar(true);
    }

    return () => {
      isHideBar(false);
    };
  }, []);

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, [Date.now()]);

  if (comments && comments.length !== 0) {
    console.log(comments);
    commentsList = comments
      .slice()
      .sort(
        (firstComment, secondComment) =>
          firstComment.createAt - secondComment.createAt
      );
  }
  console.log("isLoading", isLoading);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.commentsScreenContainer} onLayout={onLayout}>
        {!isLoading && (
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
            data={commentsList}
            renderItem={({ item, index }) => (
              <CommentItem key={index} comment={item} />
            )}
            keyExtractor={(item, indx) => indx.toString()}
          />
        )}
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

