import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserProvider } from "./context/UserContext";

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Map from "./Screens/Map";
import Profile from "./Screens/Profile";
import PostABook from "./Screens/PostABook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        //Find user by 
          setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    })
  }, [])

  return (
    <UserProvider>
      <NavigationContainer >
        {isSignedIn ? (
          <>
            <Tab.Navigator>
              <Tab.Screen options={{headerShown:false}} name="Map" component={Map} />
              <Tab.Screen name='Profile'component={Profile}/>
              <Tab.Screen name="Post a Book" component={PostABook} />
            </Tab.Navigator>
    
          </>
        ) : (
          <>
            <Stack.Navigator >
              <Stack.Screen  
              name="SignIn" > 
                {(props) => <Login {...props} isSignedIn={isSignedIn}  setIsSignedIn={setIsSignedIn}/>}
              </Stack.Screen>
              <Stack.Screen 
              name="SignUp" >
              {(props) => <Signup {...props} isSignedIn={isSignedIn}  setIsSignedIn={setIsSignedIn}/>}
                </Stack.Screen>
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </UserProvider>
  );
}


