import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { HeaderTitle } from "../../src/components/headers/HeaderTitle";

import CommentsScreen from "./CommentsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import { IconBtn } from "../../src/components/headers/IconBtn";
import Logout from "../../src/components/icons/LogoutIcon";
import ArrowLeft from "../../src/components/icons/ArrowLeftIcon";
import UserTabBarIcon from "../../src/components/tabBarIcons/UserTabBarIcon";
import PostsTabBarIcon from "../../src/components/tabBarIcons/PostsTabBarIcon";
import Ionicons from "react-native-vector-icons/Ionicons"; // add

const MainTab = createBottomTabNavigator();

const Home = ({ onLayout, setAuth }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 83, borderTopWidth: 1 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        options={{
          headerTitle: (props) => <HeaderTitle {...props} title={"Posts"} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerRight: (props) => (
            <IconBtn {...props} icon={Logout} setAuth={setAuth} />
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? { ...styles.tabBarIconWrapper, left: 55 }
                  : {
                      ...styles.tabBarIconWrapper,
                      backgroundColor: "none",
                      left: 55,
                    }
              }
            >
              <PostsTabBarIcon color={focused ? "#fff" : "#212121"} />
            </View>
          ),
        }}
      >
        {(props) => <PostsScreen {...props} onLayout={onLayout} />}
      </MainTab.Screen>
      <MainTab.Screen
        name="CreatePost"
        options={{
          headerTitle: (props) => (
            <HeaderTitle {...props} title={"Create Post"} />
          ),
          headerTitleAlign: "center",
          headerStyle: styles.headerScreen,
          headerLeft: (props) => (
            <IconBtn {...props} icon={ArrowLeft} navigate={"Posts"} />
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? { ...styles.tabBarIconWrapper }
                  : { ...styles.tabBarIconWrapper, backgroundColor: "none" }
              }
            >
              <Ionicons
                name="add"
                color={
                  focused ? "rgba(255, 255, 255, 0.8)" : "rgba(33, 33, 33, 0.8)"
                }
                size={24}
              />
            </View>
          ),
        }}
      >
        {(props) => <CreatePostsScreen {...props} onLayout={onLayout} />}
      </MainTab.Screen>
      <MainTab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? { ...styles.tabBarIconWrapper, right: 55 }
                  : {
                      ...styles.tabBarIconWrapper,
                      backgroundColor: "none",
                      right: 55,
                    }
              }
            >
              <UserTabBarIcon color={focused ? "#fff" : "#212121"} />
            </View>
          ),
        }}
      >
        {(props) => (
          <ProfileScreen {...props} onLayout={onLayout} setAuth={setAuth} />
        )}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default Home;

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
