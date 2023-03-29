import React from 'react'
import MapView, { Circle } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { locations } from './coordinates'

export default function App () {
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
})
