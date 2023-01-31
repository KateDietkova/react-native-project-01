import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CommentIcon from "../../src/components/icons/CommentIcon";
import LocationIcon from "../../src/components/icons/LocationIcon";

const PostsScreen = ({ onLayout }) => {
  return (
    <View style={styles.postScreenContainer} onLayout={onLayout}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userPhoto}
          source={require("../../assets/images/userPhoto.png")}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.post}>
          <View style={styles.postImageContainer}>
            <Image
              style={styles.postImage}
              source={require("../../assets/images/posts/postImage-1.png")}
            />
          </View>
          <Text style={styles.imageDesc}>Forest</Text>
          <View style={styles.postInfoContainer}>
            <TouchableOpacity style={styles.commentBtn}>
              <CommentIcon />
              <Text style={styles.commentAmount}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postInfo}>
              <LocationIcon />
              <Text style={styles.locationInfo}>
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  postScreenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerTitle: {
    fontFamily: "RobotoMedium",
    fontSize: 20,
    lineHeight: 22,
    color: "#212121",
  },

  userPhoto: {
    width: 60,
    height: 60,
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 43,
    paddingHorizontal: 16,
  },
  post: {
    flex: 1,
    maxHeight: 300,
    width: "100%",
    marginTop: 32,
  },

  postImageContainer: {
    flex: 1,
    alignItems: "center",
  },
    postImage: {
      flex: 1,
      borderRadius: 8,
      width: "100%",
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
