import React, { useState } from "react";
import {
  Button,
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { authService } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    codiceFiscale: "",
    emailDiRegistrazione: "",
    phoneNumber: "",
    birthDate: null,
    sesso: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const {
      nome,
      cognome,
      codiceFiscale,
      emailDiRegistrazione,
      birthDate,
      sesso,
    } = formData;
    return (
      nome.trim() &&
      cognome.trim() &&
      codiceFiscale.trim() &&
      emailDiRegistrazione.trim() &&
      birthDate &&
      sesso
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      Alert.alert("Errore", "Compila tutti i campi obbligatori");
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        Nome: formData.nome,
        Cognome: formData.cognome,
        codiceFiscale: formData.codiceFiscale,
        email: formData.emailDiRegistrazione,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate.toISOString(),
        sesso: formData.sesso,
      });

      Alert.alert(
        "Registrazione completata",
        "Il tuo account è stato creato con successo. Ora puoi effettuare il login.",
        [{ text: "Vai al Login", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      console.error("Errore registrazione:", error);
      Alert.alert(
        "Errore di registrazione",
        "Impossibile completare la registrazione. Riprova più tardi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!formData.emailDiRegistrazione.trim()) {
      Alert.alert("Errore", "Inserisci un'email valida prima di procedere");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://pc2.dev.schema31.it/api/users/contacts-verify/email/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.emailDiRegistrazione,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'invio dell'OTP");
      }

      setEmailOtpSent(true);
      Alert.alert("Email inviata", "Controlla la tua email per il codice OTP.");
    } catch (error) {
      console.error("Errore OTP:", error);
      Alert.alert(
        "Errore",
        "Non è stato possibile inviare il codice. Riprova."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateFormData("birthDate", selectedDate);
    }
  };

  const renderSubmitButton = (
    label,
    extraStyle = {},
    onPressAction = handleRegister
  ) => (
    <TouchableOpacity
      style={[
        styles.registerButton,
        loading && styles.registerButtonDisabled,
        extraStyle,
      ]}
      onPress={onPressAction}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.registerButtonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Registrati</Text>
            <Text style={styles.subtitle}>
              I campi contrassegnati da * sono obbligatori
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                value={formData.nome}
                onChangeText={(text) => updateFormData("nome", text)}
              />
            </View>

            {/* Cognome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cognome *</Text>
              <TextInput
                style={styles.input}
                value={formData.cognome}
                onChangeText={(text) => updateFormData("cognome", text)}
              />
            </View>

            {/* Codice Fiscale */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Codice Fiscale *</Text>
              <TextInput
                style={styles.input}
                value={formData.codiceFiscale}
                onChangeText={(text) => updateFormData("codiceFiscale", text)}
                maxLength={16}
              />
            </View>

            {/* Data di Nascita */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>Data di Nascita</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.birthDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {formData.birthDate && (
              <Text style={styles.selectedDateText}>
                {formData.birthDate.toLocaleDateString()}
              </Text>
            )}

            {/* Sesso */}
            <View style={styles.sessoContainer}>
              <Text style={styles.label}>Sesso *</Text>
              <View style={styles.sessoOptions}>
                {["Maschio", "Femmina"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioButton}
                    onPress={() => updateFormData("sesso", option)}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        formData.sesso === option && styles.selectedCircle,
                      ]}
                    />
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.horizontalLine} />

            {/* Email */}
            <Text style={styles.title2}>Email di registrazione *</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.emailDiRegistrazione}
                onChangeText={(text) => {
                  updateFormData("emailDiRegistrazione", text);
                  setEmailOtpSent(false); // reset quando cambia email
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Bottoni dinamici per email */}
            {emailOtpSent ? (
              <>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => setEmailOtpSent(false)}
                  disabled={loading}
                >
                  <Text style={styles.registerButtonText}>Modifica email</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleSendEmailOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>
                      Richiedi nuovo codice
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              renderSubmitButton("Verifica email", {}, handleSendEmailOtp)
            )}

            <View style={styles.horizontalLine} />

            {/* Numero di cellulare */}
            <Text style={styles.title2}>Numero di cellulare</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Numero di cellulare</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(text) => updateFormData("phoneNumber", text)}
                keyboardType="phone-pad"
              />
            </View>

            {renderSubmitButton("Verifica numero")}

            {/* Procedi */}
            {renderSubmitButton("Procedi", styles.registerButton2)}

            {/* Annulla */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Annulla</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  title2: {
    fontSize: 20,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    alignItems: "center",
    marginBottom: 40,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDateText: {
    fontSize: 24,
    color: "#1E3A8A",
    textAlign: "center",
  },
  sessoContainer: {
    marginBottom: 10,
  },
  sessoOptions: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: "#28a745",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 15,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  registerButton: {
    backgroundColor: "#c8c8c8",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButton2: {
    backgroundColor: "#c8c8c8",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonDisabled: {
    backgroundColor: "#ccc",
  },
  registerButtonText: {
    color: "#393939",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 30,
  },
});
