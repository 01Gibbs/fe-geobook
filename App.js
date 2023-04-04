import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./context/UserContext";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import { MapScreen } from "./Screens/MapScreen";
import { PostABookMapScreen } from "./Screens/PostABookMapScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import ClaimedBooks from "./Screens/ClaimedBooks";
import { RootSiblingParent } from "react-native-root-siblings";

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
        <ProfileStack.Screen
          name="ProfilePage"
          options={{ headerShown: false }}
          component={Profile}
        />
        <ProfileStack.Screen
          name="ClaimedBooks"
          options={{ headerShown: false }}
          component={ClaimedBooks}
        />
      </ProfileStack.Navigator>
    );
  };

  const displayTabIcons = (focused, color, size, route) => {
    let iconName;
    if (route.name === "Map") {
      iconName = focused ? "map" : "map-outline";
    } else if (route.name === "Profile") {
      iconName = focused ? "person" : "person-outline";
    } else if (route.name === "PostABookScreen") {
      iconName = focused ? "book" : "book-outline";
    }
    return (
      <Ionicons name={iconName} size={size} color={color} />
    );
  };

  return (
    <RootSiblingParent>
      <UserProvider>
        <NavigationContainer>
          {isSignedIn ? (
            <>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarActiveTintColor: "#5CDB95",
                  tabBarInactiveTintColor: "gray",
                  tabBarStyle: [{display: "flex",}, null ],
                  tabBarIcon: ({ focused, color, size }) => {
                    return displayTabIcons(focused, color, size, route)
                    
                  },
                })}
              >
                <Tab.Screen options={{ headerShown: false }} name="Map">
                  {(props) => <MapScreen {...props} />}
                </Tab.Screen>
                <Tab.Screen
                  options={{ headerShown: false }}
                  name="Profile"
                  component={ProfileStackScreen}
                />
                <Tab.Screen
                  name="PostABookScreen"
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
