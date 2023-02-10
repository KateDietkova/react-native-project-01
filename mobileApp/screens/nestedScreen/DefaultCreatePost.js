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


const DefaultCreatePost = ({ onLayout, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      setPhoto(photo);
      console.log(photo.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    navigation.addListener("focus", () => setIsLoading(true));
    navigation.addListener("blur", () => setIsLoading(false));
    // return () => {};
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  console.log(photo.uri);

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
                          source={{ uri: photo.uri }}
                        />
                      </View>

                      {photo ? (
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

                      <TouchableOpacity
                        style={styles.addPhotoBtn}
                        onPress={takePhoto}
                      >
                        <CameraIcon />
                      </TouchableOpacity>
                    </View>
                  </Camera>
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

export default DefaultCreatePost;

const styles = StyleSheet.create({
  createPostContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  addPhotoContainer: {
    paddingHorizontal: 16,
  },
  addPhoto: {
    position: "relative",
    flex: 1,

    paddingVertical: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
  },

  addPhotoBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
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
    right: 2,
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
    height: 400,
    width: 400,
  },
  photo: {
    height: 400,
    width: 400,
  },

  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
  },
});
