import { useCallback, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../data/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import {styles} from '../style_sheets/profile-styling'

const Profile = ({ navigation }) => {

  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth)
      .catch((error) => {
        console.log(error);
      });
  };

  const viewClaimedBooks = () => {
    navigation.navigate("ClaimedBooks");
  };

  const user_id = user.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getUser(user_id)
        .then((userData) => {
          const { name, username, claimed_books } = userData;
          setUserProfileInfo({ name, username, claimed_books });
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, [user_id])
  );

  const loadingBooks = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  };

  return isLoading ? loadingBooks() : (
    <SafeAreaView>
      <View style={styles.topBar}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.tinyImg}
            source={{
              uri: "https://media.istockphoto.com/photos/funny-cat-is-learning-english-cat-reading-a-book-picture-id526831692",
            }}
          />
        </View>
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.name}>Hello, {userProfileInfo.name}!</Text>
        <Text style={styles.location}>Leeds</Text>
      </View>
      <View style={styles.stats}>
        <Pressable
          onPress={viewClaimedBooks}
          style={({ pressed }) => [
            styles.userItem,
            { backgroundColor: pressed ? "#ddd" : "#fff" },
          ]}
        >
          <Text style={styles.statValue}>
            {userProfileInfo.claimed_books.length}
          </Text>
          <Text style={styles.statTitle}>Claimed</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.userItem,
            { backgroundColor: pressed ? "#ddd" : "#fff" },
          ]}
        >
          <Text style={styles.statValue}>X</Text>
          <Text style={styles.statTitle}>Hides</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.logout,
          { backgroundColor: pressed ? "#83dbab" : "#5CDB95" },
        ]}
      >
        <Text style={styles.logText}>Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
