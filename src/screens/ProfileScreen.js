import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { commonstyles } from "../styles/commonstyles";
import HeaderSection1 from "../components/HeaderSection1";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // o altra famiglia di icone

const CommunicationScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showUserData, setShowUserData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Errore apertura URL:", err)
    );
  };

  return (
    <View style={commonstyles.container}>
      <HeaderSection1 />
      <View style={commonstyles.headerMiddle}>
        <Text style={commonstyles.header2}>ProCiv Calabria</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuItemsContainer}>
        <TouchableOpacity
          onPress={() => setShowUserData(!showUserData)}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>Dati utente</Text>
          <Icon
            name={showUserData ? "chevron-down" : "chevron-right"}
            size={16}
            color="#0091D6"
          />
        </TouchableOpacity>

        {showUserData && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => navigation.navigate("DatiUtente")}>
              <Text style={styles.menuText}>Dati utente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.menuText}>Elimina utente</Text>
            </TouchableOpacity>
          </View>
        )}

        {renderMenuItem("Profili")}
        {renderMenuItem("Sito Internet", () =>
          openURL("https://www.protezionecivilecalabria.it/")
        )}
        {renderMenuItem("Informativa Privacy", () =>
          openURL("https://www.protezionecivilecalabria.it/?page_id=314")
        )}
        {renderMenuItem("Contatti", () =>
          openURL("https://www.protezionecivilecalabria.it/?page_id=317")
        )}

        <TouchableOpacity
          onPress={() => setShowInfo(!showInfo)}
          style={styles.menuItem}
        >
          <Text style={styles.menuText}>About</Text>
          <Icon
            name={showInfo ? "chevron-down" : "chevron-right"}
            size={16}
            color="#0091D6"
          />
        </TouchableOpacity>

        {showInfo && (
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              ProCiv Calabria è l'applicazione della Protezione Civile della
              Regione Calabria che permette al cittadino e all'operatore di
              essere informato e di effettuare segnalazioni sugli eventi
              emergenziali (incendi, frane, ecc...) che interessano il
              territorio, al fine di migliorare e semplificare la comunicazione
              e la partecipazione.{"\n\n"}
              Versione numero: 1.0.22
            </Text>
            <TouchableOpacity
              onPress={() => setShowInfo(false)}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Indietro</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Sei sicuro di voler effettuare il logout?
            </Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Home");
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText2}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const renderMenuItem = (title, onPress) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!onPress}
    style={styles.menuItem}
  >
    <Text style={styles.menuText}>{title}</Text>
    <Icon name="chevron-right" size={16} color="#0091D6" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItemsContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
  },
  dropdownMenu: {
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  infoTextContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  backButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#0091D6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsRow: {
    flexDirection: "row",
  },
  modalButton: {
    marginHorizontal: 10,
    paddingVertical: 12,
  },
  modalButtonText: {
    fontSize: 16,
    color: "black",
  },
  modalButtonText2: {
    fontSize: 16,
    color: "red",
  },
});

export default CommunicationScreen;
