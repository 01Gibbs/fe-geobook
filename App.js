import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from "./context/UserContext";

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import { MapScreen } from "./Screens/MapScreen";
import { PostABookMapScreen } from "./Screens/PostABookMapScreen";
import PostABook from "./Screens/PostABook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import ClaimedBooks from "./Screens/ClaimedBooks";
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        //Find user by
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfilePage" component={Profile} />
      <ProfileStack.Screen name="ClaimedBooks" component={ClaimedBooks} />
    </ProfileStack.Navigator>
    );
  };

  return (
    <RootSiblingParent>
    <UserProvider>
      <NavigationContainer>
        {isSignedIn ? (
          <>
            <Tab.Navigator>
              <Tab.Screen options={{ headerShown: false }} name="Map">
                {(props) => <MapScreen {...props} />}
              </Tab.Screen>
              <Tab.Screen options={{ headerShown: false }} name="Profile" component={ProfileStackScreen}/>
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
    </RootSiblingParent>
  );
}
