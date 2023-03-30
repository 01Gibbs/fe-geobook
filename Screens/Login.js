import { Button, Text, TextInput, View } from "react-native";

const Login = ({navigation, isSignedIn, setIsSignedIn}) => {
  const handleSignIn = ()=>{
    isSignedIn ? setIsSignedIn(false) : setIsSignedIn(true)
    console.log(isSignedIn)
  }


    return (
      <View>
        <Text>Login:</Text>
        <Text>Your email:</Text>
        <TextInput/>
        <Button title="Login"
        onPress={handleSignIn}
        />
      </View>
    );
  };

  export default Login