import { View, Text } from "react-native";
import { styles } from "./HeaderTitle.styled";

export const HeaderTitle = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};


