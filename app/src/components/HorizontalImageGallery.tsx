import { Image as ExpoImage } from "expo-image";
import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const HorizontalImageGallery = ({ images }) => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => item.url || index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ExpoImage
          source={{ uri: item.url }}
          style={styles.image}
          contentFit="cover"
          transition={300}
          cachePolicy="disk"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: width * 0.7,
    height: 200,
    borderRadius: 12,
    marginRight: 15,
  },
});

export default HorizontalImageGallery;
