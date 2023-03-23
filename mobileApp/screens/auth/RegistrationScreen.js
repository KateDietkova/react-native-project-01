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
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomIcon from "../../src/components/icons/AddIcon";
import CloseIcon from "../../src/components/icons/CloseIcon";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import { storage } from "../../firebase/config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation, onLayout, setAuth }) {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState({});
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputName, setInputName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

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

  const takePhoto = async () => {
    try {
      if (cameraRef) {
        const photo = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(photo.uri);
        setPhoto(photo);
      }
    } catch (error) {
      console.log("Error in takePhoto");
    }
  };

  const uploadUserPhotoToServer = async () => {
    try {
      const result = await fetch(photo.uri);
      console.log("response", result);
      const photoFile = await result.blob();

      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `usersAvatars/${uniquePostId}`);
      console.log("StorageRef", storageRef);

      await uploadBytes(storageRef, photoFile);
      const imagesRef = ref(storageRef);
      const downloadURLPromise = getDownloadURL(imagesRef);

      const [processedPhoto] = await Promise.all([downloadURLPromise]);
      return processedPhoto;
    } catch (error) {
      console.log("Error in upload", error);
    }
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setInputName("");
    setShowPassword(true);
    Keyboard.dismiss();
  };

  const onSingUp = async () => {
    const userAvatar = await uploadUserPhotoToServer();
    console.log(
      "Credentials",
      `${state.name} + ${state.email} + ${state.password}`
    );
    dispatch(authSignUpUser({ avatar: userAvatar, ...state }));
    setAuth(true);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayout}>
        <ImageBackground
          style={{
            ...styles.imageContainer,
          }}
          imageStyle={styles.image}
          source={require("../../assets/images/bg-auth.png")}
        >
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -150 : 0,
              }}
            >
              <View style={styles.photoContainer}>
                <Camera
                  style={{ flex: 1 }}
                  type={type}
                  ref={(ref) => {
                    setCameraRef(ref);
                  }}
                >
                  <View style={styles.photoWrapper}>
                    <Image style={styles.photo} source={{ uri: photo?.uri }} />
                  </View>
                </Camera>
                {photo.uri ? (
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => setPhoto("")}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addBtnIcon}
                    onPress={takePhoto}
                  >
                    <CustomIcon />
                  </TouchableOpacity>
                )}

                {/* <CloseIcon style={styles.removeIcon}/> */}
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Registration</Text>
              </View>
              <View>
                <TextInput
                  style={
                    inputName === "name" ? styles.inputFocus : styles.input
                  }
                  placeholder={"Name"}
                  placeholderTextColor={"#bdbdbd"}
                  onFocus={() => {
                    setInputName("name");
                    setIsShowKeyboard(true);
                  }}
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
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
                onPress={async () => {
                  keyboardHide();
                  await onSingUp();
                }}
              >
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.2}
                style={styles.linkBtn}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.additionalText}>
                  Have you already account? Sing in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
