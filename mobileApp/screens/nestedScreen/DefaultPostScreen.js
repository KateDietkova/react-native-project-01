import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { PostItem } from "../../src/components/pagesComponents/PostItem";

const DefaultScreen = ({ onLayout, route, navigation, hide }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      {!hide && (
        <View style={styles.postScreenContainer} onLayout={onLayout}>
          {posts && (
            <FlatList
              style={{ paddingHorizontal: 16 }}
              ListHeaderComponent={
                <>
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
                </>
              }
              data={posts}
              renderItem={({ item, index }) => (
                <PostItem key={index} post={item} navigation={navigation} />
              )}
              keyExtractor={(item, indx) => indx.toString()}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  postScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 43,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});
