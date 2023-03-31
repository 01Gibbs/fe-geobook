import { Button, Text, View } from "react-native"

export const SingleBook = ({ route, navigation}) => {
    const {book_id} = route.params
    return <View>
        <Text>Book information</Text>
        <Text>{book_id}</Text>
        <Button onPress={()=>navigation.goBack()} title='Go Back'/>
    </View>
}