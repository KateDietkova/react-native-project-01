import { StyleSheet, Platform } from "react-native";


export const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",

    color: "#212121",
    backgroundColor: "transparent",
    fontFamily: "RobotoRegular",
    fontSize: 18,
    lineHeight: 21,
    paddingBottom: 15,
  },
  inputFocus: {
    paddingBottom: 15,
    fontFamily: "RobotoMedium",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
    color: "#212121",
    fontSize: 18,
    lineHeight: 21,
  },
  form: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    width: "100%",
  },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 93,
    marginTop: 32,
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

  btnDisabled: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 93,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#F6F6F6",
        borderColor: "transparent",
      },
    }),
  },

  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
  },

  btnTitleDisabled: {
    color: Platform.OS === "ios" ? "#4169e1" : "#BDBDBD",
    fontSize: 18,
  },
  container: {
    flex: 1,
  },

  locationIcon: {
    position: "absolute",
    top: 4,
  },
});
