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
import { eventsService } from "../services/api";
import { CONFIG } from "../constants/config";
import { commonstyles } from "../styles/commonstyles";
import HeaderSection1 from "../components/HeaderSection1";
import HeaderSection1b from "../components/Headersection1b";
import HeaderSection1c from "../components/HeaderSection1c";

export default function EventsMapScreen({ navigation, route }) {
  const { anonymous } = route.params || {};

  const [region, setRegion] = useState(CONFIG.MAP_CONFIG.INITIAL_REGION);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
    if (!anonymous) {
      loadEvents();
    } else {
      setLoading(false); // Ferma il loader se anonimo
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (
          location.coords.latitude >= 37.9 &&
          location.coords.latitude <= 40.2 &&
          location.coords.longitude >= 15.6 &&
          location.coords.longitude <= 17.2
        ) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      }
    } catch (error) {
      console.error("Errore geolocalizzazione:", error);
    }
  };

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Simula eventi mockati. Sostituisci con API reale se serve.
      const mockEvents = [
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
      ];

      setEvents(mockEvents);
    } catch (error) {
      console.error("Errore caricamento Eventi:", error);
      Alert.alert("Errore", "Impossibile caricare gli Eventi");
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (eventType) => {
    switch (eventType) {
      case "flood":
        return "#000000ff";
      case "landslide":
        return "#FF9500";
      case "fire":
        return "#FF3B30";
      default:
        return "#FF6B35";
    }
  };

  const handleMarkerPress = (event) => {
    Alert.alert(event.title, event.description, [
      { text: "Chiudi", style: "cancel" },
      { text: "Dettagli", onPress: () => showEventDetails(event) },
    ]);
  };

  const showEventDetails = (event) => {
    console.log("Mostra dettagli evento:", event);
  };

  return (
    <SafeAreaView style={commonstyles.container}>
      {/* ✅ Header unificato */}
      <HeaderSection1 />
      <HeaderSection1b />
      <HeaderSection1c activeTab="Mappa" />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={commonstyles.flex1}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={!anonymous} // 👈 disattiva il pulsante se anonimo
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

      {/* Mostra loader solo se carica eventi */}
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
  anonymousBanner: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "#FF6B35",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  anonymousText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
