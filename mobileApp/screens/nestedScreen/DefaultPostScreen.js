import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { PostItem } from "../../src/components/pagesComponents/PostItem";

const DefaultScreen = ({ onLayout, route, navigation }) => {
  console.log(route.params);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.postScreenContainer} onLayout={onLayout}>
          <View style={styles.userInfoContainer}>
            <Image
              style={styles.userPhoto}
              source={require("../../assets/images/userPhoto.png")}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
          <View style={styles.postsContainer}>
            {posts && (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <PostItem post={item} navigation={navigation} />
                )}
                keyExtractor={(indx) => indx.toString()}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  postScreenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerTitle: {
    fontFamily: "RobotoMedium",
    fontSize: 20,
    lineHeight: 22,
    color: "#212121",
  },

  userPhoto: {
    width: 60,
    height: 60,
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 43,
    paddingHorizontal: 16,
  },
});
