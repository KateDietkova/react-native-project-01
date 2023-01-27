import { useCallback } from "react";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();



export default function App() {
  let [fontsLoaded] = useFonts({
    "RobotoRegular": require("./assets/fonts/Roboto-Regular.ttf"),
    "RobotoMedium": require("./assets/fonts/Roboto-Medium.ttf"),
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
    <>
      <RegistrationScreen onLayout={onLayoutRootView} />
      {/* <LoginScreen onLayout={onLayoutRootView} /> */}
    </>
  );
}

