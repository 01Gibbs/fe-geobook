import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserProvider } from "./context/UserContext";

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import { MapScreen } from "./Screens/MapScreen";
import { PostABookMapScreen } from "./Screens/PostABookMapScreen";
import PostABook from "./Screens/PostABook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"
import ClaimedBooks from "./Screens/ClaimedBooks";

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
    <NavigationContainer>
      {isSignedIn ? (
        <>
          <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }} name="Map">
              {(props) => <MapScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {(props) => (
                <Profile
                  {...props}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Post a Book Screen"
              component={PostABookMapScreen}
            />
            {/* <Tab.Screen name='Book Information' component={SingleBook} /> */}
          </Tab.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}   name="Profile">
              {(props) => (
                <Profile
                  {...props}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
              )}
            </Stack.Screen>
            <Stack.Screen  name="ClaimedBooks" component={ClaimedBooks}/>
            <Stack.Screen name="SignIn">
              {(props) => (
                <Login
                  {...props}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={Signup} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>

    </UserProvider>
  );
}
