import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { commonstyles } from "../styles/commonstyles";
import HeaderSection1 from "../components/HeaderSection1";
import HeaderSection1b2 from "../components/Headersection1b2";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
const appVersion =
  Constants.expoConfig.version ?? Constants.manifest.version ?? "N/A";

const CommunicationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={commonstyles.container}>
      <HeaderSection1 />
      <HeaderSection1b2 />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Info</Text>
          <Text style={styles.infoText}>
            ProCiv Calabria è l'applicazione della Protezione Civile della
            Regione Calabria che permette al cittadino e all'operatore di essere
            informato e di effettuare segnalazioni sugli eventi emergenziali
            (incendi, frane, ecc...) che interessano il territorio, al fine di
            migliorare e semplificare la comunicazione e la partecipazione.
          </Text>
          <Text style={styles.infoText2}> Versione numero: {appVersion}</Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()} // Assuming "Indietro" means go back
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Indietro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  infoSection: {
    marginTop: 15,
    padding: 8,
    marginBottom: 15, // Space below the info section
  },
  infoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 22,
    lineHeight: 32,
    color: "#0003b4ff",

    textAlign: "justify",
  },
  infoText2: {
    fontSize: 22,
    lineHeight: 32,
    color: "#0003b4ff",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#f0f0f0", // Light grey background for button
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CommunicationScreen;
