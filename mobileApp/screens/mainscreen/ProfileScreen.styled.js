import { StyleSheet, Dimensions } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
  },
  image: {
    // resizeMode: "cover",
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentContainer: {
    paddingTop: 150,
  },
  profileContainer: {
    minHeight: Dimensions.get("window").height,
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 43,
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userName: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  post: {
    flex: 1,
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
    alignItems: "flex-end",
  },
  postInfoBtnContainer: {
    flexDirection: "row",
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
  likesBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  commentAmount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  photoContainer: {
    position: "absolute",
    transform: [{ translateX: -50 }],
    left: "50%",
    top: -60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
  },

  removeIcon: {
    color: "#E8E8E8",
  },

  changePhotoBtn: {
    position: "absolute",
    top: 75,
    right: -16,
  },

  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});

