import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleAnonymousAccess = () => {
    navigation.navigate("Main");
  };
  return (
    <>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Main Content */}
        <View style={styles.header}>
          {/* Contenitore della sezione header */}
          <Text style={styles.title}>
            {/* Titolo della schermata */}
            Accedi ai servizi di{"\n"}ProCiv Calabria {/* Testo principale */}
          </Text>
          <Text style={styles.subtitle}>
            {/* Sottotitolo della schermata */}
            Seleziona la modalità di accesso che preferisci
          </Text>
        </View>
        <View style={styles.content}>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Pulsante per il login */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.primaryButtonText}>
                {/* Testo del pulsante */}
                Entra con le tue credenziali
              </Text>
            </TouchableOpacity>
            {/* Link per la registrazione */}
            <TouchableOpacity onPress={handleRegister} activeOpacity={1}>
              <Text style={styles.linkText}>
                {/* Testo del link di registrazione */}
                Non hai delle credenziali?
                <Text style={styles.registerLink}>Registrati.</Text>
                {/* Testo del link per la registrazione */}
              </Text>
            </TouchableOpacity>
            {/* Linea divisoria */}
            <View style={styles.horizontalLine}></View>
            {/* Linea orizzontale separatrice */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleAnonymousAccess}
            >
              <Text style={styles.secondaryButtonText}>
                {/* Testo del pulsante */}
                Entra in modalità anonima
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  // Definizione degli stili CSS in un oggetto
  container: {
    flex: 1, // Fa in modo che il contenitore si espanda per occupare tutto lo spazio disponibile.
    backgroundColor: "#FFFFFF", // Imposta il colore di sfondo della schermata.
    paddingHorizontal: 20, // Aggiunge spazio orizzontale (a sinistra e a destra) nel contenitore.
    paddingTop: 20, // Aggiunge spazio in alto per evitare che il contenuto si sovrapponga alla status bar.
  },
  header: {
    alignItems: "flex-start", // Allinea il contenuto del header a sinistra.
    marginBottom: 30, // Aggiunge spazio sotto il header.
  },
  title: {
    fontSize: 34, // Imposta la dimensione del font del titolo.
    fontWeight: "bold", // Imposta il peso del font come grassetto.
    color: "#1E3A8A", // Colore del testo del titolo.
    textAlign: "left", // Allinea il testo del titolo a sinistra.
  },
  subtitle: {
    fontSize: 16, // Imposta la dimensione del font del sottotitolo.
    color: "#4B5563", // Colore del testo del sottotitolo.
    marginTop: 10, // Distanza tra il titolo e il sottotitolo.
    textAlign: "left", // Allinea il testo del sottotitolo a sinistra.
  },
  primaryButton: {
    backgroundColor: "#2563EB", // Colore di sfondo del pulsante (blu).
    paddingVertical: 15, // Padding verticale (spazio sopra e sotto) nel pulsante.
    borderRadius: 8, // Angoli arrotondati del pulsante.
    alignItems: "center", // Allinea il contenuto del pulsante (testo) al centro.
    marginBottom: 15, // Distanza tra il pulsante e gli altri elementi.
  },
  primaryButtonText: {
    color: "#FFFFFF", // Colore del testo del pulsante (bianco).
    fontSize: 16, // Imposta la dimensione del font.
    fontWeight: "bold", // Imposta il font in grassetto.
  },
  linkText: {
    fontSize: 16, // Imposta la dimensione del font del testo del link.
    color: "#6B7280", // Colore del testo del link.
    textAlign: "left", // Allinea il testo a sinistra.
    marginTop: 7, // Distanza tra il link e gli altri elementi.
    marginBottom: 20, // Distanza tra il link e gli altri elementi.
  },
  registerLink: {
    color: "#2563EB", // Colore del testo del link di registrazione (blu).
    fontWeight: "bold", // Imposta il testo del link in grassetto.
  },
  horizontalLine: {
    borderBottomWidth: 2, // Imposta la larghezza della linea orizzontale.
    borderBottomColor: "#E5E7EB", // Colore della linea orizzontale.
    marginVertical: 10, // Aggiunge spazio sopra e sotto la linea.
    marginBottom: 20, // Distanza tra la linea e gli altri elementi.
  },
  secondaryButton: {
    backgroundColor: "#6B7280", // Colore di sfondo del pulsante (grigio).
    paddingVertical: 15, // Padding verticale nel pulsante.
    borderRadius: 8, // Angoli arrotondati del pulsante.
    alignItems: "center", // Allinea il contenuto del pulsante al centro.
  },
  secondaryButtonText: {
    color: "#FFFFFF", // Colore del testo del pulsante (bianco).
    fontSize: 16, // Imposta la dimensione del font.
    fontWeight: "bold", // Imposta il testo in grassetto.
  },
});
