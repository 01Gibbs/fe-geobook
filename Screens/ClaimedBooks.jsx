import { Text, View, Image, Button, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { getUser } from "../data/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";



const ClaimedBooks = ({ navigation, route }) => {
  const user = auth.currentUser

  const generateBookId = ()=>{
    return Math.random() * 100000
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding:10,
      borderWidth:2,
      borderColor:'#ddd',
      borderTopColor:'transparent',
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 5,
      overflow: 'hidden',
      marginRight: 10,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    book: {
      flex: 1,
    },
    prop:{
      fontWeight:'bold',
    },
    title: {
      fontSize: 12,
      marginBottom: 5,
    },
    author: {
      fontSize: 10,
      color: 'black',
      marginBottom: 5,
    },
    genre: {
      fontSize: 10,
      color: 'black',
    },
    submit: {
      backgroundColor: '#5CDB95',
      alignSelf: 'stretch',
      borderRadius: 5,
      alignItems: 'center',
      padding: 10,
      marginBottom: 5
    },
  });

  const user_id = user.uid
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState(null)
  
  useFocusEffect(
  useCallback(()=>{
    setIsLoading(true)
    getUser(user_id).then(userData => {
      const {name, username, claimed_books} = userData
      setUserProfileInfo({name, username, claimed_books})
      setIsLoading(false)

  }).catch(err => console.log(err))
  },[user_id]))

  return isLoading ? <Text>Loading...</Text> : (
    <SafeAreaView >
      <ScrollView>
      {userProfileInfo.claimed_books.map(book => {
        return (
          <View key={generateBookId()}style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: book.thumbnail }} style={styles.thumbnail} />
          </View>
          <View style={styles.book}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>Author: <Text style={styles.prop}>{book.author}</Text></Text>
            <Text style={styles.genre}>Genre <Text style={styles.prop}>{book.genre} </Text></Text>
          </View>
        </View>
        )
  })}
        <Pressable style={styles.submit} onPress={() => navigation.goBack()} ><Text>GO BACK</Text></Pressable>
        </ScrollView>
    </SafeAreaView>
  );

  
};





export default ClaimedBooks;
