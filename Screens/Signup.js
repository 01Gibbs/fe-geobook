import { useState, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import { auth } from "../firebaseConfig"

const Signup = ({navigation, setIsSignedIn}) => {
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handlePress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
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
        <TextInput secureTextEntry={true} onChangeText={val => setPassword(val)}/>
        <Button title="Sign Up" onPress={handlePress}/>
      </View>
    );
  };

  export default Signup


