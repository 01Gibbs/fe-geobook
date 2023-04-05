import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../data/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { colours } from "../style_sheets/colours";
const { geoGreen, geoGreenPressed } = colours;

const ClaimedBooks = ({ navigation, route }) => {
  const user = auth.currentUser;

  const generateBookId = () => {
    return Math.random() * 100000;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderWidth: 2,
      borderColor: "#ddd",
      borderTopColor: "transparent",
    },
    loading:{
      fontSize:20,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 5,
      overflow: "hidden",
      marginRight: 10,
    },
    thumbnail: {
      width: "100%",
      height: "100%",
    },
    book: {
      flex: 1,
    },
    prop: {
      fontWeight: "bold",
    },
    title: {
      fontSize: 12,
      marginBottom: 5,
    },
    author: {
      fontSize: 10,
      color: "black",
      marginBottom: 5,
    },
    genre: {
      fontSize: 10,
      color: "black",
    },

    noBooks: {
      fontSize: 20,
      color: "gray",
    },
    submit: {
      backgroundColor: "#5CDB95",
      alignSelf: "stretch",
      borderRadius: 5,
      alignItems: "center",
      padding: 10,
      marginTop: 5,
    },
  });

  const handleClaimBooks = () => {
    navigation.navigate("Map");
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

  const noClaimedBooks = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.noBooks}>Oops! No books here.</Text>
      </View>
    );
  };

  const loadingBooks = () => {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  };

  return isLoading ? (
    loadingBooks()
  ) : (
    <SafeAreaView>
      <ScrollView>
        {userProfileInfo.claimed_books.length === 0 ? noClaimedBooks() : null}
        {userProfileInfo.claimed_books.map((book) => {
          return (
            <View key={generateBookId()} style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: book.thumbnail }}
                  style={styles.thumbnail}
                />
              </View>
              <View style={styles.book}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>
                  Author: <Text style={styles.prop}>{book.author}</Text>
                </Text>
                <Text style={styles.genre}>
                  Genre <Text style={styles.prop}>{book.genre} </Text>
                </Text>
              </View>
            </View>
          );
        })}
        <Pressable
          style={({ pressed }) => [
            styles.submit,
            { backgroundColor: pressed ? geoGreenPressed : geoGreen },
          ]}
          onPress={handleClaimBooks}
        >
          <Text>Go claim some books!</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.submit,
            { backgroundColor: pressed ? geoGreenPressed : geoGreen },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text>Go back</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimedBooks;
