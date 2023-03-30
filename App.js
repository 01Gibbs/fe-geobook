import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Map from "./Screens/Map";
import Profile from "./Screens/Profile";
import PostABook from "./Screens/PostABook";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // the state you want to pass

  return (
    <NavigationContainer >
      {isSignedIn ? (
        <>
          <Tab.Navigator>
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Post a Book" component={PostABook} />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator >
            <Stack.Screen  name="SignIn" > 
              {(props) => <Login {...props}  setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={Signup}  />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );

  // <NavigationContainer>
  //   <Stack.Navigator>
  //   <Stack.Screen
  //       name="Login"
  //       component={Login}
  //       options={{title: 'Login'}}
  //     />
  //     <Stack.Screen name="Map" component={Map} />
  //   </Stack.Navigator>
  // </NavigationContainer>
}
