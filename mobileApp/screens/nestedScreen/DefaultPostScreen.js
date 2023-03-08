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
import { useSelector } from "react-redux";
import { selectNickname, selectEmail } from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";

const DefaultScreen = ({ onLayout, route, navigation, hide }) => {
  const [posts, setPosts] = useState([]);
  const userName = useSelector(selectNickname);
  const userEmail = useSelector(selectEmail);

  const getAllPosts = async () => {
    //  const querySnapshot = await getDocs(collection(db, "posts"));
    //  querySnapshot.forEach((doc) => {
    //    // doc.data() is never undefined for query doc snapshots
    //    posts.push(doc.data());
    //  });
  };

  useEffect(() => {
    (async () => {
      console.log(Date.now());
      const q = query(collection(db, "posts"));
      // const filteredByCreatedTime = [];
      const unsubscribe = onSnapshot(q, (docs) => {
        docs.forEach((doc) => {
          console.log("Posts", posts);
          const isPost = posts.filter((post) => post.id === doc.id);
          console.log(isPost);
          if (isPost.length === 0) {
            posts.push({ id: doc.id, ...doc.data() });
          }
        });
        posts.sort(
          (firstPost, secondPost) => secondPost.createAt - firstPost.createAt
        );
      });
      setPosts(posts);
    })();
  }, []);

  console.log(posts);

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
                      <Text style={styles.userName}>{userName}</Text>
                      <Text style={styles.userEmail}>{userEmail}</Text>
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
