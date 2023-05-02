import { StyleSheet, Dimensions, Platform } from "react-native";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
    position: "absolute",
    top: 0,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "RobotoRegular",
    fontSize: 18,
    lineHeight: 21,
    padding: 16,
    paddingBottom: 15,
  },
  inputFocus: {
    padding: 16,
    paddingBottom: 15,
    fontFamily: "RobotoRegular",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
    color: "#212121",
    fontSize: 18,
    lineHeight: 21,
  },
  form: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 45,
    paddingTop: 92,
    backgroundColor: "#FFFFFF",
  },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 93,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },

  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
  },

  btnPassword: {
    position: "absolute",
    right: 16,
    top: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
  },

  btnPasswordTitle: {
    color: "#1B4371",
    fontFamily: "RobotoRegular",
    fontSize: 18,
    lineHeight: 21,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "RobotoMedium",
    fontWeight: "medium",
  },
  additionalText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },

  linkBtn: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
  photoContainer: {
    position: "absolute",
    transform: [{ translateX: -50 }],
    left: "50%",
    top: -60,
    borderRadius: 16,
    // backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
  },
  addBtnIcon: {
    position: "absolute",
    top: 75,
    right: -16,
  },
  removeIcon: {
    position: "absolute",
    top: 75,
    right: -16,
    color: "#E8E8E8",
  },

  photoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: 120,
    width: 120,
    borderRadius: 15,
  },
  photo: {
    height: 120,
    width: 120,
  },
});
