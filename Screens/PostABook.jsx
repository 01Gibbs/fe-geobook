import { Text, View, TextInput, ScrollView, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { deleteBook, getUser, postBook } from "../data/api";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { styles } from "../style_sheets/form-styling";
import { colours } from "../style_sheets/colours";
import { SafeAreaView } from "react-native-safe-area-context";
const { geoGreen, geoGreenPressed } = colours;

// location_description: feature to be added to keep existing location on post form, user intuitiveness
const PostABook = ({ navigation, route }) => {
  const { location, book_id, location_description } = route.params;
  const [postBookForm, setPostBookForm] = useState(null);
  const [formFields, setFormFields] = useState({
    title: "",
    author: "",
    genre: "",
    location_description: "",
  });
  const [formMsg, setFormMsg] = useState({
    title: { msg: "", style: "none" },
    author: { msg: "", style: "none" },
    genre: { msg: "", style: "none" },
    location_description: { msg: "", style: "none" },
  });
  useFocusEffect(
    useCallback(() => {
      setPostBookForm(null);
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.dispatch(StackActions.replace("PostABookMap"));
    });

    return unsubscribe;
  }, [navigation]);

  const handlePost = (e) => {
    e.preventDefault();
    const formMsgCopy = { ...formMsg };
    if (
      formFields.title &&
      formFields.author &&
      formFields.genre &&
      formFields.location_description
    ) {
      getUser(auth.currentUser.uid)
        .then((user) => {
          postBook({
            ...formFields,
            posted_by: user.username,
            location,
          }).then((book) => {
            setPostBookForm(book);
            setFormFields({
              title: "",
              author: "",
              genre: "",
              location_description: "",
            });
          });
        })
        //Axios Error Handling - Expands with toJSON()
        .catch((err) => console.log(err.toJSON()));
    } else {
      for (const field in formFields) {
        if (!formFields[field]) {
          formFieldMsgCopy = { ...formMsgCopy[field] };
          formFieldMsgCopy.msg = "Required";
          formFieldMsgCopy.style = "error";
          formMsgCopy[field] = formFieldMsgCopy;
          setFormMsg(formMsgCopy);
        }
      }
    }
    if (book_id) {
      deleteBook(book_id);
    }
  };

  return postBookForm ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text>Your book has been submitted!</Text>
        <Pressable
          style={styles.submit}
          onPress={() => {
            setPostBookForm(null);
            navigation.navigate("PostABookMap");
          }}
        >
          <Text>Submit another book!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.main}>
            <View styls={styles.header}>
              <Text style={styles.title}>Post your book here!</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Book Title"
              value={formFields.title}
              onChange={(e) => {
                setFormFields({ ...formFields, title: e.nativeEvent.text });
              }}
              onEndEditing={(e) => {
                if (!e.nativeEvent.text)
                  setFormMsg({
                    ...formMsg,
                    title: { msg: "Required", style: "error" },
                  });
                else
                  setFormMsg({
                    ...formMsg,
                    title: { msg: "", style: "success" },
                  });
              }}
            ></TextInput>
            <Text style={styles[formMsg.title.style]}>{formMsg.title.msg}</Text>
            <TextInput
              style={styles.input}
              placeholder="Author"
              value={formFields.author}
              onChange={(e) => {
                setFormFields({ ...formFields, author: e.nativeEvent.text });
              }}
              onEndEditing={(e) => {
                if (!e.nativeEvent.text)
                  setFormMsg({
                    ...formMsg,
                    author: { msg: "Required", style: "error" },
                  });
                else
                  setFormMsg({
                    ...formMsg,
                    author: { msg: "", style: "success" },
                  });
              }}
            ></TextInput>
            <Text style={styles[formMsg.author.style]}>
              {formMsg.author.msg}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Genre"
              value={formFields.genre}
              onChange={(e) => {
                setFormFields({ ...formFields, genre: e.nativeEvent.text });
              }}
              onEndEditing={(e) => {
                if (!e.nativeEvent.text)
                  setFormMsg({
                    ...formMsg,
                    genre: { msg: "Required", style: "error" },
                  });
                else
                  setFormMsg({
                    ...formMsg,
                    genre: { msg: "", style: "success" },
                  });
              }}
            ></TextInput>
            <Text style={styles[formMsg.genre.style]}>{formMsg.genre.msg}</Text>
            <TextInput
              style={styles.input}
              placeholder="Location description"
              value={formFields.location_description}
              onChange={(e) => {
                setFormFields({
                  ...formFields,
                  location_description: e.nativeEvent.text,
                });
              }}
              onEndEditing={(e) => {
                if (!e.nativeEvent.text)
                  setFormMsg({
                    ...formMsg,
                    location_description: { msg: "Required", style: "error" },
                  });
                else
                  setFormMsg({
                    ...formMsg,
                    location_description: { msg: "", style: "success" },
                  });
              }}
            ></TextInput>
            <Text style={styles[formMsg.location_description.style]}>
              {formMsg.location_description.msg}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.submit,
                { backgroundColor: pressed ? geoGreenPressed : geoGreen },
              ]}
              onPress={handlePost}
            >
              <Text>SUBMIT</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.submit,
                { backgroundColor: pressed ? geoGreenPressed : geoGreen },
              ]}
              onPress={() => {
                if (!book_id) navigation.navigate("PostABookMap");
                else
                  navigation.navigate("Map", {
                    screen: "MapPage",
                  });
              }}
            >
              <Text>GO BACK</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostABook;
