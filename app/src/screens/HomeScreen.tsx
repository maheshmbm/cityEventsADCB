import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import EventCard from "../components/EventCard";
import { useHome } from "../hooks/useHome";
import homeStyles from "../styles/HomeStyles";

const HomeScreen = () => {
  const {
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
  } = useHome();

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, city]);

  const renderEvent = ({ item }: { item: (typeof events)[0] }) => (
    <EventCard event={item} eventTapped={handleEventPress} />
  );

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.row}>
        <TextInput
          style={[homeStyles.input, { flex: 1, marginRight: 8 }]}
          placeholder={t("home.keyword")}
          value={keyword}
          onChangeText={setKeyword}
        />
        <TextInput
          style={[homeStyles.input, { flex: 1, marginRight: 8 }]}
          placeholder={t("home.city")}
          value={city}
          onChangeText={setCity}
        />
        <Button title={t("home.search")} onPress={handleSearch} />
      </View>
      {loading && events.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={homeStyles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          ListFooterComponent={
            loading && events.length > 0 ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;
