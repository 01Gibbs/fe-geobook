import { useEffect, useState } from "react";
import { Text, View, Button, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../data/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const Profile = ({ navigation }) => {
  const styles = StyleSheet.create({
    topBar: {
      padding: 0,
      paddingBottom: 5,
      backgroundColor: "#2b5f6b",
    },
    bottomBar: {
      backgroundColor: "#ddd",
      padding: 15,
      paddingBottom: 0,
    },
    avatarContainer: {
      padding: 10,
      paddingTop: 0,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    tinyImg: {
      margin: 10,
      paddingTop: 10,
      paddingBottom: 5,
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
    },
    avatar: {
      margin: 20,
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      color: "#132235",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    location: {
      padding: 0,
      margin: 0,
      color: "#132235",
      fontSize: 14,
      marginBottom: 15,
    },
    userItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    stats: {
      marginTop: 3,
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },
    userItem: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    statValue: {
      padding: 10,
      marginRight: 10,
      fontSize: 22,
      fontWeight: "bold",
    },
    statTitle: {
      fontSize: 14,
      color: "#666",
    },
    logout: {
      justifyContent:"center",
      marginTop: 30,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    logText: {
      fontSize: 16,
      color: "#fff",
    },
  });
  const user = auth.currentUser;

  // useEffect(() => {
    //Get current user id
    //For details and location
  //   console.log(auth);
  // }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("You're signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewClaimedBooks = () => {
    navigation.navigate("ClaimedBooks");
  };

  //Wait for auth to get current user firebase id
  //set it to getUSer()

  const user_id = "3cfa269a-bfb1-4a31-a6d2-e776c199e5eb";
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUser(user_id)
      .then((userData) => {
        const { name, username, claimed_books } = userData;
        setUserProfileInfo({ name, username, claimed_books });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user_id]);

  return isLoading ? null : (
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
        <Text style={styles.location}>(user location)</Text>
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
