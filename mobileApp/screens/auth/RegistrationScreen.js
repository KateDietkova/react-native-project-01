import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
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
import { styles } from "./RegistrationScreen.styled";

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

