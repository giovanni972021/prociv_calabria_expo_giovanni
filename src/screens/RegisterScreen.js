import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { commonstyles } from "../styles/commonstyles";
import { CONFIG, getBaseUrl } from "../constants/config";

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

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
    } catch (error) {
      console.error(error);
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
        `${getBaseUrl()}${CONFIG.ENDPOINTS.VERIFY_EMAIL}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact: email }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Errore durante invio OTP");
      }

      setOtpSent(true);
      setTimer(600);
      Alert.alert("Email inviata", "Controlla la tua email per il codice OTP");
    } catch (error) {
      console.error("Errore in handleSendOtp:", error);
      Alert.alert("Errore", error.message || "Errore durante invio codice");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6)
      return Alert.alert("Errore", "Inserisci un codice OTP valido");

    setLoading(true);
    try {
      const res = await fetch(
        `${getBaseUrl()}${CONFIG.ENDPOINTS.EMAIL_OTP_CONTROL}`,
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
        Alert.alert("Successo", "La mail è stata verificata correttamente");
        setOtpSent(false);
        setOtp("");
        setTimer(0);
      } else {
        Alert.alert("Errore", "Codice OTP non valido o scaduto");
      }
    } catch (error) {
      console.error(error);
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

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const renderInput = (label, value, key, placeholder, extra = {}) => (
    <View style={commonstyles.a1514inputContainer} key={key}>
      <Text style={commonstyles.a1514label}>{label}</Text>
      <TextInput
        style={[commonstyles.a1514input, commonstyles.commonInput]}
        value={value}
        onChangeText={(text) => update(key, text)}
        placeholder={placeholder}
        {...extra}
      />
    </View>
  );

  const renderBtn = (
    label,
    onPress,
    extraStyle = {},
    disabled = false,
    textStyle = {}
  ) => (
    <TouchableOpacity
      style={[
        commonstyles.a1514registerButton,
        extraStyle,
        (loading || disabled) && commonstyles.a1514registerButtonDisabled,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[commonstyles.a1514registerButtonText, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonstyles.container3}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={commonstyles.a1514keyboardView}
      >
        <ScrollView
          contentContainerStyle={commonstyles.a1514scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          <View style={commonstyles.a1514headerMiddle}>
            <Text style={commonstyles.a1514title}>Registrati</Text>
            <Text style={commonstyles.a1514headerTestoNormale}>
              I campi contrassegnati da * sono obbligatori
            </Text>
          </View>

          <View style={commonstyles.a1514flex1}>
            {renderInput("Nome *", form.nome, "nome", "Nome")}
            {renderInput("Cognome *", form.cognome, "cognome", "Cognome")}
            {renderInput(
              "Codice Fiscale *",
              form.codiceFiscale,
              "codiceFiscale",
              "Codice Fiscale",
              { maxLength: 16 }
            )}

            <TouchableOpacity
              style={commonstyles.a1514dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={commonstyles.a1514dateButtonText}>
                Data di Nascita
              </Text>
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
              <Text style={commonstyles.a1514selectedDateText}>
                {form.birthDate.toLocaleDateString()}
              </Text>
            )}

            <View style={commonstyles.a1514sessoContainer}>
              <Text style={commonstyles.a1514label}>Sesso *</Text>
              <View style={commonstyles.a1514sessoOptions}>
                {["Maschio", "Femmina"].map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={commonstyles.a1514radioButton}
                    onPress={() => update("sesso", opt)}
                  >
                    <View
                      style={[
                        commonstyles.a1514radioCircle,
                        form.sesso === opt && commonstyles.a1514selectedCircle,
                      ]}
                    />
                    <Text style={commonstyles.a1514radioText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={commonstyles.a1514horizontalLine} />
            <Text style={commonstyles.a1514header5}>
              Email di registrazione *
            </Text>

            {otpSent ? (
              <View style={commonstyles.a1514emailReadonlyContainer}>
                <Text style={commonstyles.a1514emailReadonlyText}>
                  {form.emailDiRegistrazione}
                </Text>
                <Text style={commonstyles.commonText3}>
                  La mail è stata verificata correttamente
                </Text>
              </View>
            ) : (
              renderInput(
                "Email di registrazione *",
                form.emailDiRegistrazione,
                "emailDiRegistrazione",
                "email@esempio.com",
                {
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                  onChangeText: (text) => {
                    update("emailDiRegistrazione", text);
                    setOtpSent(false);
                    setOtp("");
                    setTimer(0);
                  },
                }
              )
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
                <Text style={commonstyles.commonText3}>
                  Non hai ricevuto il codice? Attendi
                </Text>
                <Text style={commonstyles.commonText3}>
                  Digita il codice ricevuto via mail e fai tap su
                </Text>
                <Text style={commonstyles.commonText3}>
                  "Verifica codice email"
                </Text>
                <Text style={commonstyles.commonText}>
                  entro {formatTime(timer)}
                </Text>
                {renderInput("Digita codice email", otp, "otp", "******", {
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

            <View style={commonstyles.a1514horizontalLine} />
            <Text style={commonstyles.a1514header5}>Numero di cellulare</Text>
            {renderInput(
              "Numero di cellulare",
              form.phoneNumber,
              "phoneNumber",
              "Numero di cellulare",
              { keyboardType: "phone-pad" }
            )}

            {renderBtn("Verifica numero")}
            {renderBtn(
              "Procedi",
              handleRegister,
              commonstyles.a1514registerButton2
            )}

            <View style={commonstyles.a1514bottomContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={commonstyles.a1514cancelButton}
              >
                <Text style={commonstyles.a151415cancelButtonText}>
                  Annulla
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
