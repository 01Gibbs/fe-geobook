import { Text, View, Image, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getUser } from "../data/api";
import { SafeAreaView } from "react-native-safe-area-context";


const ClaimedBooks = ({ navigation, route }) => {

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
      fontWeight: '#ddd',
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
  });

  const user_id = '3cfa269a-bfb1-4a31-a6d2-e776c199e5eb'
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState(null)
  
  useEffect(()=>{
    setIsLoading(true)
    getUser(user_id).then(userData => {
      const {name, username, claimed_books} = userData
      setUserProfileInfo({name, username, claimed_books})
      setIsLoading(false)

  }).catch(err => console.log(err))
  },[user_id])

  return isLoading ? <Text>Loading...</Text> : (
    <View >
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
    </View>
  );

  
};





export default ClaimedBooks;
