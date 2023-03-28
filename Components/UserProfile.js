import { View } from "react-native"
import { Text } from "react-native"
import { StyleSheet } from "react-native"

export const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Text>User profile</Text>
            <Text>Username</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '80%',
    //   margin: '100px',
    //   padding: '100px',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    //   borderColor: '#f303fa',
    //   borderWidth: '5px'
    },
  });