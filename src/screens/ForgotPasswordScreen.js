import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { commonstyles } from "../styles/commonstyles";
import { getBaseUrl, CONFIG } from "../constants/config";

const ForgotPasswordScreen = ({ navigation }) => {
  const [fiscalCode, setFiscalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleContinue = async () => {
    const cf = fiscalCode.toUpperCase();
    if (!/^[A-Z0-9]{16}$/.test(cf)) {
      Alert.alert(
        "Errore",
        "Inserisci un codice fiscale valido (16 caratteri alfanumerici)."
      );
      return;
    }

    setLoading(true);
    setIsPressed(true);

    try {
      const res = await fetch(
        `${getBaseUrl()}${CONFIG.ENDPOINTS.FORGOT_PASSWORD}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Anagraphics: { FiscalCode: cf } }),
        }
      );
      const data = await res.json();

      res.ok
        ? Alert.alert(
            "",
            "Le credenziali sono state inviate all'indirizzo email dell'utente.",
            [{ text: "Ok", onPress: () => setIsPressed(false) }]
          )
        : Alert.alert(
            "Errore",
            data?.message ||
              data?.error ||
              `Errore ${res.status}` ||
              "Errore generico."
          );
    } catch {
      Alert.alert("Errore", "Errore di rete. Controlla la connessione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonstyles.container3}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={commonstyles.flex1}
      >
        <ScrollView contentContainerStyle={commonstyles.scrollContent}>
          <Text style={commonstyles.headerTestoNormale3}>
            Recupera password
          </Text>
          <InputField
            label="Nome Utente"
            value={fiscalCode}
            onChange={setFiscalCode}
            maxLength={16}
          />
        </ScrollView>

        <View style={commonstyles.bottomContainer}>
          <Button onPress={handleContinue} loading={loading} text="Continua" />
          <Button
            onPress={() => navigation.navigate("Login")}
            loading={loading}
            text="Annulla"
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            isCancel
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const InputField = ({ label, value, onChange, ...props }) => (
  <View style={commonstyles.inputContainer2}>
    <Text style={commonstyles.label}>{label}</Text>
    <TextInput
      style={[commonstyles.input, commonstyles.commonInput]}
      value={value}
      onChangeText={onChange}
      autoCapitalize="characters"
      autoCorrect={false}
      placeholder="Nome utente"
      {...props}
    />
  </View>
);

const Button = ({
  onPress,
  loading,
  text,
  isPressed,
  setIsPressed,
  isCancel,
}) => (
  <TouchableOpacity
    style={[
      commonstyles.loginButton,
      loading && commonstyles.loginButtonDisabled,
      isCancel && commonstyles.cancelButton,
      isPressed && commonstyles.cancelButtonPressed,
    ]}
    onPress={() => {
      onPress();
      setIsPressed?.(true);
    }}
    onPressOut={() => setIsPressed?.(false)}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text
        style={[
          commonstyles.loginButtonText,
          isCancel && commonstyles.cancelButtonText,
        ]}
      >
        {text}
      </Text>
    )}
  </TouchableOpacity>
);

export default ForgotPasswordScreen;
