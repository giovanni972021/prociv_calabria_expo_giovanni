import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

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
        <View style={styles.header}>
          <Text style={styles.title2}>Accesso</Text>
          <Text style={styles.title}>
            Accedi ai servizi di{"\n"}ProCiv Calabria
          </Text>
          <Text style={styles.subtitle}>
            Seleziona la modalità di accesso che preferisci
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.primaryButtonText}>
                Entra con le tue credenziali
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister} activeOpacity={1}>
              <Text style={styles.linkText}>
                Non hai delle credenziali?
                <Text style={styles.registerLink}>Registrati.</Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleAnonymousAccess}
            >
              <Text style={styles.secondaryButtonText}>
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "left",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginVertical: 20,
    alignSelf: "stretch",
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 10,
    textAlign: "left",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "left",
    marginTop: 7,
    marginBottom: 20,
  },
  registerLink: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    marginVertical: 10,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "#6B7280",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
