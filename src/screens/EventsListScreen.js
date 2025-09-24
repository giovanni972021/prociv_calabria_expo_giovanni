import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { eventsService } from "../services/api";

export default function EventsListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showMyReports, setShowMyReports] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [showMyReports]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      // Simula dati Eventi per la demo
      const mockEvents = [
        {
          id: "1",
          title: "Allagamento Strada Provinciale",
          description:
            "Segnalazione di allagamento sulla SP 123 all'altezza del km 15. La strada risulta impraticabile per i veicoli.",
          type: "flood",
          status: "open",
          location: "Cosenza, SP 123",
          createdAt: "2024-09-17T08:30:00Z",
          priority: "high",
          hasInjured: false,
          hasVictims: false,
        },
        {
          id: "2",
          title: "Frana Località Monte Alto",
          description:
            "Frana che blocca completamente la viabilità sulla strada comunale. Necessario intervento urgente.",
          type: "landslide",
          status: "open",
          location: "Catanzaro, Monte Alto",
          createdAt: "2024-09-17T07:15:00Z",
          priority: "critical",
          hasInjured: true,
          hasVictims: false,
        },
        {
          id: "3",
          title: "Incendio Boschivo",
          description:
            "Principio di incendio in zona boschiva. Fumo visibile dalla strada statale.",
          type: "fire",
          status: "open",
          location: "Reggio Calabria, Aspromonte",
          createdAt: "2024-09-17T06:45:00Z",
          priority: "high",
          hasInjured: false,
          hasVictims: false,
        },
        {
          id: "4",
          title: "Albero Caduto",
          description:
            "Albero caduto sulla carreggiata a causa del vento forte.",
          type: "obstacle",
          status: "resolved",
          location: "Crotone, Via Roma",
          createdAt: "2024-09-16T18:20:00Z",
          priority: "medium",
          hasInjured: false,
          hasVictims: false,
        },
      ];

      // Filtra per le proprie segnalazioni se necessario
      const filteredEvents = showMyReports
        ? mockEvents.filter((event) => event.id === "1") // Simula che solo l'evento 1 sia dell'utente
        : mockEvents;

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Errore caricamento Eventi:", error);
      Alert.alert("Errore", "Impossibile caricare gli Eventi");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const getEventicon = (eventType) => {
    switch (eventType) {
      case "flood":
        return "water";
      case "landslide":
        return "triangle";
      case "fire":
        return "flame";
      case "obstacle":
        return "warning";
      default:
        return "alert-circle";
    }
  };

  const getEventColor = (eventType) => {
    switch (eventType) {
      case "flood":
        return "#007AFF";
      case "landslide":
        return "#FF9500";
      case "fire":
        return "#FF3B30";
      case "obstacle":
        return "#8E8E93";
      default:
        return "#FF6B35";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "#FF3B30";
      case "high":
        return "#FF9500";
      case "medium":
        return "#FFCC00";
      case "low":
        return "#34C759";
      default:
        return "#8E8E93";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Aperto";
      case "in_progress":
        return "In corso";
      case "resolved":
        return "Risolto";
      default:
        return "Sconosciuto";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEventPress = (event) => {
    Alert.alert(
      event.title,
      `${event.description}\n\nLocalità: ${event.location}\nData: ${formatDate(
        event.createdAt
      )}`,
      [
        { text: "Chiudi", style: "cancel" },
        { text: "Dettagli", onPress: () => showEventDetails(event) },
      ]
    );
  };

  const showEventDetails = (event) => {
    // Naviga ai dettagli dell'evento
    console.log("Mostra dettagli evento:", event);
  };

  const toggleFilter = () => {
    setShowMyReports(!showMyReports);
  };

  const renderEventitem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
    >
      <View style={styles.eventHeader}>
        <View style={styles.EventiconContainer}>
          <Ionicons
            name={getEventicon(item.type)}
            size={24}
            color={getEventColor(item.type)}
          />
        </View>
        <View style={styles.Eventinfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
        <View style={styles.eventStatus}>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority) },
            ]}
          >
            <Text style={styles.priorityText}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.eventDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.eventFooter}>
        <Text style={styles.eventDate}>{formatDate(item.createdAt)}</Text>
        <View style={styles.eventBadges}>
          {item.hasInjured && (
            <View style={styles.warningBadge}>
              <Ionicons name="medical" size={12} color="#fff" />
              <Text style={styles.badgeText}>Feriti</Text>
            </View>
          )}
          {item.hasVictims && (
            <View style={styles.criticalBadge}>
              <Ionicons name="skull" size={12} color="#fff" />
              <Text style={styles.badgeText}>Vittime</Text>
            </View>
          )}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "resolved" ? "#34C759" : "#FF6B35",
              },
            ]}
          >
            <Text style={styles.badgeText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons
            name={showMyReports ? "person" : "people"}
            size={20}
            color="#fff"
          />
          <Text style={styles.filterText}>
            {showMyReports ? "Le mie segnalazioni" : "Eventi"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="map" size={20} color="#fff" />
          <Text style={styles.mapButtonText}>Mappaaaa</Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        renderItem={renderEventitem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF6B35"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              {showMyReports
                ? "Nessuna segnalazione trovata"
                : "Nessun evento disponibile"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF6B35",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mapButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  EventiconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  Eventinfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
  eventStatus: {
    alignItems: "flex-end",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventDate: {
    fontSize: 12,
    color: "#999",
  },
  eventBadges: {
    flexDirection: "row",
    gap: 6,
  },
  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9500",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 2,
  },
  criticalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 2,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 15,
    textAlign: "center",
  },
});
