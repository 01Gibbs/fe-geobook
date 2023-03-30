import { Button, Text, TextInput, View } from "react-native";

const Login = ({navigation}) => {
    return (
      <View>
        <Text>Login:</Text>
        <Text>Your email:</Text>
        <TextInput/>
        <Button
          title="Login"
          onPress={() =>
            navigation.navigate('Map')
          }
        />
      </View>
    );
  };

  export default Login