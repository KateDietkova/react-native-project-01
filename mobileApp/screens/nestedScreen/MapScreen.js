import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [addressName, setAddress] = useState({});
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (error) {
        console.log("Error in set coordinate", error);
      }
    })();
  }, []);

  // let address = [];
  // const getAddress = async (location) => {
  //   try {
  //     if (route.params.nameScreen === "CreatePost" && location) {
  //       address = await Location.reverseGeocodeAsync(location);
  //     }
  //       setAddress((prevState) => {
  //         if (prevState !== address[0]) return address[0];
  //       });
  //       console.log("Cicle");
  //   } catch (error) {
  //     console.log("Error in getAddress", error);
  //   }
  // };

  // getAddress(location);

  // if (address) {
  //   console.log(route);
  // }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onPress={(e) => {
          setLocation(e.nativeEvent.coordinate);
        }}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={(region) => console.log(region)}
      >
        {location && (
          <Marker
            title="I am here"
            coordinate={{ ...location }}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
