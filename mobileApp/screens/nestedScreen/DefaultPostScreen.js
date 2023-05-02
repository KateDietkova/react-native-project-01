import { useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView } from "react-native";

import { PostItem } from "../../src/components/pagesComponents/PostItem";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNickname,
  selectEmail,
  selectCurrentUserAvatar,
} from "../../redux/auth/authSelectors";
import {
  selectPosts,
  selectPostsLoading,
} from "../../redux/dashboard/postsSelectors";
import { getPosts } from "../../redux/dashboard/postsOperations";
import { styles } from "./DefaultPostScreen.styled";

const DefaultScreen = ({ onLayout, navigation, hide }) => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectPostsLoading);
  const userName = useSelector(selectNickname);
  const userEmail = useSelector(selectEmail);
  const userAvatar = useSelector(selectCurrentUserAvatar);
  const dispatch = useDispatch();
  let postsList = [];

  useEffect(() => {
    dispatch(getPosts());
  }, [Date.now()]);

  if (posts && posts.length !== 0) {
    console.log(posts);
    postsList = posts
      .slice()
      .sort(
        (firstPost, secondPost) => secondPost.createAt - firstPost.createAt
      );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      {!hide && !isLoading && (
        <View style={styles.postScreenContainer} onLayout={onLayout}>
          {posts && (
            <FlatList
              style={{ paddingHorizontal: 16 }}
              ListHeaderComponent={
                <>
                  <View style={styles.userInfoContainer}>
                    <Image
                      style={styles.userPhoto}
                      source={
                        userAvatar
                          ? { uri: userAvatar }
                          : require("../../assets/images/default_user_photo.jpg")
                      }
                    />
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{userName}</Text>
                      <Text style={styles.userEmail}>{userEmail}</Text>
                    </View>
                  </View>
                </>
              }
              data={postsList}
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
