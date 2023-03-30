import { useEffect, useState } from "react";
import { Text, View, Button, Image } from "react-native";
import { getUser } from "../data/api";

const Profile = ({navigation, setIsSignedIn}) => {
  const handleSignOut = ()=>{
    setIsSignedIn(false)
  }
  const user_id = "642548555b3c0d0478ba585d"
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


    return ( isLoading ? null :
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