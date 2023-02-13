
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const CommentsScreen = ({onLayout}) => {
    return (
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
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.commentTextData}>09 июня, 2020 | 08:40</Text>
            </View>
          </View>
        </View>
      </View>
    );
}

export default CommentsScreen;

const styles = StyleSheet.create({
  commentsScreenContainer: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#fff",
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
    marginTop: 34,
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