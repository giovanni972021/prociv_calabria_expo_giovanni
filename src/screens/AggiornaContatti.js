import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function CommunicationScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      {/* Header superiore */}
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={commonStyles.reportButtonImage}
        />
      </View>

      {/* Header medio */}
      <View style={commonStyles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.title}>Aggiorna contatti</Text>
        <Text style={styles.subText}>
          I campi contrassegnati da{" "}
          <Text style={{ fontWeight: "bold" }}>*</Text> sono obbligatori
        </Text>

        {/* Email */}
        <Text style={styles.sectionTitle}>
          Email di registrazione <Text style={{ fontWeight: "bold" }}>*</Text>
        </Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Inserisci email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: email ? "#007BFF" : "#ddd" },
          ]}
          disabled={!email}
        >
          <Text
            style={[
              styles.verifyButtonText,
              { color: email ? "#fff" : "#888" },
            ]}
          >
            Verifica email
          </Text>
        </TouchableOpacity>

        {/* Linea orizzontale */}
        <View style={styles.separatorLine} />

        {/* Numero cellulare */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Numero di cellulare
        </Text>
        <Text style={styles.label}>Numero di cellulare</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Inserisci numero"
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: phone ? "#007BFF" : "#ddd" },
          ]}
          disabled={!phone}
        >
          <Text
            style={[
              styles.verifyButtonText,
              { color: phone ? "#fff" : "#888" },
            ]}
          >
            Verifica numero
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.proceedButton,
            { backgroundColor: phone ? "#28a745" : "#ddd" },
          ]}
          disabled={!phone}
        >
          <Text
            style={[
              styles.proceedButtonText,
              { color: phone ? "#fff" : "#888" },
            ]}
          >
            Procedi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("DatiUtente")}
        >
          <Text style={styles.cancelButtonText}>Annulla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#222",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#222",
    fontWeight: "600",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#1A2A48",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#1A2A48",
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 15,
  },
  verifyButton: {
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  verifyButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  proceedButton: {
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  proceedButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelButtonText: {
    color: "#1A2A48",
    fontWeight: "600",
    fontSize: 16,
  },
  separatorLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
