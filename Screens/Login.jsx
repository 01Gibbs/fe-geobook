import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../style_sheets/form-styling";
import { auth } from "../firebaseConfig";
import { colours } from "../style_sheets/colours";
import { SafeAreaView } from "react-native-safe-area-context";
const { geoGreen, geoGreenPressed } = colours;

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
          const errorMessage = error.message;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.tinyImg}
          source={require("../assets/geoBook-logo-2.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
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
            <Text style={styles[errorMsg.email.style]}>
              {errorMsg.email.msg}
            </Text>
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
            <Text style={styles.error}>
              {firebaseError}
            </Text>
            <Pressable
              onPress={handleSignIn}
              style={({ pressed }) => [
                styles.submit,
                { backgroundColor: pressed ? geoGreenPressed : geoGreen },
              ]}
            >
              <Text>Login</Text>
            </Pressable>
            <Text>Don't have an account?</Text>
            <Pressable onPress={handleSignUp}>
              <Text style={styles.underline}>Click to join!</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
