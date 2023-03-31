import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig"

const Login = ({ navigation, setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsSignedIn(true);
        console.log('You are signed in!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View>
      <Text>Login:</Text>
      <Text>Your email:</Text>
      <TextInput onChangeText={(val) => setEmail(val)} />
      <Text>Password :</Text>
      <TextInput onChangeText={(val) => setPassword(val)} />

      <Button title="Login" onPress={handleSignIn} />
      <Button title="SignUp" onPress={handleSignUp} />
    </View>
  );
};

export default Login;
