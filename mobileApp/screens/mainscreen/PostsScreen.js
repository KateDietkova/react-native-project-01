import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreen/DefaultPostScreen";
import MapScreen from "../nestedScreen/MapScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import { IconBtn } from "../../src/components/headers/IconBtn";
import { HeaderTitle } from "../../src/components/headers/HeaderTitle";
import Logout from "../../src/components/icons/LogoutIcon";
import ArrowLeft from "../../src/components/icons/ArrowLeftIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

const NestedScreen = createStackNavigator();

const PostScreen = ({ onLayout, setAuth }) => {
  return (
    <NestedScreen.Navigator initialRouteName="DefaultScreen">
      <NestedScreen.Screen
        name="DefaultScreen"
        options={{
          headerTitle: (props) => <HeaderTitle {...props} title={"Posts"} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerRight: (props) => (
            <IconBtn {...props} icon={Logout} setAuth={setAuth} />
          ),
        }}
      >
        {(props) => <DefaultScreen {...props} onLayout={onLayout} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen
        name="Map"
        options={({ navigation, }) => ({
          headerTitle: (props) => <HeaderTitle {...props} title={"Map"} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("DefaultScreen");
              }}
            >
              <ArrowLeft />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => <MapScreen {...props} />}
      </NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  headerScreen: {
    height: 88,
    borderBottomWidth: 2,
  },
  tabBarIconWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    top: -9,
  },
});
