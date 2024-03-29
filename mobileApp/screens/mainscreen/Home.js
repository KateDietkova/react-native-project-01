import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import ArrowLeft from "../../src/components/icons/ArrowLeftIcon";
import { HeaderTitle } from "../../src/components/headers/HeaderTitle";
import { IconBtn } from "../../src/components/headers/IconBtn";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

import UserTabBarIcon from "../../src/components/tabBarIcons/UserTabBarIcon";
import PostsTabBarIcon from "../../src/components/tabBarIcons/PostsTabBarIcon";
import Ionicons from "react-native-vector-icons/Ionicons"; // add
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./Home.styled";

const MainTab = createBottomTabNavigator();

const Home = ({ onLayout, setAuth }) => {
  const [isHideTabBar, setIsHideTabBar] = useState(false);
  return (
    <MainTab.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isHideTabBar ? "none" : "flex",
          height: 83,
          borderTopWidth: 1,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        options={({ navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
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
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => (
          <PostsScreen
            {...props}
            onLayout={onLayout}
            setAuth={setAuth}
            isHideBar={setIsHideTabBar}
            hide={isHideTabBar}
          />
        )}
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
            <IconBtn {...props} icon={ArrowLeft} navigate={"DefaultScreen"} />
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
        {(props) => <ProfileScreen {...props} onLayout={onLayout} />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default Home;
