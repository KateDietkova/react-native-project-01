import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CommentIcon from "../icons/CommentIcon";
import LocationIcon from "../icons/LocationIcon";

export const PostItem = ({ post, navigation }) => {
  console.log(post);
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
            onPress={() => navigation.navigate("Comments")}
          >
            <CommentIcon />
            <Text style={styles.commentAmount}>0</Text>
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
