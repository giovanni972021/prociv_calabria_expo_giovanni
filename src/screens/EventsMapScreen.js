import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { eventsService } from '../services/api';
import { CONFIG } from '../constants/config';

export default function EventsMapScreen({ navigation }) {
  const [region, setRegion] = useState(CONFIG.MAP_CONFIG.INITIAL_REGION);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [showMyReports, setShowMyReports] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    loadEvents();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        // Aggiorna la regione se l'utente è in Calabria
        if (isInCalabria(location.coords.latitude, location.coords.longitude)) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      }
    } catch (error) {
      console.error('Errore geolocalizzazione:', error);
    }
  };

  const isInCalabria = (latitude, longitude) => {
    // Coordinate approssimative della Calabria
    return (
      latitude >= 37.9 && latitude <= 40.2 &&
      longitude >= 15.6 && longitude <= 17.2
    );
  };

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsService.findEvents({
        // Filtri per eventi pubblici
        status: 'open',
        isPublic: true,
      });
      
      // Simula dati eventi per la demo
      const mockEvents = [
        {
          id: '1',
          title: 'Allagamento Strada Provinciale',
          description: 'Segnalazione di allagamento sulla SP 123',
          latitude: 39.3081,
          longitude: 16.2539,
          type: 'flood',
          status: 'open',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Frana Località Monte Alto',
          description: 'Frana che blocca la viabilità',
          latitude: 39.2081,
          longitude: 16.3539,
          type: 'landslide',
          status: 'open',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Incendio Boschivo',
          description: 'Principio di incendio in zona boschiva',
          latitude: 39.4081,
          longitude: 16.1539,
          type: 'fire',
          status: 'open',
          createdAt: new Date().toISOString(),
        },
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Errore caricamento eventi:', error);
      Alert.alert('Errore', 'Impossibile caricare gli eventi');
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (eventType) => {
    switch (eventType) {
      case 'flood':
        return '#007AFF';
      case 'landslide':
        return '#FF9500';
      case 'fire':
        return '#FF3B30';
      default:
        return '#FF6B35';
    }
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'flood':
        return 'water';
      case 'landslide':
        return 'triangle';
      case 'fire':
        return 'flame';
      default:
        return 'warning';
    }
  };

  const handleMarkerPress = (event) => {
    Alert.alert(
      event.title,
      event.description,
      [
        { text: 'Chiudi', style: 'cancel' },
        { text: 'Dettagli', onPress: () => showEventDetails(event) },
      ]
    );
  };

  const showEventDetails = (event) => {
    // Naviga ai dettagli dell'evento
    console.log('Mostra dettagli evento:', event);
  };

  const toggleView = () => {
    navigation.navigate('EventsList');
  };

  const toggleFilter = () => {
    setShowMyReports(!showMyReports);
    // Qui implementeresti il filtro per le proprie segnalazioni
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons 
            name={showMyReports ? 'person' : 'people'} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.filterText}>
            {showMyReports ? 'Le mie segnalazioni' : 'Eventi'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.viewButton} onPress={toggleView}>
          <Ionicons name="list" size={20} color="#fff" />
          <Text style={styles.viewButtonText}>Lista</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {events.map((event) => (
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

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Caricamento eventi...</Text>
        </View>
      )}

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legenda</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#007AFF' }]} />
          <Text style={styles.legendText}>Allagamenti</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9500' }]} />
          <Text style={styles.legendText}>Frane</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF3B30' }]} />
          <Text style={styles.legendText}>Incendi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});

