import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getBook } from '../data/api'
import FoundBook from './FoundBook'
import { colours } from "../style_sheets/colours";
const { geoGreen, geoGreenPressed } = colours;

export const SingleBook = ({ route, navigation }) => {
  // is default book_id needed?
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
    
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>  
        <Text style={styles.title}>Genre</Text>
        <Text style={styles.description}>{bookInfo.genre}</Text>
        <Text style={styles.title}>Location description</Text>
        <Text style={styles.description}>{bookInfo.location_description}</Text>
        <Text style={styles.title}>Left by</Text>
        <Text style={styles.description}>{bookInfo.posted_by}</Text>
        <Pressable 
        style={({ pressed }) => [ styles.submit, { backgroundColor: pressed ? geoGreenPressed : geoGreen }]}
        onPress={() => navigation.goBack()} ><Text>GO BACK</Text></Pressable>
        <Pressable 
        style={({ pressed }) => [ styles.submit, { backgroundColor: pressed ? geoGreenPressed : geoGreen }]}
        onPress={() => setFoundBook(true)} ><Text>FOUND BOOK</Text></Pressable>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding:20,
    flex: 1,
    backgroundColor:'#2B5F6B',
    justifyContent:'center',
    alignContent:'center',
  },
  header: {
    alignItems: 'left',
    alignText:'left',

  },
  title: {
    fontSize:18,
    fontWeight: 600,
  },
  description: {
    fontSize:16,
    marginBottom:15,
  },
  main: {
    margin:0,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F5F5F5',
    // backgroundColor:'#132235',
    borderRadius:5,
  },
  input: {
    alignItems:'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  submit: {
    backgroundColor:'#5CDB95',
    alignSelf: 'stretch',
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginBottom:15,
  },
  error: {
    color: 'red'
  }
})