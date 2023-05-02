import { styles } from "./PostsScreen.styled";
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

const PostScreen = ({ onLayout, setAuth, isHideBar, hide}) => {
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
        {(props) => (
          <DefaultScreen
            {...props}
            onLayout={onLayout}
            isHideBar={isHideBar}
            hide={hide}
          />
        )}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name="Comments"
        options={({ navigation }) => ({
          headerTitle: (props) => <HeaderTitle {...props} title={"Comments"} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                isHideBar(false);
                navigation.navigate("DefaultScreen");
              }}
            >
              <ArrowLeft />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => (
          <CommentsScreen
            {...props}
            onLayout={onLayout}
            isHideBar={isHideBar}
          />
        )}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name="Map"
        options={({ navigation }) => ({
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


