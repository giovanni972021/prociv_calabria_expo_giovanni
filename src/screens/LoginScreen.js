//login screen salvatore
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../services/api";
import { authUtils } from "../utils/auth";

export default function LoginScreen({ navigation }) {
  const [fiscalCode, setFiscalCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!fiscalCode.trim() || !password.trim()) {
      Alert.alert("Errore", "Inserisci codice fiscale e password");
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 Starting login process...");

      // Tentativo di login con API reali
      const response = await authService.login(fiscalCode.trim(), password);

      console.log("🔐 Login response received:", response);

      if (response && response.ok) {
        // Salva i dati di sessione
        await authUtils.saveAuthSession(response);
        await authUtils.saveUserData({
          name: response.name,
          roles: response.roles,
          profiles: response.profiles,
          subProfiles: response.subProfiles,
          registrationEmail: response.registrationEmail,
        });

        Alert.alert("Accesso effettuato", "Benvenuto nell'applicazione!", [
          {
            text: "Continua",
            onPress: () => navigation.replace("Main"),
          },
        ]);
      } else {
        Alert.alert(
          "Errore",
          "Credenziali non valide o risposta API non corretta"
        );
      }
    } catch (error) {
      console.error("🔐 Login error caught:", error);

      // Modalità demo solo per le credenziali di test in caso di errore
      if (fiscalCode.trim() === "CPNGNN97R30H501J" && password === "37421056") {
        Alert.alert(
          "Modalità Demo",
          "Le API non sono disponibili. Vuoi continuare in modalità demo?",
          [
            { text: "Annulla", style: "cancel" },
            {
              text: "Modalità Demo",
              onPress: async () => {
                const mockResponse = {
                  ok: true,
                  name: "Utente Demo",
                  roles: ["citizen"],
                  profiles: ["Profile:Citizen"],
                  subProfiles: ["SubProfile:User"],
                  registrationEmail: "demo@protezionecivilecalabria.it",
                };

                await authUtils.saveAuthSession(mockResponse);
                await authUtils.saveUserData({
                  name: mockResponse.name,
                  roles: mockResponse.roles,
                  profiles: mockResponse.profiles,
                  subProfiles: mockResponse.subProfiles,
                  registrationEmail: mockResponse.registrationEmail,
                });

                navigation.replace("Main");
              },
            },
          ]
        );
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Errore sconosciuto";
        const statusCode = error.response?.status || "N/A";

        Alert.alert(
          "Errore di connessione",
          `Impossibile effettuare il login.\n\nDettagli: ${errorMessage}\nCodice: ${statusCode}\n\nVerifica le credenziali e la connessione internet.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setFiscalCode("CPNGNN97R30H501J");
    setPassword("37421056");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="log-in" size={60} color="#FF6B35" />
            <Text style={styles.title}>Accedi</Text>
            <Text style={styles.subtitle}>
              Inserisci le tue credenziali per accedere
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Codice Fiscale</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="card"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={fiscalCode}
                  onChangeText={setFiscalCode}
                  placeholder="Inserisci il tuo codice fiscale"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={16}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Inserisci la tua password"
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Test Credentials Button */}
            <TouchableOpacity
              style={styles.testButton}
              onPress={fillTestCredentials}
            >
              <Text style={styles.testButtonText}>Usa credenziali di test</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="log-in" size={20} color="#fff" />
                  <Text style={styles.loginButtonText}>Continua</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Non hai un account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Registrati qui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  testButton: {
    backgroundColor: "#e9ecef",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  testButtonText: {
    //commento
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "600",
  },
});
