import { useCallback } from "react";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ onLayoutRootView }}
          // onLayout={onLayoutRootView}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ onLayoutRootView }}
          // onLayout={onLayoutRootView}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}


// onLayout={onLayoutRootView}