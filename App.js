import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from "./style_sheets/global"
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { UserProfile } from "./Components/UserProfile";
import { HomePage } from './Components/HomePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
    <Text>GeoBook</Text>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='User Profile'>
        <Stack.Screen
          name="User Profile"
          component={UserProfile}
          // options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          // options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}


