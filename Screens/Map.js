import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";
import { Circle, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";

import * as Location from "expo-location";
import { getBooks } from "../data/api";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [books, setBooks] = useState([]);

  const mapRef = useRef();

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
    // default UK view (without geolocation)
    latitude: 53.797193,
    longitude: -3.656831,
    latitudeDelta: 15,
    longitudeDelta: 15,
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
    const setMapRegionConstant = setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    const animateToRegion = () => {
      mapRef.current.animateToRegion(
        // this.mapView.animateToRegion(
        setMapRegionConstant,
        2000
      );
    };
    animateToRegion();
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
          <MapView style={styles.map} region={mapRegion} ref={mapRef}>
            {locations.map((location) => (
              <Marker key={`mk${createKey(location)}`} coordinate={location} />
            ))}
            {locations.map((location) => (
              <Circle
                key={`c${createKey(location)} + ${Math.random() * 10}`}
                center={location}
                radius={20}
                fillColor="rgba(100,100,100,0.2)"
                strokeWidth={0}
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
