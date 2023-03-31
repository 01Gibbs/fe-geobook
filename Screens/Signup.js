import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"



const Signup = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const handlePress = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
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
        <Text>Your email:</Text>
        <TextInput onChangeText={val => setEmail(val)}/>
        <Text>Create password:</Text>
        <TextInput onChangeText={val => setPassword(val)}/>
        <Button title="Sign Up" onPress={handlePress}/>
      </View>
    );
  };

  export default Signup


