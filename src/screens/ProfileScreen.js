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
import Icon from "react-native-vector-icons/FontAwesome";
import { commonStyles } from "../styles/commonStyles";

const CommunicationScreen = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Errore apertura URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={styles.reportButtonImage}
        />
      </View>

      <View style={styles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.profileName}>Claudia Blanda</Text>
      </View>

      <ScrollView style={styles.menuItemsContainer}>
        {renderMenuItem("Dati utente")}
        {renderMenuItem("Profili attivi")}
        {renderMenuItem("Sito Internet", () =>
          openURL("https://www.protezionecivilecalabria.it/")
        )}
        {renderMenuItem("Informativa Privacy", () =>
          openURL("https://www.protezionecivilecalabria.it/?page_id=314")
        )}
        {renderMenuItem("Contattaci", () =>
          openURL("https://www.protezionecivilecalabria.it/?page_id=317")
        )}

        <TouchableOpacity onPress={handleInfoClick} style={styles.menuItem}>
          <Text style={styles.menuText}>Info</Text>
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
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F5F5F5",
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  reportButtonImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 10,
  },
  profileSection: {
    backgroundColor: "#0091D6",
    padding: 16,
    alignItems: "center",
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
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
