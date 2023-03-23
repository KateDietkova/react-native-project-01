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
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectNickname,
  selectCurrentUserAvatar,
} from "../../../redux/auth/authSelectors";
// import ArrowSend from "../../src/components/icons/ArrowUpSend";
// import { db } from "../../firebase/config";
// import { useSelector } from "react-redux";
// import {
//   selectCurrentUserId,
//   selectNickname,
// } from "../../redux/auth/authSelectors";

export const CommentItem = ({ comment }) => {
  const currentUserId = useSelector(selectCurrentUserId);
  console.log("commentOwner", comment);
  const date = new Date(comment.createAt).toString();
  const index = date.indexOf("GMT");
  const sliceDate = date.substring(0, index);
  const isOwner = currentUserId === comment.ownerId;
  console.log("Is Owner",isOwner);

  return (
    <View
      style={
        !isOwner
          ? styles.commentItem
          : { ...styles.commentItem, flexDirection: "row-reverse" }
      }
    >
      <Image style={styles.userPhoto} source={{ uri: comment.ownerAvatar }} />
      <View
        style={
          !isOwner
            ? styles.commentTextContainer
            : { ...styles.commentTextContainer, marginLeft: 0, marginRight: 16 }
        }
      >
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text
          style={
            !isOwner
              ? styles.commentTextData
              : { ...styles.commentTextData, textAlign: "left" }
          }
        >
          {sliceDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userPhoto: {
    borderRadius: 50,
    height: 28,
    width: 28,
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
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
});
