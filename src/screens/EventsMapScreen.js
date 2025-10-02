import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { CONFIG } from "../constants/config";
import { commonstyles } from "../styles/commonstyles";
import HeaderSection1 from "../components/HeaderSection1";
import HeaderSection1b from "../components/Headersection1b";
import HeaderSection1b2 from "../components/Headersection1b2";

import HeaderSection1c from "../components/HeaderSection1c";

export default function EventsMapScreen({ route }) {
  const { anonymous } = route.params || {};

  const [region, setRegion] = useState(CONFIG.MAP_CONFIG.INITIAL_REGION);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        if (
          latitude >= 37.9 &&
          latitude <= 40.2 &&
          longitude >= 15.6 &&
          longitude <= 17.2
        ) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      }
      if (!anonymous) await loadEvents();
      else setLoading(false);
    })();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      setEvents([
        {
          id: "1",
          title: "Allagamento Strada Provinciale",
          description: "Segnalazione di allagamento sulla SP 123",
          latitude: 39.3081,
          longitude: 16.2539,
          type: "flood",
        },
        {
          id: "2",
          title: "Frana Località Monte Alto",
          description: "Frana che blocca la viabilità",
          latitude: 39.2081,
          longitude: 16.3539,
          type: "landslide",
        },
        {
          id: "3",
          title: "Incendio Boschivo",
          description: "Principio di incendio in zona boschiva",
          latitude: 39.4081,
          longitude: 16.1539,
          type: "fire",
        },
      ]);
    } catch {
      Alert.alert("Errore", "Impossibile caricare gli Eventi");
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (type) =>
    type === "flood"
      ? "#000000ff"
      : type === "landslide"
      ? "#FF9500"
      : type === "fire"
      ? "#FF3B30"
      : "#FF6B35";

  const handleMarkerPress = (event) =>
    Alert.alert(event.title, event.description, [
      { text: "Chiudi", style: "cancel" },
      {
        text: "Dettagli",
        onPress: () => console.log("Mostra dettagli evento:", event),
      },
    ]);
  //se anonimo mostra header section 1b anziche 1b2
  return (
    <SafeAreaView style={commonstyles.container}>
      <HeaderSection1 />

      {anonymous ? <HeaderSection1b2 /> : <HeaderSection1b />}
      <HeaderSection1c activeTab="Mappa" />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={commonstyles.flex1}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={!anonymous}
      >
        {!anonymous &&
          events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              title={event.title}
              description={event.description}
              pinColor={getMarkerColor(event.type)}
              onPress={() => handleMarkerPress(event)}
            />
          ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Caricamento Eventi...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
