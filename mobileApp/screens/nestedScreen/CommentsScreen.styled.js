import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
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
