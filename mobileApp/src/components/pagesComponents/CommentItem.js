// import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
} from "../../../redux/auth/authSelectors";
import { styles } from "./CommentItem.styled";


export const CommentItem = ({ comment }) => {
  const currentUserId = useSelector(selectCurrentUserId);
  const date = new Date(comment.createAt).toString();
  const index = date.indexOf("GMT");
  const sliceDate = date.substring(0, index);
  const isOwner = currentUserId === comment.ownerId;

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

