
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import Home from "../screens/mainscreen/Home";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

export const useRoute = (isAuth, layoutFontsFunc, setIsAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <RegistrationScreen
              {...props}
              onLayout={layoutFontsFunc}
              setAuth={setIsAuth}
            />
          )}
        </MainStack.Screen>

        <MainStack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <LoginScreen
              {...props}
              onLayout={layoutFontsFunc}
              setAuth={setIsAuth}
            />
          )}
        </MainStack.Screen>
      </MainStack.Navigator>
    );
  }
  return <Home onLayout={layoutFontsFunc} setAuth={setIsAuth} />;
};
