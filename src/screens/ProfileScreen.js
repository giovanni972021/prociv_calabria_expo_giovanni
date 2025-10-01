import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { commonstyles } from "../styles/commonstyles";
import HeaderSection1 from "../components/HeaderSection1";

import { useNavigation } from "@react-navigation/native"; // Importa il hook useNavigation

const CommunicationScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showUserData, setShowUserData] = useState(false); // State to manage user data dropdown
  const navigation = useNavigation(); // Inizializza il navigatore

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handleUserDataClick = () => {
    setShowUserData(!showUserData); // Toggle dropdown visibility
  };

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Errore apertura URL:", err)
    );
  };

  const handleLogout = () => {
    navigation.replace("Home"); // Use replace to prevent going back to the previous screen
  };

  return (
    <View style={commonstyles.container}>
      <>
        <HeaderSection1 />

        {/* Prociv Calabria + bottone segnala */}
        <View style={commonstyles.headerMiddle}>
          <Text style={commonstyles.header2}>ProCiv Calabria</Text>
          {/* Icona di Logout */}
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="sign-out-alt" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </>

      <ScrollView style={styles.menuItemsContainer}>
        <TouchableOpacity onPress={handleUserDataClick} style={styles.menuItem}>
          <Text style={styles.menuText}>Dati utente</Text>
          <Icon
            name={showUserData ? "chevron-down" : "chevron-right"}
            size={16}
            color="#0091D6"
          />
        </TouchableOpacity>

        {/* Render dropdown menu for "Dati utente" */}
        {showUserData && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => navigation.navigate("DatiUtente")}>
              <Text style={styles.menuText}>Dati utente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                /* logica per eliminare utente */
              }}
            >
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

        <TouchableOpacity onPress={handleInfoClick} style={styles.menuItem}>
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
              onPress={handleInfoClick}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Indietro</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 10,
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
});

export default CommunicationScreen;
