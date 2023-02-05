import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";

export const IconBtn = ({ icon: Icon, navigate, setAuth }) => {
  const navigation = () => {
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
    <TouchableOpacity style={styles.headerBtn} onPress={navigate ? null : ()=> setAuth(false)}>
      {navigation()}
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
