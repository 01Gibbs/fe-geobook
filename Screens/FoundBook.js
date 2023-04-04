import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Toast from 'react-native-root-toast'
import { getClaimedBookThumbnail, patchUser } from '../data/api'
import { auth } from '../firebaseConfig'

const FoundBook = ({ bookInfo, setFoundBook, navigation }) => {
  const [bookTitle, setBookTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [toast, setToast] = useState(false)
  const user_id = auth.currentUser.uid
  console.log(bookInfo.title)
  const handlePress = () => {
    if (bookTitle.toLowerCase().trim() === bookInfo.title.toLowerCase()) {
      setErrorMsg('')
      getClaimedBookThumbnail(bookInfo.title).then(thumbnail => {
        patchUser(user_id, {
          title: bookInfo.title,
          author: bookInfo.author,
          genre: bookInfo.genre,
          thumbnail
        }).then(res => console.log(res))
      })
      let toast = Toast.show(
        'Congratulations on finding the book! Please leave a new book in its place!',
        { duration: Toast.durations.LONG, position: Toast.positions.CENTER }
      )
      navigation.navigate('PostABookScreen', {
        screen: 'Post a Book',
        params: {
          book_id: bookInfo._id,
          location: bookInfo.location,
          location_description: bookInfo.location_description
        }
      })
    } else {
      setErrorMsg('Incorrect title!')
    }
  }

  return (
    <View style={styles.container}>
      <Text>What is the title?</Text>
      <TextInput
        value={bookTitle}
        onChange={e => setBookTitle(e.nativeEvent.text)}
        style={styles.input}
      ></TextInput>
      <Text>{errorMsg}</Text>
      <Button title='Found book' onPress={handlePress} />
      <Button title='Go Back' onPress={() => setFoundBook(false)} />
    </View>
  )
}
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
export default FoundBook
