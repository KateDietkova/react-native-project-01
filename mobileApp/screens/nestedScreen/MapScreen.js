import { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./MapScreen.styled";

const MapScreen = ({ route }) => {
  const [location, setlocation] = useState(route.params.location);
  const [isShowMarker, setisShowMarker] = useState(false);
  useEffect(() => {
    if (Object.keys(location).length !== 0) {
      setisShowMarker(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 50.4501,
          longitude: 30.5234,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        // onMapReady={() => console.log("Map is ready")}
      >
        {isShowMarker && (
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
