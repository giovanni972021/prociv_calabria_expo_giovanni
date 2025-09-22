import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CONFIG } from '../constants/config';

export default function WeatherBulletinScreen() {
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');

  const openExternalBulletin = async () => {
    try {
      const supported = await Linking.canOpenURL(CONFIG.EXTERNAL_URLS.WEATHER_BULLETIN);
      if (supported) {
        await Linking.openURL(CONFIG.EXTERNAL_URLS.WEATHER_BULLETIN);
      } else {
        Alert.alert('Errore', 'Impossibile aprire il link del bollettino meteo');
      }
    } catch (error) {
      console.error('Errore apertura link:', error);
      Alert.alert('Errore', 'Impossibile aprire il bollettino meteo');
    }
  };

  // Dati simulati per le zone della Calabria
  const weatherZones = [
    {
      id: 1,
      name: 'Zona A - Tirrenico Cosentino',
      description: 'Costa tirrenica da Praia a Paola',
      todayLevel: 'green',
      tomorrowLevel: 'yellow',
      todayDescription: 'Nessuna criticità',
      tomorrowDescription: 'Criticità ordinaria',
    },
    {
      id: 2,
      name: 'Zona B - Pollino e Sila Greca',
      description: 'Massicci montuosi del nord Calabria',
      todayLevel: 'yellow',
      tomorrowLevel: 'orange',
      todayDescription: 'Criticità ordinaria',
      tomorrowDescription: 'Criticità moderata',
    },
    {
      id: 3,
      name: 'Zona C - Ionio Cosentino',
      description: 'Costa ionica da Trebisacce a Corigliano',
      todayLevel: 'green',
      tomorrowLevel: 'green',
      todayDescription: 'Nessuna criticità',
      tomorrowDescription: 'Nessuna criticità',
    },
    {
      id: 4,
      name: 'Zona D - Crotonese',
      description: 'Area del Crotonese e Sila Piccola',
      todayLevel: 'yellow',
      tomorrowLevel: 'yellow',
      todayDescription: 'Criticità ordinaria',
      tomorrowDescription: 'Criticità ordinaria',
    },
    {
      id: 5,
      name: 'Zona E - Catanzarese',
      description: 'Area del Catanzarese e Serre',
      todayLevel: 'orange',
      tomorrowLevel: 'red',
      todayDescription: 'Criticità moderata',
      tomorrowDescription: 'Criticità elevata',
    },
    {
      id: 6,
      name: 'Zona F - Vibonese',
      description: 'Area del Vibonese e costa tirrenica sud',
      todayLevel: 'green',
      tomorrowLevel: 'yellow',
      todayDescription: 'Nessuna criticità',
      tomorrowDescription: 'Criticità ordinaria',
    },
    {
      id: 7,
      name: 'Zona G - Reggino Tirrenico',
      description: 'Costa tirrenica reggina e Aspromonte ovest',
      todayLevel: 'yellow',
      tomorrowLevel: 'orange',
      todayDescription: 'Criticità ordinaria',
      tomorrowDescription: 'Criticità moderata',
    },
    {
      id: 8,
      name: 'Zona H - Reggino Ionico',
      description: 'Costa ionica reggina e Aspromonte est',
      todayLevel: 'orange',
      tomorrowLevel: 'orange',
      todayDescription: 'Criticità moderata',
      tomorrowDescription: 'Criticità moderata',
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'green':
        return '#34C759';
      case 'yellow':
        return '#FFCC00';
      case 'orange':
        return '#FF9500';
      case 'red':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'green':
        return 'Verde';
      case 'yellow':
        return 'Giallo';
      case 'orange':
        return 'Arancione';
      case 'red':
        return 'Rosso';
      default:
        return 'N/D';
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderZoneCard = (zone) => {
    const level = selectedDay === 'today' ? zone.todayLevel : zone.tomorrowLevel;
    const description = selectedDay === 'today' ? zone.todayDescription : zone.tomorrowDescription;

    return (
      <View key={zone.id} style={styles.zoneCard}>
        <View style={styles.zoneHeader}>
          <View style={styles.zoneInfo}>
            <Text style={styles.zoneName}>{zone.name}</Text>
            <Text style={styles.zoneDescription}>{zone.description}</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(level) }]}>
            <Text style={styles.levelText}>{getLevelText(level)}</Text>
          </View>
        </View>
        <Text style={styles.criticityDescription}>{description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="cloud" size={60} color="#FF6B35" />
        <Text style={styles.title}>Bollettino Meteo</Text>
        <Text style={styles.subtitle}>
          Criticità marino-costiere per la Regione Calabria
        </Text>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        <TouchableOpacity
          style={[
            styles.dayButton,
            selectedDay === 'today' && styles.dayButtonActive
          ]}
          onPress={() => setSelectedDay('today')}
        >
          <Text style={[
            styles.dayButtonText,
            selectedDay === 'today' && styles.dayButtonTextActive
          ]}>
            Oggi
          </Text>
          <Text style={[
            styles.dayButtonDate,
            selectedDay === 'today' && styles.dayButtonDateActive
          ]}>
            {getCurrentDate()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dayButton,
            selectedDay === 'tomorrow' && styles.dayButtonActive
          ]}
          onPress={() => setSelectedDay('tomorrow')}
        >
          <Text style={[
            styles.dayButtonText,
            selectedDay === 'tomorrow' && styles.dayButtonTextActive
          ]}>
            Domani
          </Text>
          <Text style={[
            styles.dayButtonDate,
            selectedDay === 'tomorrow' && styles.dayButtonDateActive
          ]}>
            {getTomorrowDate()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Livelli di allertamento</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#34C759' }]} />
            <Text style={styles.legendText}>Verde - Nessuna criticità</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFCC00' }]} />
            <Text style={styles.legendText}>Giallo - Criticità ordinaria</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF9500' }]} />
            <Text style={styles.legendText}>Arancione - Criticità moderata</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF3B30' }]} />
            <Text style={styles.legendText}>Rosso - Criticità elevata</Text>
          </View>
        </View>
      </View>

      {/* Zones List */}
      <ScrollView style={styles.zonesContainer} showsVerticalScrollIndicator={false}>
        {weatherZones.map(renderZoneCard)}
      </ScrollView>

      {/* External Link Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.externalButton}
          onPress={openExternalBulletin}
        >
          <Ionicons name="open-outline" size={20} color="#fff" />
          <Text style={styles.externalButtonText}>
            Apri bollettino completo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  daySelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#FF6B35',
  },
  dayButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  dayButtonTextActive: {
    color: '#fff',
  },
  dayButtonDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  dayButtonDateActive: {
    color: '#fff',
    opacity: 0.9,
  },
  legend: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  legendItems: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  zonesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  zoneCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  zoneInfo: {
    flex: 1,
    marginRight: 10,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  zoneDescription: {
    fontSize: 14,
    color: '#666',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  criticityDescription: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
  },
  externalButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  externalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

