import { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import LocationIcon from "../icons/LocationIcon";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const initialState = {
  title: "",
  location: "",
};

export const CreatePostForm = ({ photo, navigation, setPhoto }) => {
  const [inputName, setInputName] = useState("");
  const [state, setState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const headerHeight = useHeaderHeight();
  const { uri } = photo;

  const checkBtnDisabled = () => {
    if (state.title !== "" && state.location !== "") {
      console.log(state);
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
    }
  };
  const onPublish = () => {
    console.log("Description image:", state);
    navigation.navigate("DefaultScreen", { uri, ...state });
    setIsDisabled(true);
    setState(initialState);
    setPhoto("");
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View
        style={{
          ...styles.form,
        }}
      >
        <View>
          <TextInput
            style={inputName === "title" ? styles.inputFocus : styles.input}
            placeholder={"Title..."}
            placeholderTextColor={"#bdbdbd"}
            value={state.title}
            onFocus={() => {
              setInputName("title");
            }}
            onBlur={() => {
              setInputName("");
              checkBtnDisabled();
            }}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
        </View>
        <View
          style={{
            marginTop: 32,
            position: "relative",
          }}
        >
          <TextInput
            style={
              inputName === "location"
                ? { ...styles.inputFocus, paddingLeft: 28 }
                : { ...styles.input, paddingLeft: 28 }
            }
            placeholder={"Location..."}
            placeholderTextColor={"#bdbdbd"}
            value={state.location}
            onFocus={() => {
              setInputName("location");
            }}
            onBlur={() => {
              setInputName("");
              checkBtnDisabled();
            }}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                location: value,
              }))
            }
          />
          <TouchableOpacity
            style={styles.locationBtn}
            activeOpacity={0.8}
            onPress={() => {
              console.log("in Location Button");
              navigation.navigate("MapCreatePost", {
                nameScreen: "DefaultCreatePost",
              });
            }}
          >
            <LocationIcon style={styles.locationIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={isDisabled ? styles.btnDisabled : styles.btn}
          onPress={() => {
            onPublish();
          }}
          disabled={isDisabled}
        >
          <Text style={isDisabled ? styles.btnTitleDisabled : styles.btnTitle}>
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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

  locationBtn: {
    position: "absolute",
    top: 4,
  },
});
