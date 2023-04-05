import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostABook from "./PostABook";
import { PostABookMap } from "./PostABookMap";

const Stack = createNativeStackNavigator();

export const PostABookMapScreen = () => {
  return (
    <Stack.Navigator initialRouteName="PostABookMap">
      <Stack.Screen
        options={{ headerShown: false }}
        name="PostABookMap"
        component={PostABookMap}
      >
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="Post a Book" component={PostABook} />
    </Stack.Navigator>
  );
};
