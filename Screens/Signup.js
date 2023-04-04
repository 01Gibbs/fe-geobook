import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { postUser } from "../data/api";

const Signup = () => {
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
  return (
    <View style={styles.container}>
      <Text>Signup:</Text>
      <Text>Your name:</Text>
      <TextInput
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
      <Text>Your username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setUsername(val)}
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
      <Text>Create password:</Text>
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

      <Button title="Sign Up" onPress={handlePress} />
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

export default Signup;
