import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  postItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  postItem: {
    position: "relative",
    flex: 1,
    height: 300,
    width: "100%",
    marginTop: 32,
    justifyContent: "flex-end",
  },

  postImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240,
    width: "100%",
    // width: Dimensions.get("window").width,
    borderRadius: 8,
    alignItems: "center",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    height: 240,
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
  postInfoBtnContainer: {
    flexDirection: "row",
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
});
