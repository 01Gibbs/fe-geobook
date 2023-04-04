import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable
} from 'react-native'
import { useCallback, useState } from 'react'
import { deleteBook, postBook } from '../data/api'
import { useFocusEffect } from '@react-navigation/native'

const PostABook = ({ navigation, route }) => {
  const { location, book_id, location_description } = route.params
  const user = 'testUser'
  const [postBookForm, setPostBookForm] = useState(null)
  const [formFields, setFormFields] = useState({
    title: '',
    author: '',
    genre: '',
    location_description: ''
  })
  const [formMsg, setFormMsg] = useState({
    title: { msg: '', style: 'none' },
    author: { msg: '', style: 'none' },
    genre: { msg: '', style: 'none' },
    location_description: { msg: '', style: 'none' }
  })
  useFocusEffect(
    useCallback(() => {
      setPostBookForm(null)
    }, [])
  )

  const handlePost = e => {
    e.preventDefault()
    const formMsgCopy = { ...formMsg }
    if (
      formFields.title &&
      formFields.author &&
      formFields.genre &&
      formFields.location_description
    ) {
      postBook({
        ...formFields,
        posted_by: user,
        location
      })
        .then(book => {
          setPostBookForm(book)
          setFormFields({
            title: '',
            author: '',
            genre: '',
            location_description: ''
          })
        })
        .catch(err => console.log(err.toJSON()))
    } else {
      for (const field in formFields) {
        if (!formFields[field]) {
          formFieldMsgCopy = { ...formMsgCopy[field] }
          formFieldMsgCopy.msg = 'Required'
          formFieldMsgCopy.style = 'error'
          formMsgCopy[field] = formFieldMsgCopy
          setFormMsg(formMsgCopy)
        }
      }
    }
    if (book_id) {
      deleteBook(book_id)
      console.log('book deleted')
    }
  }

  return postBookForm ? (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Your book has been submitted!</Text>
        <Pressable style={styles.submit} onPress={() => setPostBookForm(null)}>
          <Text>Submit another book!</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.main}>
        <View styls={styles.header}>
          <Text style={styles.title}>Post your book here!</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Book Title'
          value={formFields.title}
          onChange={e => {
            setFormFields({ ...formFields, title: e.nativeEvent.text })
          }}
          onEndEditing={e => {
            if (!e.nativeEvent.text)
              setFormMsg({
                ...formMsg,
                title: { msg: 'Required', style: 'error' }
              })
            else
              setFormMsg({ ...formMsg, title: { msg: '', style: 'success' } })
          }}
        ></TextInput>
        <Text style={styles[formMsg.title.style]}>{formMsg.title.msg}</Text>
        <TextInput
          style={styles.input}
          placeholder='Author'
          value={formFields.author}
          onChange={e => {
            setFormFields({ ...formFields, author: e.nativeEvent.text })
          }}
          onEndEditing={e => {
            if (!e.nativeEvent.text)
              setFormMsg({
                ...formMsg,
                author: { msg: 'Required', style: 'error' }
              })
            else
              setFormMsg({ ...formMsg, author: { msg: '', style: 'success' } })
          }}
        ></TextInput>
        <Text style={styles[formMsg.author.style]}>{formMsg.author.msg}</Text>
        <TextInput
          style={styles.input}
          placeholder='Genre'
          value={formFields.genre}
          onChange={e => {
            setFormFields({ ...formFields, genre: e.nativeEvent.text })
          }}
          onEndEditing={e => {
            if (!e.nativeEvent.text)
              setFormMsg({
                ...formMsg,
                genre: { msg: 'Required', style: 'error' }
              })
            else
              setFormMsg({ ...formMsg, genre: { msg: '', style: 'success' } })
          }}
        ></TextInput>
        <Text style={styles[formMsg.genre.style]}>{formMsg.genre.msg}</Text>
        <TextInput
          style={styles.input}
          placeholder='Location description'
          value={formFields.location_description}
          onChange={e => {
            setFormFields({
              ...formFields,
              location_description: e.nativeEvent.text
            })
          }}
          onEndEditing={e => {
            if (!e.nativeEvent.text)
              setFormMsg({
                ...formMsg,
                location_description: { msg: 'Required', style: 'error' }
              })
            else
              setFormMsg({
                ...formMsg,
                location_description: { msg: '', style: 'success' }
              })
          }}
        ></TextInput>
        <Text style={styles[formMsg.location_description.style]}>
          {formMsg.location_description.msg}
        </Text>
        <Pressable style={styles.submit} onPress={handlePost}>
          <Text>SUBMIT</Text>
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
    padding: 10
  },
  error: {
    color: 'red'
  }
})

export default PostABook
