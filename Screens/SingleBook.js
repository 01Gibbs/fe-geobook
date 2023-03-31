import { useEffect, useState } from "react"
import { Button, Text, View } from "react-native"
import { getBook } from "../data/api"

export const SingleBook = ({ route, navigation}) => {
    const {book_id} = route.params || {book_id:"6425407dba5e321df2803b39"}
    const [bookInfo, setBookInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getBook(book_id).then(book => {
            setBookInfo(book)
            setIsLoading(false)
        })
    },[book_id])


    return isLoading? null: <View>
        <Text>Genre: {bookInfo.genre}</Text>
        <Text>Location description: {bookInfo.location_description}</Text>
        <Text>Left by: {bookInfo.posted_by}</Text>
        <Button onPress={()=>navigation.goBack()} title='Go Back'/>
        <Button title='Found book' />
    </View>
}


