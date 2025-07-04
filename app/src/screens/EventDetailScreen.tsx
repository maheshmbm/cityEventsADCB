import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import EventMapPreview from "../components/EventMapPreview";
import HorizontalImageGallery from "../components/HorizontalImageGallery";
import { getFormattedDateTime } from "../hooks/dateHelper";
import { useEventDetail } from "../hooks/useEventDetail";
import i18n from "../i18n";
import { RootStackParamList } from "../navigation/AppNavigator";
import eventDetailStyles from "../styles/eventDetailStyles";

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, "EventDetails">;

interface EventDetailScreenProps {
  route: EventDetailScreenRouteProp;
}

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ route }) => {
  const { eventId } = route.params;
  const {
    t,
    event,
    loading,
    handleFavoriteToggle,
    handleSelectSeat,
  } = useEventDetail(eventId);

  if (!event || loading) {
    return (
      <View style={eventDetailStyles.container}>
        <ActivityIndicator size="large" />
        <Text style={eventDetailStyles.loadingText}>{t("events.loading")}</Text>
      </View>
    );
  }

  const venue = event._embedded?.venues?.[0];

  return (
    <ScrollView style={eventDetailStyles.container}>
      <Text style={eventDetailStyles.title}>{event.name}</Text>
      <HorizontalImageGallery images={event.images} />
      {event.dates?.start?.localDate && event.dates?.start?.localTime && (
        <Text style={eventDetailStyles.dateTime}>
          {getFormattedDateTime(
            event.dates.start.localDate,
            event.dates.start.localTime,
            t,
            i18n
          )}
        </Text>
      )}
      <Text style={eventDetailStyles.description}>
        {event.description || t("events.noDescription")}
      </Text>
      {venue && (
        <>
          <Text style={eventDetailStyles.venueTitle}>
            {t("events.venue")}: {venue.name}
          </Text>
          <Text style={eventDetailStyles.venueAddress}>
            {venue.address?.line1}, {venue.city?.name}
          </Text>
        </>
      )}
      {venue?.location && (
        <EventMapPreview
          latitude={parseFloat(venue.location.latitude)}
          longitude={parseFloat(venue.location.longitude)}
          name={venue.name}
        />
      )}
      <TouchableOpacity
        onPress={handleFavoriteToggle}
        style={eventDetailStyles.favoriteIcon}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons
          name={event.isFavorite ? "favorite" : "favorite-border"}
          size={28}
          color={event.isFavorite ? "#e74c3c" : "#aaa"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSelectSeat} style={eventDetailStyles.selectSeatLink}>
        <Text style={eventDetailStyles.selectSeatLinkText}>{t("events.selectSeat")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventDetailScreen;
