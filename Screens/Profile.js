import { useEffect, useState } from "react";
import { Text, View, Button, Image } from "react-native";
import { getUser } from "../data/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"
import { getAuth } from "firebase/auth";

const Profile = ({navigation}) => {
  const user = auth.currentUser;
  // console.log(user.uid, 'uid')

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      console.log("You're signed out")
    }).catch((error) => {
      console.log(error)
    })
  }

//Wait for auth to get current user firebase id
//set it to getUSer()

  const user_id = '02d1fad1-1022-4e88-93c8-e0fcc0874306'
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState(null)
  
  useEffect(()=>{
    setIsLoading(true)
    getUser(user_id).then(userData => {
      console.log(userData, '<-userdata')
      const {name, username, claimed_books} = userData
      setUserProfileInfo({name, username, claimed_books})
      setIsLoading(false)

  }).catch(err => console.log(err, '<getUser profile error'))
  },[user_id])
    return ( isLoading ?  null :
      <View>
        <Text>This is your profile page!:</Text>
        <Text>{`Name: ${userProfileInfo.name}`}</Text>
        <Text>{`Username: ${userProfileInfo.username}`}</Text>
        <Text>Claimed books:</Text>
        {userProfileInfo.claimed_books.map(book => {
    return (<View key={book.title + book.author}>
    <Text>Title: {book.title}</Text>
    <Text>Author: {book.author}</Text>
    <Text>Genre: {book.genre}</Text>
    <Image  style={{width: '50%', height:'50%'}} source={{uri:book.thumbnail}} alt={`${book.title} picture`} ></Image>
    </View>)
  })}
        <Button title="Log out"
        onPress={handleSignOut}
        />
      </View>
    );
  };

  export default Profile