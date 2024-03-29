import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import CameraIcon from "../../src/components/icons/CameraIcon";
import DeleteIcon from "react-native-vector-icons/MaterialIcons";
import { CreatePostForm } from "../../src/components/pagesComponents/CreatePostForm";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { styles } from "./CreatePostScreen.styled";

const CreatePostScreen = ({ onLayout, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userId, nickName } = useSelector((state) => state.auth);

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

  const uploadPostToServer = async ({ locationMap, uri, ...state }) => {
    try {
      const createPosts = await addDoc(collection(db, "posts"), {
        locationMap,
        uri,
        userId,
        nickName,
        likes: 0,
        ...state,
      });
    } catch (error) {
      console.log("In uploadPostToServer", error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const result = await fetch(photo.uri);
      // console.log("response", result);
      const photoFile = await result.blob();

      const uniquePostId = Date.now().toString();
      const storageRef = await ref(storage, `postImages/${uniquePostId}`);

      await uploadBytes(storageRef, photoFile);
      const imagesRef = await ref(storageRef);

      // const processedPhoto = await getDownloadURL(imagesRef);
      const downloadURLPromise = getDownloadURL(imagesRef);

      const [processedPhoto] = await Promise.all([downloadURLPromise]);
      return processedPhoto;
    } catch (error) {
      console.log("Error in upload", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (error) {
        console.log("Error in useEffect requestCameraPermission", error);
      }
    })();

    navigation.addListener("focus", () => setIsLoading(true));
    navigation.addListener("blur", () => setIsLoading(false));
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableWithoutFeedback style={{ flex: 1 }}>
          <View style={styles.createPostContainer} onLayout={onLayout}>
            <View>
              <View style={styles.addPhotoContainer}>
                {isLoading && (
                  <Camera
                    style={{ flex: 1 }}
                    type={type}
                    ref={(ref) => {
                      setCameraRef(ref);
                    }}
                  >
                    <View style={styles.addPhoto}>
                      <View style={styles.photoContainer}>
                        <Image
                          style={styles.photo}
                          source={{ uri: photo?.uri }}
                        />
                      </View>
                    </View>
                  </Camera>
                )}

                <View
                  style={{
                    position: "absolute",
                    top: 90,
                    left: "60%",
                    transform: [{ translateX: -50 }],
                  }}
                >
                  <TouchableOpacity
                    style={
                      photo.uri
                        ? {
                            ...styles.addPhotoBtn,
                            opacity: 0.3,
                          }
                        : styles.addPhotoBtn
                    }
                    onPress={takePhoto}
                    disabled={photo?.uri}
                  >
                    <CameraIcon color={photo.uri ? "#fff" : "#BDBDBD"} />
                  </TouchableOpacity>
                </View>

                {photo.uri ? (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      setPhoto("");
                    }}
                  >
                    <DeleteIcon name="delete-outline" size={24} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                      }}
                    >
                      Flip
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.addPhotoText}>Upload photo</Text>
            </View>
            <CreatePostForm
              navigation={navigation}
              setPhoto={setPhoto}
              uploadPhotoToServer={uploadPhotoToServer}
              uploadPostToServer={uploadPostToServer}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

