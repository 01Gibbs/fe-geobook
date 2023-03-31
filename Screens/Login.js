import { useState, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { UserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig"

const Login = ({ navigation, setIsSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateUser, setUser] = useContext(UserContext);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsSignedIn(true);
        setUser({...stateUser,_id : user.uid })
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
