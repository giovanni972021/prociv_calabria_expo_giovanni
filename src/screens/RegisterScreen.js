import React, { useState, useEffect } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { authService } from "../services/api"; // Assuming you have api services

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    codiceFiscale: "",
    emailDiRegistrazione: "",
    phoneNumber: "",
    birthDate: null,
    sesso: "",
  });

  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const isValid = () => {
    const {
      nome,
      cognome,
      codiceFiscale,
      emailDiRegistrazione,
      birthDate,
      sesso,
    } = form;
    return (
      nome &&
      cognome &&
      codiceFiscale &&
      emailDiRegistrazione &&
      birthDate &&
      sesso
    );
  };

  const handleRegister = async () => {
    if (!isValid())
      return Alert.alert("Errore", "Compila tutti i campi obbligatori");

    setLoading(true);
    try {
      await authService.register({
        Nome: form.nome,
        Cognome: form.cognome,
        codiceFiscale: form.codiceFiscale,
        email: form.emailDiRegistrazione,
        phoneNumber: form.phoneNumber,
        birthDate: form.birthDate.toISOString(),
        sesso: form.sesso,
      });
      Alert.alert("Registrazione completata", "Account creato con successo", [
        { text: "Vai al Login", onPress: () => navigation.navigate("Login") },
      ]);
    } catch {
      Alert.alert("Errore", "Registrazione fallita");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    const email = form.emailDiRegistrazione.trim();
    if (!email) return Alert.alert("Errore", "Inserisci un'email valida");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email))
      return Alert.alert("Errore", "Inserisci un'email corretta");

    setLoading(true);
    try {
      const res = await fetch(
        "https://pc2.dev.schema31.it/api/users/contacts-verify/email/otp/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact: email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Errore dal server:", data); // 👈 Log utile
        throw new Error(data.message || "Errore invio OTP");
      }

      setOtpSent(true);
      setTimer(480); // Start 8 minute timer

      Alert.alert("Email inviata", "Controlla la tua email");
    } catch (error) {
      console.log("Errore durante fetch OTP:", error); // 👈 Logga l'errore completo
      Alert.alert("Errore", error.message || "Invio codice fallito");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6)
      return Alert.alert("Errore", "Inserisci un codice OTP valido");

    setLoading(true);
    try {
      const res = await fetch(
        "https://pc2.dev.schema31.it/api/users/contacts-verify/email/otp/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact: form.emailDiRegistrazione.trim(),
            otp,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.verified) {
        Alert.alert("Successo", "Email verificata");
      } else {
        Alert.alert("Errore", "Codice OTP non valido o scaduto");
      }
    } catch {
      Alert.alert("Errore", "Verifica fallita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!timer) return;
    const interval = setInterval(
      () => setTimer((t) => Math.max(t - 1, 0)),
      1000
    );
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const renderInput = (label, value, key, extra = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(t) => update(key, t)}
        {...extra}
      />
    </View>
  );

  const renderBtn = (label, onPress, extraStyle = {}, disabled = false) => (
    <TouchableOpacity
      style={[
        styles.registerButton,
        extraStyle,
        (loading || disabled) && styles.registerButtonDisabled,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.headerMiddle}>
            <Text style={styles.title}>Registrati</Text>
            <Text style={styles.headerTestoNormale}>
              I campi contrassegnati da * sono obbligatori
            </Text>
          </View>

          <View style={styles.flex1}>
            {renderInput("Nome *", form.nome, "nome")}
            {renderInput("Cognome *", form.cognome, "cognome")}
            {renderInput(
              "Codice Fiscale *",
              form.codiceFiscale,
              "codiceFiscale",
              { maxLength: 16 }
            )}

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateButtonText}>Data di Nascita</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={form.birthDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowPicker(false);
                  if (date) update("birthDate", date);
                }}
              />
            )}
            {form.birthDate && (
              <Text style={styles.selectedDateText}>
                {form.birthDate.toLocaleDateString()}
              </Text>
            )}

            <View style={styles.sessoContainer}>
              <Text style={styles.label}>Sesso *</Text>
              <View style={styles.sessoOptions}>
                {["Maschio", "Femmina"].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.radioButton}
                    onPress={() => update("sesso", opt)}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        form.sesso === opt && styles.selectedCircle,
                      ]}
                    />
                    <Text style={styles.radioText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.horizontalLine} />
            <Text style={styles.header5}>Email di registrazione *</Text>
            {renderInput(
              "Email",
              form.emailDiRegistrazione,
              "emailDiRegistrazione",
              {
                keyboardType: "email-address",
                autoCapitalize: "none",
                onChangeText: (t) => {
                  update("emailDiRegistrazione", t);
                  setOtpSent(false);
                  setOtp("");
                  setTimer(0);
                },
              }
            )}

            {otpSent ? (
              <>
                {renderBtn("Modifica email", () => {
                  setOtpSent(false);
                  setTimer(0);
                  setOtp("");
                })}
                {renderBtn(
                  "Richiedi nuovo codice",
                  handleSendOtp,
                  {},
                  timer > 0
                )}
                <Text>Non hai ricevuto il codice? Attendi</Text>
                <Text>Digita il codice ricevuto via mail e fai tap su</Text>
                <Text>"Verifica codice email"</Text>
                <Text>entro {formatTime(timer)}</Text>
                {renderInput("Digita codice email *", otp, "", {
                  keyboardType: "number-pad",
                  maxLength: 6,
                  onChangeText: setOtp,
                })}
                {renderBtn(
                  "Verifica codice mail",
                  handleVerifyOtp,
                  {},
                  !otp || timer <= 0
                )}
              </>
            ) : (
              renderBtn("Verifica email", handleSendOtp)
            )}

            <View style={styles.horizontalLine} />
            <Text style={styles.header5}>Numero di cellulare</Text>
            {renderInput(
              "Numero di cellulare",
              form.phoneNumber,
              "phoneNumber",
              { keyboardType: "phone-pad" }
            )}
            {renderBtn("Verifica numero")}
            {renderBtn("Procedi", handleRegister, styles.registerButton2)}

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

const baseShadow = {
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  keyboardView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 40 },
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 10 },
  headerTestoNormale: { fontSize: 16, color: "#666", marginTop: 10 },
  header5: {
    fontSize: 20,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  form: { flex: 1 },
  label: { fontSize: 16, fontWeight: "600", color: "#333" },
  inputContainer: { marginBottom: 10 },
  input: {
    height: 50,
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
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
  dateButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  selectedDateText: {
    fontSize: 24,
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 10,
  },
  sessoContainer: { marginBottom: 10 },
  sessoOptions: { flexDirection: "column", justifyContent: "space-between" },
  radioButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    marginRight: 10,
  },
  selectedCircle: { backgroundColor: "#28a745" },
  radioText: { fontSize: 16, color: "#333", paddingVertical: 15 },
  registerButton: {
    backgroundColor: "#c8c8c8",
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
    ...baseShadow,
  },
  registerButton2: { marginTop: 150, marginBottom: 30 },
  registerButtonDisabled: { backgroundColor: "#ccc" },
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
  cancelButton: { alignItems: "center", marginBottom: 14 },
  cancelButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
  bottomContainer: { justifyContent: "flex-end", paddingHorizontal: 20 },
});
