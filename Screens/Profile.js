import { useEffect, useState } from "react";
import { Text, View, Button, Image } from "react-native";
import { getUser } from "../data/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"
import { getAuth } from "firebase/auth";

const Profile = ({navigation}) => {
  const user = auth.currentUser;
  console.log(user.uid)

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      console.log("You're signed out")
    }).catch((error) => {
      console.log(error)
    })
  }
  const user_id = "642a9ab871b4a909ae3e0f08"
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState(null)
  
  useEffect(()=>{
    setIsLoading(true)
    getUser(user_id).then(userData => {
      console.log(userData)
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
        {/* {userProfileInfo.claimed_books.map(book => {
    return (<View key={book.title + book.author}>
    <Text>Title: {book.title}</Text>
    <Text>Author: {book.author}</Text>
    <Text>Genre: {book.genre}</Text>
    <Image  style={{width: '50%', height:'50%'}} source={{uri:book.thumbnail}} alt={`${book.title} picture`} ></Image>
    </View>)
  })} */}
        <Button title="Log out"
        onPress={handleSignOut}
        />
      </View>
    );
  };

  export default Profile