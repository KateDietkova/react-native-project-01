import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CommentIcon from "../icons/CommentIcon";
import LocationIcon from "../icons/LocationIcon";

export const PostItem = ({ post }) => {
  console.log(post);
  return (
    <View style={styles.post}>
      <View style={styles.postImageContainer}>
        <Image style={styles.postImage} source={{ uri: post.uri }} />
      </View>
      <Text style={styles.imageDesc}>{post.title}</Text>
      <View style={styles.postInfoContainer}>
        <TouchableOpacity style={styles.commentBtn}>
          <CommentIcon />
          <Text style={styles.commentAmount}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postInfo}>
          <LocationIcon />
          <Text style={styles.locationInfo}>
            {post.location}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
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
