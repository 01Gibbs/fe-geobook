import React from 'react'
import MapView, { Circle } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { Button, StyleSheet, Text, View } from 'react-native'
import { locations } from './coordinates'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App () {

  return (
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

const Login = ({navigation}) => {
  return (
    <Button
      title="Login"
      onPress={() =>
        navigation.navigate('Map')
      }
    />
  );
};

const Map = ({navigation}) => {

  function createKey (location) {
    return location.latitude + location.longitude
  }

  return (
      <View style={styles.container}>
      <MapView style={styles.map}>
        {locations.map(location => (
          <Marker key={`mk${createKey(location)} + ${Math.random()*10}`} coordinate={location} />
        ))}
        {locations.map(location => (
          <Circle
            key={`c${createKey(location)} + ${Math.random()*10}`}
            center={location}
            radius={2000}
            fillColor='rgba(100,100,100,0.2)'
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
})
