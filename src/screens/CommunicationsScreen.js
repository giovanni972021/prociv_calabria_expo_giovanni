import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommunicationsScreen() {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadCommunications();
  }, []);

  const loadCommunications = async () => {
    setLoading(true);
    try {
      // Simula dati comunicazioni per la demo
      const mockCommunications = [
        {
          id: '1',
          title: 'Allerta Meteo - Temporali forti',
          subject: 'Avviso di criticità meteorologica',
          description: 'Si prevede l\'arrivo di temporali forti nelle prossime 24 ore. Si raccomanda massima prudenza.',
          content: `La Protezione Civile della Regione Calabria comunica che, sulla base delle previsioni meteorologiche, nelle prossime 24 ore sono previsti temporali forti su tutto il territorio regionale.

Si raccomanda alla popolazione di:
• Evitare spostamenti non necessari
• Non sostare sotto alberi o strutture precarie
• Prestare attenzione ai corsi d'acqua
• Seguire le indicazioni delle autorità locali

Per emergenze contattare il numero 112.

La situazione sarà costantemente monitorata e verranno forniti aggiornamenti tempestivi.`,
          createdAt: '2024-09-17T10:30:00Z',
          priority: 'high',
          category: 'weather',
          isPublic: true,
          author: 'Protezione Civile Regionale',
        },
        {
          id: '2',
          title: 'Esercitazione di Protezione Civile',
          subject: 'Comunicazione esercitazione programmata',
          description: 'Esercitazione di protezione civile programmata per il 25 settembre 2024.',
          content: `Si comunica che il giorno 25 settembre 2024, dalle ore 9:00 alle ore 17:00, si svolgerà un'esercitazione di Protezione Civile nel territorio comunale di Cosenza.

L'esercitazione prevede:
• Simulazione di scenario di emergenza
• Test dei sistemi di comunicazione
• Verifica delle procedure di evacuazione
• Coordinamento tra enti e volontariato

Durante l'esercitazione potrebbero essere attivate le sirene di allarme e potrebbero verificarsi limitazioni temporanee al traffico in alcune zone.

La popolazione è invitata a collaborare seguendo le indicazioni del personale autorizzato.`,
          createdAt: '2024-09-16T14:15:00Z',
          priority: 'medium',
          category: 'exercise',
          isPublic: true,
          author: 'Comune di Cosenza',
        },
        {
          id: '3',
          title: 'Aggiornamento viabilità SS106',
          subject: 'Ripristino viabilità dopo frana',
          description: 'Ripristinata la viabilità sulla SS106 dopo i lavori di messa in sicurezza.',
          content: `Si comunica che è stata ripristinata la normale viabilità sulla Strada Statale 106, nel tratto interessato dalla frana del 10 settembre scorso.

I lavori di messa in sicurezza sono stati completati e la strada è nuovamente percorribile in entrambe le direzioni.

Si raccomanda comunque prudenza nella guida e il rispetto dei limiti di velocità.

Ringraziamo la popolazione per la pazienza dimostrata durante i lavori.`,
          createdAt: '2024-09-15T16:45:00Z',
          priority: 'low',
          category: 'traffic',
          isPublic: true,
          author: 'ANAS Calabria',
        },
        {
          id: '4',
          title: 'Campagna prevenzione incendi',
          subject: 'Avvio campagna antincendio boschivo',
          description: 'Al via la campagna di prevenzione degli incendi boschivi per la stagione estiva.',
          content: `È ufficialmente iniziata la campagna di prevenzione degli incendi boschivi per la stagione estiva 2024.

Le misure preventive includono:
• Divieto di accensione fuochi all'aperto
• Controllo del territorio tramite pattuglie
• Sensibilizzazione della popolazione
• Coordinamento con i Vigili del Fuoco

Si ricorda che è vietato:
• Bruciare sterpaglie e residui vegetali
• Gettare mozziconi di sigaretta
• Accendere fuochi nei boschi
• Parcheggiare su vegetazione secca

Per segnalazioni chiamare il 1515 (Corpo Forestale) o il 115 (Vigili del Fuoco).`,
          createdAt: '2024-09-14T09:20:00Z',
          priority: 'medium',
          category: 'prevention',
          isPublic: true,
          author: 'Corpo Forestale Calabria',
        },
      ];

      setCommunications(mockCommunications);
    } catch (error) {
      console.error('Errore caricamento comunicazioni:', error);
      Alert.alert('Errore', 'Impossibile caricare le comunicazioni');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCommunications();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#8E8E93';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Bassa';
      default:
        return 'N/D';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'weather':
        return 'cloud-outline';
      case 'exercise':
        return 'fitness-outline';
      case 'traffic':
        return 'car-outline';
      case 'prevention':
        return 'shield-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCommunicationPress = (communication) => {
    setSelectedCommunication(communication);
    setModalVisible(true);
  };

  const renderCommunicationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.communicationCard}
      onPress={() => handleCommunicationPress(item)}
    >
      <View style={styles.communicationHeader}>
        <View style={styles.communicationIcon}>
          <Ionicons
            name={getCategoryIcon(item.category)}
            size={24}
            color="#FF6B35"
          />
        </View>
        <View style={styles.communicationInfo}>
          <Text style={styles.communicationTitle}>{item.title}</Text>
          <Text style={styles.communicationAuthor}>{item.author}</Text>
        </View>
        <View style={styles.priorityContainer}>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(item.priority) }
          ]}>
            <Text style={styles.priorityText}>{getPriorityText(item.priority)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.communicationDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.communicationFooter}>
        <Text style={styles.communicationDate}>{formatDate(item.createdAt)}</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Leggi di più</Text>
          <Ionicons name="chevron-forward" size={16} color="#FF6B35" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chatbubbles" size={60} color="#FF6B35" />
        <Text style={styles.title}>Comunicazioni</Text>
        <Text style={styles.subtitle}>
          Avvisi e comunicazioni ufficiali
        </Text>
      </View>

      {/* Communications List */}
      <FlatList
        data={communications}
        renderItem={renderCommunicationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF6B35']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              Nessuna comunicazione disponibile
            </Text>
          </View>
        }
      />

      {/* Communication Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedCommunication && (
            <>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Dettagli Comunicazione</Text>
                <View style={styles.placeholder} />
              </View>

              {/* Modal Content */}
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalCommunicationHeader}>
                  <View style={styles.modalCommunicationIcon}>
                    <Ionicons
                      name={getCategoryIcon(selectedCommunication.category)}
                      size={32}
                      color="#FF6B35"
                    />
                  </View>
                  <View style={styles.modalCommunicationInfo}>
                    <Text style={styles.modalCommunicationTitle}>
                      {selectedCommunication.title}
                    </Text>
                    <Text style={styles.modalCommunicationSubject}>
                      {selectedCommunication.subject}
                    </Text>
                    <Text style={styles.modalCommunicationAuthor}>
                      {selectedCommunication.author}
                    </Text>
                    <Text style={styles.modalCommunicationDate}>
                      {formatDate(selectedCommunication.createdAt)}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalCommunicationContent}>
                  <Text style={styles.modalCommunicationText}>
                    {selectedCommunication.content}
                  </Text>
                </View>
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </Modal>
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
  listContainer: {
    padding: 15,
  },
  communicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  communicationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  communicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  communicationInfo: {
    flex: 1,
  },
  communicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  communicationAuthor: {
    fontSize: 14,
    color: '#666',
  },
  priorityContainer: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  communicationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  communicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  communicationDate: {
    fontSize: 12,
    color: '#999',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 50,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 34,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalCommunicationHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalCommunicationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalCommunicationInfo: {
    flex: 1,
  },
  modalCommunicationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalCommunicationSubject: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  modalCommunicationAuthor: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 4,
  },
  modalCommunicationDate: {
    fontSize: 12,
    color: '#999',
  },
  modalCommunicationContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalCommunicationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

