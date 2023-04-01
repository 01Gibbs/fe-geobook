import { useEffect, useState } from 'react'
import { Circle, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as blueDot from '../../assets/bluedot2.png'
import { Text } from 'react-native-web'
import { Image } from 'react-native'


export const TrackingMarker = () => {
  const [location, setLocation] = useState(null)
  const [accuracy, setAccuracy] = useState(0)

  startWatching = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 0.1
      },
      location => {
        //   console.log('location', location)
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        })
        setAccuracy(location.coords.accuracy)
      }
    )
  }
  useEffect(() => {
    startWatching()
  }, [])

  return location ? (
      <>
      <Marker coordinate={location} title='You are here!' icon={blueDot} >
      </Marker>
      <Circle center={location} radius={accuracy} fillColor='rgba(50,200,256,0.3)' strokeColor='rgba(50,200,256)' strokeWidth={2}/>
      </>
  ) : null
}
