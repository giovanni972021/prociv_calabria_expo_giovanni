//tutto ok sia estetica sia funzionamento bottoni
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.titleCommon, styles.title2]}>Accesso</Text>
          <Text style={[styles.titleCommon, styles.title]}>
            Accedi ai servizi di{"\n"}ProCiv Calabria
          </Text>
          <Text style={styles.subtitle}>
            Seleziona la modalità di accesso che preferisci
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.primaryButton, styles.button]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>
              Entra con le tue credenziali
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.linkText, styles.titleCommon]}>
              Non hai delle credenziali?
              <Text style={styles.registerLink}> Registrati.</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine}></View>
          <TouchableOpacity
            style={[styles.secondaryButton, styles.button]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.primaryButtonText}>
              Entra in modalità anonima
            </Text>
          </TouchableOpacity>
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
  header: { marginBottom: 30 },
  titleCommon: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  title: {
    fontSize: 34,
    textAlign: "left",
  },
  title2: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 10,
    textAlign: "left",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    marginBottom: 15,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
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
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#6B7280",
  },
});
//tutto ok sia estetica sia funzionamento bottoni
