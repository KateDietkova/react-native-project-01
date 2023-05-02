import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { styles } from "./ProfileScreen.styled";

import CustomIcon from "../../src/components/icons/AddIcon";
import CloseIcon from "../../src/components/icons/CloseIcon";
import Logout from "../../src/components/icons/LogoutIcon";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { PostItem } from "../../src/components/pagesComponents/PostItem";
import {
  selectCurrentUserId,
  selectCurrentUserAvatar,
  selectNickname,
} from "../../redux/auth/authSelectors";
import { selectPosts } from "../../redux/dashboard/postsSelectors";

const ProfileScreen = ({ onLayout, navigation }) => {
  const posts = useSelector(selectPosts);
  const currentUserId = useSelector(selectCurrentUserId);
  const userAvatar = useSelector(selectCurrentUserAvatar);
  const userName = useSelector(selectNickname);
  const dispatch = useDispatch();
  let userPosts = [];

  userPosts.sort(
    (firstPost, secondPost) => secondPost.createAt - firstPost.createAt
  );

  if (posts && posts.length !== 0) {
    userPosts = posts.filter((post) => post.userId === currentUserId);
    userPosts
      .slice()
      .sort(
        (firstPost, secondPost) => secondPost.createAt - firstPost.createAt
      );
  }

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

