import { View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet } from "react-native-web";
import { locations } from '../coordinates'

const Map = () => {

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
    );
  };

   export default Map;

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      width: '100%',
      height: '100%'
    },
    loginContainer: {
      flex: 1,
      alignItems: "center"
    },
    input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 6,
      margin: 10,
      width: 200
    }
  })