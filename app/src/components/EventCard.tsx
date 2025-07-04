import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { getFormattedDateTime } from "../hooks/dateHelper";
import i18n from "../i18n";
import { toggleFavorite } from "../redux/slices/eventSlice";
import { AppDispatch } from "../redux/store";
import eventDetailStyles from "../styles/eventDetailStyles";
import HorizontalImageGallery from "./HorizontalImageGallery";

const EventCard = ({ event, eventTapped }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(event.id));
  };

  return (
    <View style={styles.card}>
      <HorizontalImageGallery images={event.images} />
      <TouchableOpacity
        onPress={handleFavoriteToggle}
        style={styles.favoriteIcon}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons
          name={event.isFavorite ? "favorite" : "favorite-border"}
          size={28}
          color={event.isFavorite ? "#e74c3c" : "#aaa"}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{event.name}</Text>
      {event.dates?.start?.localDate && event.dates?.start?.localTime && (
        <Text style={eventDetailStyles.dateTime}>
          {getFormattedDateTime(
            event.dates.start.localDate,
            event.dates.start.localTime,
            t,
            i18n
          )}
        </Text>
      )}{" "}
      <TouchableOpacity
        onPress={() => eventTapped(event.id)}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteText}>{t("eventCard.viewDetails")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    margin: 2,
    paddingVertical: 5,
    marginVertical: 5,
    elevation: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  favoriteIcon: {
    position: "absolute",
    bottom: 50,
    right: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  favoriteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  favoriteText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default EventCard;
