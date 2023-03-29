import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { locations } from "./coordinates";
import * as Location from "expo-location";

export default function App() {
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.navbar}
      ></View>
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
        <Button title="Get  Location" onPress={userLocation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: "lightgreen",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
