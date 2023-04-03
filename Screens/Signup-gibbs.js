import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { postUser } from "../data/api";

const Signup = ({ navigation, setIsSignedIn }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get the ID token for the user
      const idTokenResult = await user.getIdTokenResult();
      const token = idTokenResult.token;

      const data = {
        username: username,
        firebase_id: user.uid, // Use the ID token as the firebase_id
        name: name,
      };

      await postUser(data, token).then(() => {
        console.log(data);
        setIsSignedIn(true);
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <View>
      <Text>Signup:</Text>
      <Text>Your name:</Text>
      <TextInput onChangeText={(val) => setName(val)} />
      <Text>Your username:</Text>
      <TextInput onChangeText={(val) => setUsername(val)} />
      <Text>Your email:</Text>
      <TextInput onChangeText={(val) => setEmail(val)} />
      <Text>Create password:</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(val) => setPassword(val)}
      />

      <Button title="Sign Up" onPress={handlePress} />
    </View>
  );
};

export default Signup;
