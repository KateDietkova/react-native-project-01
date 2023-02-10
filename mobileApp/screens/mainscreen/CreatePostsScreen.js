import {
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultCreatePost from "../nestedScreen/DefaultCreatePost";
import MapScreen from "../nestedScreen/MapScreen";
import ArrowLeft from "../../src/components/icons/ArrowLeftIcon";
import { HeaderTitle } from "../../src/components/headers/HeaderTitle";
import { IconBtn } from "../../src/components/headers/IconBtn";


const NestedScreen = createStackNavigator();

const CreatePostsScreen = ({ onLayout, navigation }) => {
  
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultCreatePost"
        options={{
          headerTitle: (props) => (
            <HeaderTitle {...props} title={"Create Post"} />
          ),
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerLeft: (props) => (
            <IconBtn {...props} icon={ArrowLeft} navigate={"DefaultScreen"} />
          ),
        }}
      >
        {(props) => (
          <DefaultCreatePost
            {...props}
            onLayout={onLayout}
            navigation={navigation}
          />
        )}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name="MapCreatePost"
        options={({ navigation, route: { params } }) => ({
          headerTitle: (props) => <HeaderTitle {...props} title={"Map"} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                console.log("Go back");
                navigation.navigate(
                  params?.nameScreen ? params.nameScreen : "DefaultScreen"
                );
              }}
            >
              <ArrowLeft />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => (
          <MapScreen {...props} onLayout={onLayout} navigation={navigation} />
        )}
      </NestedScreen.Screen>
    </NestedScreen.Navigator>
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
    // alignItems: "center",
    paddingHorizontal: 16,
  },
  addPhoto: {
    position: "relative",
    flex: 1,

    paddingVertical: 90,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F6F6F6",
    // backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: "#E8E8E8",
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
