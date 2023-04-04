import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react'
import { deleteBook, postBook } from '../data/api'

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

  return postBookForm ? <Text>Your book has been submitted!</Text>: (
    <View style={styles.container}>
      <Text>Post your book here!</Text>
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
          else setFormMsg({ ...formMsg, title: { msg: '', style: 'success' } })
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
          else setFormMsg({ ...formMsg, author: { msg: '', style: 'success' } })
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
          else setFormMsg({ ...formMsg, genre: { msg: '', style: 'success' } })
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
      <Button title='Submit' onPress={handlePost} />
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
  },
  error: {
    color: 'red'
  }
})

export default PostABook
