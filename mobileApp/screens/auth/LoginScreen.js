import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function RegistrationScreen({ onLayout }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputName, setInputName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setInputName("");
    setShowPassword(true);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const onSingUp = () => {
    console.log("Credentials", `${state.email} + ${state.password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayout}>
        <ImageBackground
          style={{
            ...styles.image,
            marginBottom: isShowKeyboard ? -300 : -50,
          }}
          source={require("../../assets/images/bg-auth.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            enabled={true}
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -250 : 30,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Login </Text>
              </View>
              <View>
                <TextInput
                  style={
                    inputName === "email" ? styles.inputFocus : styles.input
                  }
                  placeholder={"Email"}
                  placeholderTextColor={"#bdbdbd"}
                  onFocus={() => {
                    setInputName("email");
                    setIsShowKeyboard(true);
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16, position: "relative" }}>
                <TextInput
                  style={
                    inputName === "password" ? styles.inputFocus : styles.input
                  }
                  placeholder={"Password"}
                  placeholderTextColor={"#bdbdbd"}
                  secureTextEntry={
                    showPassword && setInputName !== "password" ? false : true
                  }
                  onFocus={() => {
                    setInputName("password");
                    setIsShowKeyboard(true);
                    setShowPassword(false);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.btnPassword}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.btnPasswordTitle}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => {
                  keyboardHide();
                  onSingUp();
                }}
              >
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <Text style={styles.additionalText}>
                Have you already account? Sing in
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
      justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
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
    paddingBottom: 111,
    paddingTop: 32,
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
    marginTop: 16,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    textAlign: "center",
  },
});