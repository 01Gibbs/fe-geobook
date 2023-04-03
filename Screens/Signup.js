import { useState, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"
import { getUser, postUser } from "../data/api";

const Signup = ({navigation, setIsSignedIn}) => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handlePress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const data = {
          username: username,
          firebase_id: user.uid,
          name: name
        }
        postUser(data).then(()=>{
          console.log(data)
        })
  })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
  });

  }
    return (
      <View>
        <Text>Signup:</Text>
        <Text>Your name:</Text>
        <TextInput onChangeText={val => setName(val)}/>
        <Text>Your username:</Text>
        <TextInput onChangeText={val => setUsername(val)}/>
        <Text>Your email:</Text>
        <TextInput onChangeText={val => setEmail(val)}/>
        <Text>Create password:</Text>
        <TextInput secureTextEntry={true} onChangeText={val => setPassword(val)}/>

        <Button title="Sign Up" onPress={handlePress}/>
      </View>
    );
  };

  export default Signup


