import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

import CustomIcon from "../../src/components/icons/AddIcon";
import CloseIcon from "../../src/components/icons/CloseIcon";
import Logout from "../../src/components/icons/LogoutIcon";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { PostItem } from "../../src/components/pagesComponents/PostItem";
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectCurrentUserAvatar,
  selectNickname,
} from "../../redux/auth/authSelectors";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";

const ProfileScreen = ({ onLayout, navigation }) => {
  const [posts, setPosts] = useState([]);
  const currentUserId = useSelector(selectCurrentUserId);
  const userAvatar = useSelector(selectCurrentUserAvatar);
  const userName = useSelector(selectNickname);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        const isPost = posts.filter((post) => post.id === doc.id);
        if (isPost.length === 0) {
          setPosts((prevState) => [
            ...prevState,
            { id: doc.id, ...doc.data() },
          ]);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [Date.now()]);

  const userPosts = posts.filter((post) => post.userId === currentUserId);
  userPosts.sort(
    (firstPost, secondPost) => secondPost.createAt - firstPost.createAt
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container} onLayout={onLayout}>
          <ImageBackground
            style={styles.imageContainer}
            imageStyle={styles.image}
            source={require("../../assets/images/bg-auth.png")}
          >
            <View style={styles.contentContainer}>
              <View style={styles.profileContainer}>
                <View style={styles.photoContainer}>
                  <Image
                    style={styles.userAvatar}
                    source={
                      userAvatar
                        ? { uri: userAvatar }
                        : require("../../assets/images/default_user_photo.jpg")
                    }
                  />

                  <TouchableOpacity style={styles.changePhotoBtn}>
                    {/* <CustomIcon style={styles.addIcon} /> */}
                    <CloseIcon style={styles.removeIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={() => dispatch(authSignOutUser())}
                >
                  <Logout style={styles.logoutIcon} />
                </TouchableOpacity>
                <Text style={styles.userName}>{userName}</Text>
                <View style={{ width: "100%" }}>
                  {userPosts &&
                    userPosts.map((post) => (
                      <PostItem
                        key={post.id}
                        post={post}
                        navigation={navigation}
                      />
                    ))}
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
  },
  image: {
    // resizeMode: "cover",
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentContainer: {
    paddingTop: 150,
  },
  profileContainer: {
    minHeight: Dimensions.get("window").height,
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 43,
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userName: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  post: {
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  postImageContainer: {
    flex: 1,
    alignItems: "center",
  },
  postImage: {
    flex: 1,
    borderRadius: 8,
    width: "100%",
  },
  imageDesc: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  postInfoContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  postInfoBtnContainer: {
    flexDirection: "row",
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInfo: {
    marginLeft: 4,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  commentBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  commentAmount: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  photoContainer: {
    position: "absolute",
    transform: [{ translateX: -50 }],
    left: "50%",
    top: -60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
  },

  removeIcon: {
    color: "#E8E8E8",
  },

  changePhotoBtn: {
    position: "absolute",
    top: 75,
    right: -16,
  },

  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
});
