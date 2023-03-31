import { Text,  View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from 'react'

const PostABook = ({navigation}) => {

  const [postBookForm, setPostBookForm] = useState(null)
  const [formFields, setFormFields] = useState({title:'', author:'', genre:'', location_description: ''})

  const handlePost = () => {
    console.log(formFields.title)
  }

    return (
      <View style={styles.container}>
        <Text>Post your book here!</Text>
        <TextInput style={styles.input} placeholder='Book Title' value={formFields.title} onChange={(e)=>{setFormFields({...formFields, title:e.target.value})}}></TextInput>
        <Button title='Submit' onPress={handlePost}/>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 10
    }
  })

  export default PostABook