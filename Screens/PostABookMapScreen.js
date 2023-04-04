import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./Map";
import PostABook from "./PostABook";
import { PostABookMap } from "./PostABookMap";

const Stack = createNativeStackNavigator();

export const PostABookMapScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="PostABookMap"
        component={PostABookMap}
      >
      </Stack.Screen>
      <Stack.Screen name="Post a Book" component={PostABook} />
    </Stack.Navigator>
  );
};
