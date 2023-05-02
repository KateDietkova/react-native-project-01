import {
  StyleSheet
} from "react-native";


export const styles = StyleSheet.create({
  createPostContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  addPhotoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    position: "relative",
  },
  addPhoto: {
    position: "relative",
    flex: 1,

    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },

  addPhotoBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  addPhotoText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
    paddingLeft: 16,
  },
  flipContainer: {
    position: "absolute",
    bottom: 5,
    right: 20,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: 240,
    width: 360,
  },
  photo: {
    height: 240,
    width: 360,
  },

  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
  },
});
