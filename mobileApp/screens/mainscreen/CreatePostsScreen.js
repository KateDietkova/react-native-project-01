
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import CameraIcon from "../../src/components/icons/CameraIcon";
import { CreatePostForm } from "../../src/components/pagesComponents/CreatePostForm";


const CreatePostsScreen = ({ onLayout }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableWithoutFeedback style={{ flex: 1 }}>
          <View style={styles.createPostContainer} onLayout={onLayout}>
            <View>
              <View style={styles.addPhotoContainer}>
                <View style={styles.addPhoto}>
                  <TouchableOpacity style={styles.addPhotoBtn}>
                    <CameraIcon />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.addPhotoText}>Upload photo</Text>
            </View>
            <CreatePostForm />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  createPostContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  addPhotoContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  addPhoto: {
    flex: 1,
    width: "100%",
    paddingVertical: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
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
});

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         setIsShowKeyboard(true);
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         setIsShowKeyboard(false);
//       }
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);
