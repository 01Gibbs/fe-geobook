import { useState } from "react";
import { Image, Text, TextInput, View, Pressable, ScrollView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { postUser } from "../data/api";
import { styles } from "../style_sheets/form-styling";
import { colours } from '../style_sheets/colours'
const {geoGreen, geoGreenPressed} = colours

const Signup = ({navigation}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firebaseError, setFirebaseError] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    name: { msg: "", style: "none" },
    username: { msg: "", style: "none" },
    email: { msg: "", style: "none" },
    password: { msg: "", style: "none" },
  });

  const handlePress = (e) => {
    e.preventDefault();
    if (name && username && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          const data = {
            username: username,
            firebase_id: user.uid,
            name: name,
          };
          postUser(data)
            .then(() => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
          setFirebaseError("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage === "Firebase: Error (auth/missing-email).") {
            setFirebaseError("Please enter an email address");
          } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
            setFirebaseError("Please enter a valid email");
          } else if (
            errorMessage === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setFirebaseError("Email already in use, please log in");
          } else if (
            errorMessage ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setFirebaseError("Password should be at least 6 characters");
          } else if (errorMessage) {
            setFirebaseError(error.message);
          }
        });
    } else {
      if (!name) {
        setErrorMsg({
          ...errorMsg,
          name: { msg: "Required", style: "error" },
        });
      }
      if (!username) {
        setErrorMsg({
          ...errorMsg,
          username: { msg: "Required", style: "error" },
        });
      }
      if (!email) {
        setErrorMsg({
          ...errorMsg,
          email: { msg: "Required", style: "error" },
        });
      }
      if (!password) {
        setErrorMsg({
          ...errorMsg,
          password: { msg: "Required", style: "error" },
        });
      }
    }
  };
  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.tinyImg}
          source={require("../assets/geoBook-logo-2.png")}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.formContainer}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign Up: </Text>
        </View>
        <TextInput
          placeholder={"Name"}
          style={styles.input}
          onChangeText={(val) => setName(val)}
          onEndEditing={(e) => {
            if (!e.nativeEvent.text)
              setErrorMsg({
                ...errorMsg,
                name: { msg: "Required", style: "error" },
              });
            else
              setErrorMsg({
                ...errorMsg,
                name: { msg: "", style: "success" },
              });
          }}
        />
        <Text style={styles[errorMsg.name.style]}>{errorMsg.name.msg}</Text>

        <TextInput
          placeholder="Username" style={styles.input} onChangeText={(val) => setUsername(val)}
          onEndEditing={(e) => {
            if (!e.nativeEvent.text)
              setErrorMsg({
                ...errorMsg,
                username: { msg: "Required", style: "error" },
              });
            else
              setErrorMsg({
                ...errorMsg,
                username: { msg: "", style: "none" },
              });
          }}
        />
        <Text style={styles[errorMsg.username.style]}>
          {errorMsg.username.msg}
        </Text>
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
        {firebaseError ? (
          <Text style={styles.error}>{firebaseError}</Text>
        ) : null}
        <Pressable  onPress={handlePress}
        style={({ pressed }) => [ styles.submit, { backgroundColor: pressed ? geoGreenPressed : geoGreen },]}>
          <Text>Sign Up</Text>
        </Pressable>
        <Text>Already have an account?</Text>
        <Pressable onPress={handleSignIn}>
          <Text style={styles.underline}>Click to login!</Text>
        </Pressable>
      </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
