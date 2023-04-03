import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { postBook } from "../data/api";

const PostABook = ({ navigation, route }) => {
  const { location, book_id, location_description } = route.params;
  // console.log(book_id, location_description);
  console.log(book_id)

  // const user = useContext(UserContext)
  const user = "testUser";
  // const location = {
  //   type: "Point",
  //   coordinates: [-2.6137, 55.8435],
  // };

  const [postBookForm, setPostBookForm] = useState(null);
  const [formFields, setFormFields] = useState({
    title: "",
    author: "",
    genre: "",
    location_description: "",
  });

  const handlePost = (e) => {
    e.preventDefault();
    postBook({
      ...formFields,
      posted_by: user,
      location: { coordinates: [location.longitude, location.latitude] },
    })
      .then((book) => {
        // Display for user?
      })
      .catch((err) => console.log(err.toJSON()));
  };

  return (
    <View style={styles.container}>
      <Text>Post your book here!</Text>
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={formFields.title}
        onChange={(e) => {
          setFormFields({ ...formFields, title: e.nativeEvent.text });
        }}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={formFields.author}
        onChange={(e) => {
          setFormFields({ ...formFields, author: e.nativeEvent.text });
        }}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={formFields.genre}
        onChange={(e) => {
          setFormFields({ ...formFields, genre: e.nativeEvent.text });
        }}
      ></TextInput>
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
      ></TextInput>
      <Button title="Submit" onPress={handlePost} />
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
});

export default PostABook;
