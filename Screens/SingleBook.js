import { useEffect, useState } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { getBook } from "../data/api"

export const SingleBook = ({ route, navigation}) => {
    const {book_id} = route.params
    const [bookInfo, setBookInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getBook(book_id).then(book => {
            setBookInfo(book)
            setIsLoading(false)
        })
    },[])


    return isLoading? null: <View>
        <Text>Genre: {bookInfo.genre}</Text>
        <Text>Location description: {bookInfo.location_description}</Text>
        <Text>Left by: {bookInfo.posted_by}</Text>
        <Button onPress={()=>navigation.goBack()} title='Go Back'/>
        <Button title='Found book' />
    </View>
}


