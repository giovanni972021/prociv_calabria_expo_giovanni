import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { commonstyles } from "../styles/commonstyles";
import { useNavigation } from "@react-navigation/native";
import HeaderSection1 from "../components/HeaderSection1"; // ✅ IMPORTA HEADER
import HeaderSection1b2 from "../components/Headersection1b2"; // ✅ IMPORTA HEADER

const DatiUtenteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderSection1 />.
      <HeaderSection1b2 />
      {/* Sezione dati utente */}
      <View style={styles.userDataContainer}>
        <Text style={styles.title}>Dati utente</Text>
        <Text style={styles.userName}>GIOVANNI CAPUANO</Text>
        <Text style={styles.userName}>CPNGNN97R30H501J</Text>

        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => navigation.navigate("AggiornaContatti")}
        >
          <Text style={styles.updateButtonText}>Aggiorna contatti</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.cancelButtonText}>Annulla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
  },

  userDataContainer: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    color: "#222",
  },
  userName: {
    fontSize: 18,
    color: "#1A2A48",
    marginBottom: 6,
  },

  button: {
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: "#006FCB",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DatiUtenteScreen;
