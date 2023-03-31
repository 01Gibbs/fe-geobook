import { Button, Text, TextInput, View } from "react-native";

const Login = ({ navigation, setIsSignedIn }) => {
  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  };
  return (
    <View>
      <Text>Login:</Text>
      <Text>Your email:</Text>
      <TextInput />
      <Button title="Login" onPress={handleSignIn} />
      <Button title="SignUp" onPress={handleSignUp} />
    </View>
  );
};

export default Login;
