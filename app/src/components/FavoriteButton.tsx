import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/eventSlice";

const FavoriteButton = ({ eventId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.events.favorites);
  const isFavorite = favorites.includes(eventId);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(eventId));
  };

  return (
    <TouchableOpacity
      style={[styles.button, isFavorite && styles.favorited]}
      onPress={handleToggleFavorite}
    >
      <Text style={styles.buttonText}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  favorited: {
    backgroundColor: "#FF6347",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default FavoriteButton;
