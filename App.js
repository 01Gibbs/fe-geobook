import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import PostABook from "./Screens/PostABook";
import { MapScreen } from "./Screens/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // the state you want to pass
  return (
    <NavigationContainer >
      {isSignedIn ? (
        <>
          <Tab.Navigator
          >
            <Tab.Screen options={{headerShown:false}} name="Map" >
              {(props) => <MapScreen {...props} />}
              </Tab.Screen>
            <Tab.Screen name='Profile' >
            {(props) => <Profile {...props}  isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>}
            </Tab.Screen>
            <Tab.Screen name="Post a Book" component={PostABook} />
            {/* <Tab.Screen name='Book Information' component={SingleBook} /> */}
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator >
            <Stack.Screen  
            name="SignIn" > 
              {(props) => <Login {...props} isSignedIn={isSignedIn}  setIsSignedIn={setIsSignedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={Signup}  />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}


