import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./Map";
import { SingleBook } from "./SingleBook";

const Stack = createNativeStackNavigator();

export const MapScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="MapPage">
        {(props) => <Map {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Book Information" component={SingleBook} />
    </Stack.Navigator>
  );
};
