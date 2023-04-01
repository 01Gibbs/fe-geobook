import { useEffect, useState } from 'react'
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export const TrackingMarker = () => {
  const [location, setLocation] = useState(null)

  startWatching = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 0.1
    }, location => {
    //   console.log('location', location)
      setLocation( {latitude: location.coords.latitude,
        longitude: location.coords.longitude})
    })
  }
  useEffect(()=>{startWatching()},[])


  return (
    location ? <Marker coordinate={location} title='You are here!'></Marker> : null
  )
}
