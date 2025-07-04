import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventDetailsAsync,
  toggleFavorite,
} from "../redux/slices/eventSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useEventDetail = (eventId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === eventId)
  );
  const loading = useSelector((state: RootState) => state.events.loading);

  useEffect(() => {
    if (!event || !event.description) {
      dispatch(fetchEventDetailsAsync(eventId));
    }
  }, [dispatch, eventId]);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(eventId));
  };

  const handleSelectSeat = () => {
    if (event?.url) {
      Linking.openURL(event.url);
    }
  };

  return {
    t,
    i18n,
    event,
    loading,
    handleFavoriteToggle,
    handleSelectSeat,
  };
};
