import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, View } from "react-native";
import { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";

export const PostABookMap = ({ navigation }) => {
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 53.797118,
    longitude: -1.556924,
  });
  const mapRegion = {
    latitude: 53.797193,
    longitude: -3.656831,
    latitudeDelta: 15,
    longitudeDelta: 15,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView style={styles.map} region={mapRegion}>
            <Marker
              coordinate={markerCoordinate}
              draggable
              onDragEnd={(e) => {
                setMarkerCoordinate(e.nativeEvent.coordinate);
              }}
            ></Marker>
          </MapView>
        </View>
        <Button
          title="Set Book Location"
          onPress={() => {
            navigation.navigate("Post a Book", {
              // ? is null required
              location: markerCoordinate,
              book_id: null,
              location_description: null,
            });
          }}
        />
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
});
