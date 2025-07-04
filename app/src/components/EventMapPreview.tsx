import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface EventMapPreviewProps {
  latitude: number;
  longitude: number;
  name: string;
}

const EventMapPreview: React.FC<EventMapPreviewProps> = ({
  latitude,
  longitude,
  name,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={name} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Set a fixed height for the map
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default EventMapPreview;
