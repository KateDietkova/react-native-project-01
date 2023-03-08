import { useState, useEffect } from "react";
import { useRoute } from "../../src/route";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { authSetChangeUser } from "../../redux/auth/authOperations";

const Main = ({ onLayoutRootView }) => {
  const { stateChange } = useSelector((state) => state.auth);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
//   console.log(stateChange);

  useEffect(() => {
    console.log(stateChange);
    dispatch(authSetChangeUser());
  }, []);

  const routing = useRoute(stateChange, onLayoutRootView, setIsAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
