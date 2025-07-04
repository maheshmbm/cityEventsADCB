import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsAsync, resetEvents } from "../redux/slices/eventSlice";
import { AppDispatch, RootState } from "../redux/store";

type RootStackParamList = {
  Home: undefined;
  EventDetails: { eventId: string };
};

export const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error, hasMore, page } = useSelector(
    (state: RootState) => state.events
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    dispatch(fetchEventsAsync({ keyword: "", city: "", page: 1 }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(resetEvents());
    dispatch(fetchEventsAsync({ keyword, city, page: 1 }));
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate("EventDetails", { eventId });
  };

  const handleEndReached = () => {
    if (!loading && hasMore && !onEndReachedCalledDuringMomentum.current) {
      dispatch(fetchEventsAsync({ keyword, city, page: page + 1 }));
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  return {
    t,
    events,
    loading,
    error,
    keyword,
    setKeyword,
    city,
    setCity,
    handleSearch,
    handleEventPress,
    handleEndReached,
    onEndReachedCalledDuringMomentum,
  };
};
