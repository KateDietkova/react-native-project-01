import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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

const CreatePostScreen = ({ onLayout, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
              photo={photo}
              navigation={navigation}
              setPhoto={setPhoto}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
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
