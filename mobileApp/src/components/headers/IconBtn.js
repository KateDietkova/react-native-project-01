import { TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { styles } from "./IconBtn.styled";

export const IconBtn = ({ icon: Icon, navigate, setAuth }) => {
  const dispatch = useDispatch();
  
  const navigationCustom = () => {
    if (navigate) {
      return (
        <Link to={{ screen: navigate }}>
          <Icon />
        </Link>
      );
    }
    return <Icon />;
  };
  return (
    <TouchableOpacity
      style={styles.headerBtn}
      onPress={navigate ? null : () => dispatch(authSignOutUser())}
    >
      {navigationCustom()}
    </TouchableOpacity>
  );
};


