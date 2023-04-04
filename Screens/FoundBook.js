import { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Toast from 'react-native-root-toast'
import { getClaimedBookThumbnail, patchUser } from '../data/api'
import { auth } from '../firebaseConfig'

const FoundBook = ({ bookInfo, setFoundBook, navigation }) => {
  const [bookTitle, setBookTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

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
      navigation.navigate('Add book', {
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
      <View style={styles.main}>
        <Text style={styles.title}>What is the title of the book?</Text>
        <TextInput
          style={styles.input}
          value={bookTitle}
          onChange={e => setBookTitle(e.nativeEvent.text)}
        ></TextInput>
        <Text>{errorMsg}</Text>
        <Pressable style={styles.submit} onPress={handlePress}>
          <Text>CLAIM BOOK</Text>
        </Pressable>
        <Pressable style={styles.submit} onPress={() => setFoundBook(false)}>
          <Text>GO BACK</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#2B5F6B',
    justifyContent: 'center',
    alignContent: 'center'
  },
  header: {
    alignItems: 'left',
    alignText: 'left'
  },
  title: {
    fontSize: 18,
    fontWeight: 600
  },
  description: {
    fontSize: 16,
    marginBottom: 15
  },
  main: {
    margin: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    // backgroundColor:'#132235',
    borderRadius: 5
  },
  input: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5
  },
  submit: {
    backgroundColor: '#5CDB95',
    alignSelf: 'stretch',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15
  },
  error: {
    color: 'red'
  }
})
export default FoundBook
