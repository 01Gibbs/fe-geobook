import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

import * as Location from "expo-location";
import { getBooks } from "../data/api";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // GeoJSON coords are reversed ({ longitude: -1.9299841, latitude: 55.6707727 })
    getBooks().then((bookData) => {
      setLocations(
        bookData.map((book) => {
          return {
            longitude: book.location.coordinates[0],
            latitude: book.location.coordinates[1],
          };
        })
      );
      // console.log(locations);
      setIsLoading(false);
      // setBooks(()=>{})
    });
  }, []);

  function createKey(location) {
    return location.latitude + location.longitude + Math.random() * 100;
  }

  const [mapRegion, setMapRegion] = useState({
    // latitude: null,
    // longitude: null,
    // latitudeDelta: null,
    // longitudeDelta: null,
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    // await console.log('Fetching current location')
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    // await console.log('Done')
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    // console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    navbar: {
      backgroundColor: "lightgreen",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    loginContainer: {
      flex: 1,
      alignItems: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 6,
      margin: 10,
      width: 200,
    },
  });

  return isLoading ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView style={styles.map} region={mapRegion}>
            {locations.map((location) => (
              <Marker key={`mk${createKey(location)}`} coordinate={location} />
            ))}
            {locations.map((location) => (
              <Circle
                key={`c${createKey(location)} + ${Math.random() * 10}`}
                center={location}
                radius={2000}
                fillColor="rgba(100,100,100,0.2)"
              />
            ))}
            <Marker coordinate={mapRegion} title="Gibbs Edit"></Marker>
          </MapView>
        </View>
        <Button title="Get Location" onPress={userLocation} />
      </View>
    </SafeAreaView>
  );
};
export default Map;
