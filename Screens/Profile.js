import { Text, View, Button } from "react-native";

const Profile = ({navigation, setIsSignedIn}) => {
  const handleSignOut = ()=>{
    setIsSignedIn(false)
  }
    return (
      <View>
        <Text>This is your profile page!:</Text>
        <Button title="Log out"
        onPress={handleSignOut}
        />
      </View>
    );
  };

  export default Profile