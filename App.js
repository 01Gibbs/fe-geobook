import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login'
import Map from './Screens/Map'

const Stack = createNativeStackNavigator();
export default function App () {

  const isSignedIn = false
  return (
    //   return (
    //     <NavigationContainer>
    //       <Stack.Navigator>
    //         {isSignedIn ? (
    //           <>
    //             <Stack.Screen name="CreateProfile" component={CreateProfile} />
    //             // <Stack.Screen name="Map" component={Map} />
    //             <Stack.Screen name="Profile" component={ProfileScreen} />
    //            
    //           </>
    //         ) : (
    //           <>
    //             <Stack.Screen name="SignIn" component={SignInScreen} />
    //             <Stack.Screen name="SignUp" component={SignUpScreen} />
    //           </>
    //         )}
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   );
    // }
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

