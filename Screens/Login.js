import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    email: { msg: "", style: "none" },
    password: { msg: "", style: "none" },
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setFirebaseError("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage === "Firebase: Error (auth/invalid-email).") {
            setFirebaseError("Please enter a valid email");
          } else if (
            errorMessage === "Firebase: Error (auth/wrong-password)."
          ) {
            setFirebaseError("Password incorrect");
          } else if (
            errorMessage === "Firebase: Error (auth/user-not-found)."
          ) {
            setFirebaseError("User not found, please sign up");
          } else if (errorMessage && !password) {
            setFirebaseError("Password field must not be empty");
          } else if (errorMessage) {
            setFirebaseError(error.message);
          }
        });
    } else {
      if (!email && !password) {
        setErrorMsg({
          ...errorMsg,
          email: { msg: "Required", style: "error" },
          password: { msg: "Required", style: "error" },
        });
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text>Login:</Text>
      <Text>Your email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setEmail(val)}
        onEndEditing={(e) => {
          if (!e.nativeEvent.text)
            setErrorMsg({
              ...errorMsg,
              email: { msg: "Required", style: "error" },
            });
          else
            setErrorMsg({
              ...errorMsg,
              email: { msg: "", style: "none" },
            });
        }}
      />
      <Text style={styles[errorMsg.email.style]}>{errorMsg.email.msg}</Text>
      <Text>Password :</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(val) => setPassword(val)}
        onEndEditing={(e) => {
          if (!e.nativeEvent.text)
            setErrorMsg({
              ...errorMsg,
              password: { msg: "Required", style: "error" },
            });
          else
            setErrorMsg({
              ...errorMsg,
              password: { msg: "", style: "none" },
            });
        }}
      />
      <Text style={styles[errorMsg.password.style]}>
        {errorMsg.password.msg}
      </Text>
      {firebaseError ? <Text style={styles.error}>{firebaseError}</Text> : null}
      <Button title="Login" onPress={handleSignIn} />
      <Text>Don't have an account?</Text>
      <Button title="SignUp" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  error: {
    color: "red",
  },
});

export default Login;
