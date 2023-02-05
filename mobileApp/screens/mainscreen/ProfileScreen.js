import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import CommentIcon from "../../src/components/icons/CommentIcon";
import LocationIcon from "../../src/components/icons/LocationIcon";
import LikesIcon from "../../src/components/icons/LikesIcon";
import CustomIcon from "../../src/components/icons/AddIcon";
import CloseIcon from "../../src/components/icons/CloseIcon";
import Logout from "../../src/components/icons/LogoutIcon";

const ProfileScreen = ({ onLayout, setAuth }) => {
  console.log("ProfileScreen");
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
                    // style={styles.postImage}
                    source={require("../../assets/images/userAvatar.png")}
                  />

                  <TouchableOpacity style={styles.changePhotoBtn}>
                    {/* <CustomIcon style={styles.addIcon} /> */}
                    <CloseIcon style={styles.removeIcon} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={() => setAuth(false)}
                >
                  {/* <CustomIcon style={styles.addIcon} /> */}
                  <Logout style={styles.logoutIcon} />
                </TouchableOpacity>
                <Text style={styles.userName}>Natali Romanova</Text>
                <View style={styles.post}>
                  <View style={styles.postImageContainer}>
                    <Image
                      style={styles.postImage}
                      source={require("../../assets/images/posts/postImage-1.png")}
                    />
                  </View>
                  <Text style={styles.imageDesc}>Forest</Text>
                  <View style={styles.postInfoContainer}>
                    <View style={styles.postInfoBtnContainer}>
                      <TouchableOpacity style={styles.commentBtn}>
                        <CommentIcon />
                        <Text style={styles.commentAmount}>0</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.likesBtn}>
                        <LikesIcon />
                        <Text style={styles.commentAmount}>0</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.postInfo}>
                      <LocationIcon />
                      <Text style={styles.locationInfo}>Ukraine</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.post}>
                  <Image
                    style={styles.postImage}
                    source={require("../../assets/images/posts/postImage-1.png")}
                  />
                  <Text style={styles.imageDesc}>Forest</Text>
                  <View style={styles.postInfoContainer}>
                    <View style={styles.postInfoBtnContainer}>
                      <TouchableOpacity style={styles.commentBtn}>
                        <CommentIcon />
                        <Text style={styles.commentAmount}>0</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.likesBtn}>
                        <LikesIcon />
                        <Text style={styles.commentAmount}>0</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.postInfo}>
                      <LocationIcon />
                      <Text style={styles.locationInfo}>Ukraine</Text>
                    </TouchableOpacity>
                  </View>
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
    resizeMode: "stretch",
    position: "absolute",
    top: 0,
  },
  contentContainer: {
    paddingTop: 150,
  },
  profileContainer: {
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

  post: {
    flex: 1,
    // maxHeight: 300,
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
    left: 160,
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
