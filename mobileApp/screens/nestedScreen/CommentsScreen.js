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
} from "react-native";
import ArrowSend from "../../src/components/icons/ArrowUpSend";

const CommentsScreen = ({ onLayout, route, isHideBar }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (route.name === "Comments") {
      isHideBar(true);
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.commentsScreenContainer} onLayout={onLayout}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.postImage}
              source={require("../../assets/images/posts/postImage-1.png")}
            />
          </View>
          <View style={styles.postCommentsContainer}>
            <View style={styles.commentItem}>
              <Image
                style={styles.userPhoto}
                source={require("../../assets/images/userPhotoComment.png")}
              />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>
                  Really love your most recent photo. I’ve been trying to
                  capture the same thing for a few months and would love some
                  tips!
                </Text>
                <Text style={styles.commentTextData}>
                  09 июня, 2020 | 08:40
                </Text>
              </View>
            </View>
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
              <TouchableOpacity style={styles.commentBtnSend}>
                <ArrowSend />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  commentsScreenContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    height: Dimensions.get("window").height - 88,
  },
  imageContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  postImage: {
    borderRadius: 8,
    height: 240,
    width: Dimensions.get("window").width - 32,
  },

  postCommentsContainer: {
    flex: 1,
    marginTop: 34,
    marginBottom: 31,
    paddingHorizontal: 16,
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
    // width: 34,
    // height: 34,
    top: "50%",
    transform: [{translateY: -18}],
    right: 25,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
