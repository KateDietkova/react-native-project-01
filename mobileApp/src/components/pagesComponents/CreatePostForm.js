import { useState, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import LocationIcon from "../icons/LocationIcon";
import * as Location from "expo-location";
import { styles } from "./CreatePostForm.styled";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";


const initialState = {
  title: "",
  location: "",
};

export const CreatePostForm = ({
  navigation,
  setPhoto,
  uploadPhotoToServer,
  uploadPostToServer,
}) => {
  const [locationMap, setLocationMap] = useState({});
  const [inputName, setInputName] = useState("");
  const [state, setState] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude ? location.coords.latitude : 0,
          longitude: location.coords.longitude ? location.coords.longitude : 0,
        };
        setLocationMap(coords);
      } catch (error) {
        console.log("Error in set coordinate", error);
      }
    };

    getLocation();
  }, []);

  const checkBtnDisabled = () => {
    if (state.title !== "" && state.location !== "") {
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
    }
  };

  const onPublish = async () => {
    const uri = await uploadPhotoToServer();
    await uploadPostToServer({ locationMap, uri, createAt: Date.now(), ...state });
    navigation.navigate("DefaultScreen");
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

          <LocationIcon style={styles.locationIcon} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={isDisabled ? styles.btnDisabled : styles.btn}
          onPress={async() => {
            await onPublish();
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

