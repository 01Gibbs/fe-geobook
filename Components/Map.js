import { StyleSheet, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

export const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    // margin: '100px',
    // padding: '100px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f303fa',
    // borderWidth: '5px'
  },
  map: {
    width: '100%',
    height: '100%'
  }
})
