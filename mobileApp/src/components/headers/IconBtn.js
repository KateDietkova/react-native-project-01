import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";

export const IconBtn = ({ icon: Icon, navigate }) => {
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
    <TouchableOpacity style={styles.headerBtn}>{navigation()}</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    alignItems: "center",
    marginRight: 20,
    marginLeft: 16,
  },
});
