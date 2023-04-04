import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
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
      <View style={styles.avatarContainer}>
        <Image
          style={styles.tinyImg}
          source={require("../assets/geoBook-logo-2.png")}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login: </Text>
        </View>
        <TextInput
          placeholder="Email"
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
        <TextInput
          placeholder="Password"
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
        <Pressable style={styles.submit} onPress={handleSignIn}>
          <Text>Login</Text>
        </Pressable>
        <Text>Don't have an account?</Text>
        <Pressable onPress={handleSignUp}>
          <Text>Click to join!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#2B5F6B",
    justifyContent: "center",
    alignContent: "center",
  },

  header: {
    padding: 15,
    textAlign:'left',
  },
  headerText: {
    fontSize: 20,
    
  },

  avatarContainer: {
    top: -150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyImg: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 5,
    width: "100%",
    height: 100,
    maxWidth: 360,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
  },
  main: {
    margin: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    // backgroundColor:'#132235',
    borderRadius: 5,
  },
  input: {
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  submit: {
    backgroundColor: "#5CDB95",
    alignSelf: "stretch",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  error: {
    color: "red",
  },
});

export default Login;
