import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";

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

const styles = StyleSheet.create({
  headerBtn: {
    alignItems: "center",
    marginRight: 20,
    marginLeft: 16,
  },
});
