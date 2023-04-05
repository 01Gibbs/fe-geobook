import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Circle, Marker, Callout } from "react-native-maps";
import { StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";
import { getBooks } from "../data/api";
import { TrackingMarker } from "./Map-Components/TrackingMarker";
import { useFocusEffect } from "@react-navigation/native";

const Map = ({ navigation }) => {
  const [usersLocation, setUsersLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [books, setBooks] = useState([]);

  //Loading Animation: Feature to be Added
  // const LoadingAnimation = () => {
  //   return (
  //     <View style={loader.container}>
  //       <ActivityIndicator size="30%" color="#333" />
  //     </View>
  //   );
  // };

  function createKey(location) {
    return location.latitude + location.longitude + Math.random() * 100;
  }

  const mapRegion = {
    latitude: 53.797193,
    longitude: -3.656831,
    latitudeDelta: 15,
    longitudeDelta: 15,
  };

  const mapRef = useRef();

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      getBooks()
        .then((bookData) => {
          setLocations(
            bookData.map((book) => {
              return {
                longitude: book.location.coordinates[0],
                latitude: book.location.coordinates[1],
              };
            })
          );

          setBooks(
            bookData.map((book) => {
              return {
                id: book._id,
                genre: book.genre,
                location_description: book.location_description,
                posted_by: book.posted_by,
              };
            })
          );
          setIsLoading(false);
        })
        .catch((err) => console.log("error ==>", err));
      userLocation();
    }, [])
  );

  function createKey(location) {
    return location.latitude + location.longitude + Math.random() * 100;
  }

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    await setUsersLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    const animateToRegion = () => {
      mapRef.current.animateToRegion(usersLocation, 2000);
    };
    animateToRegion();
  };

  // Loading Animation Code: Feature to be Added
  // const loader = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //   },
  //   horizontal: {
  //     flexDirection: "row",
  //     justifyContent: "space-around",
  //     padding: 10,
  //   },
  // });

  // LoadingAnimation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView style={styles.map} region={mapRegion} ref={mapRef}>
            {isLoading
              ? null
              : locations.map((location, index) => {
                  return (
                    <Marker
                      key={`mk${createKey(location)}`}
                      coordinate={location}
                      image={require("../assets/book.png")}
                    >
                      <Callout
                        onPress={() =>
                          navigation.navigate("Book Information", {
                            book_id: books[index].id,
                          })
                        }
                        style={styles.bookCallout}
                      >
                        <Text style={styles.calloutHeading}>
                          Book information
                        </Text>
                        <Text style={styles.calloutText}>
                          Genre: {books[index].genre}
                        </Text>
                        <Text style={styles.calloutText}>
                          Left by: {books[index].posted_by}
                        </Text>
                      </Callout>
                    </Marker>
                  );
                })}
            {isLoading
              ? null
              : locations.map((location) => (
                  <Circle
                    key={`c${createKey(location)} + ${Math.random() * 10}`}
                    center={location}
                    radius={20}
                    fillColor="rgba(100,100,100,0.2)"
                    strokeWidth={0}
                  />
                ))}
            <TrackingMarker />
          </MapView>
        </View>
        <Pressable
          onPress={userLocation}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#83dbab" : "#5CDB95" },
          ]}
        >
          <Text style={styles.buttonText}>Get Location</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
  bookCallout: {
    padding: 8,
  },
  calloutHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2B5F6B",
  },
  calloutText: {
    fontSize: 14,
    color: "#132235",
  },
  buttonText: {
    fontSize: 16,
    color: "#132235",
  },
  button: {
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Map;
