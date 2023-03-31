import { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, View } from 'react-native'
import { Circle, Marker, Callout } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-map-clustering'

import * as Location from 'expo-location'
import { getBooks } from '../data/api'

const Map = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [locations, setLocations] = useState(null)
  const [books, setBooks] = useState([])
  const [usersLocation, setUsersLocation] = useState(null)

  const mapRegion = {
    latitude: 53.797193,
    longitude: -3.656831,
    latitudeDelta: 15,
    longitudeDelta: 15
  }

  const mapRef = useRef()

  useEffect(() => {
    setIsLoading(true)
    userLocation()
    getBooks().then(bookData => {
      setLocations(
        bookData.map(book => {
          return {
            longitude: book.location.coordinates[0],
            latitude: book.location.coordinates[1]
          }
        })
      )

      setBooks(
        bookData.map(book => {
          return {
            id: book._id,
            genre: book.genre,
            location_description: book.location_description,
            posted_by: book.posted_by
          }
        })
      )
      setIsLoading(false)
    })
  }, [])

  function createKey (location) {
    return location.latitude + location.longitude + Math.random() * 100
  }

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    })

    setUsersLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    })
    const animateToRegion = () => {
      mapRef.current.animateToRegion(usersLocation, 2000)
    }
    animateToRegion()
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      width: '100%',
      height: '100%'
    },
    navbar: {
      backgroundColor: 'lightgreen',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 6,
      margin: 10,
      width: 200
    }
  })

  return isLoading ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView style={styles.map} region={mapRegion} ref={mapRef}>
            {locations.map((location, index) => {
              return (
                <Marker key={`mk${createKey(location)}`} coordinate={location}>
                  <Callout onPress={() => navigation.navigate('Book Information', {book_id: books[index].id})}>
                    <Text>Book information</Text>
                    <Text>Genre: {books[index].genre}</Text>
                    <Text>Left by: {books[index].posted_by}</Text>
                  </Callout>
                </Marker>
              )
            })}
            {locations.map(location => (
              <Circle
                key={`c${createKey(location)} + ${Math.random() * 10}`}
                center={location}
                radius={20}
                fillColor='rgba(100,100,100,0.2)'
                strokeWidth={0}
              />
            ))}
            {!usersLocation ? null : (
              <Marker coordinate={usersLocation} title='You are here!'>
                <Callout>
                  <Text>Test</Text>
                  <Button title='Get more Info' />
                </Callout>
              </Marker>
            )}
          </MapView>
        </View>
        <Button title='Get Location' onPress={userLocation} />
      </View>
    </SafeAreaView>
  )
}
export default Map
