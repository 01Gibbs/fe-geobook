import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { getBook } from '../data/api'
import FoundBook from './FoundBook'

export const SingleBook = ({ route, navigation }) => {
  const { book_id } = route.params || { book_id: '6425407dba5e321df2803b39' }
  const [bookInfo, setBookInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [foundBook, setFoundBook] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getBook(book_id).then(book => {
      setBookInfo(book)
      setIsLoading(false)
    })
  }, [book_id])

  return isLoading ? null : foundBook ? (
    <FoundBook
      bookInfo={bookInfo}
      setFoundBook={setFoundBook}
      navigation={navigation}
    />
  ) : (
    <View>
      <Text>Genre: {bookInfo.genre}</Text>
      <Text>Location description: {bookInfo.location_description}</Text>
      <Text>Left by: {bookInfo.posted_by}</Text>
      <Button onPress={() => navigation.goBack()} title='Go Back' />
      <Button title='Found book' onPress={() => setFoundBook(true)} />
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
