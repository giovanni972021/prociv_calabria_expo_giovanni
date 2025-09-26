import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [fiscalCode, setFiscalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>Recupera password</Text>
          </View>
          <View style={styles.form}>
            <InputField
              label="Nome Utente"
              value={fiscalCode}
              onChange={setFiscalCode}
              maxLength={16}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Button onPress={() => {}} loading={loading} text="Continua" />
        </View>

        <View style={styles.bottomContainer}>
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

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  maxLength,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, styles.commonInput]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      maxLength={maxLength}
      autoCorrect={false}
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
      styles.loginButton,
      loading && styles.loginButtonDisabled,
      isCancel && styles.cancelButton,
      isPressed && styles.cancelButtonPressed,
    ]}
    onPress={() => {
      onPress();
      setIsPressed && setIsPressed(true);
    }}
    onPressOut={() => setIsPressed && setIsPressed(false)}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text
        style={[styles.loginButtonText, isCancel && styles.cancelButtonText]}
      >
        {text}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  commonInput: { fontSize: 16, color: "#333", borderBottomColor: "#333" },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 10 },
  header: { marginBottom: 40, paddingTop: 10 },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 20,
  },
  form: { flex: 1 },
  inputContainer: { marginBottom: 20, marginTop: -20 },
  label: { fontWeight: "600" },
  input: {
    height: 50,
    borderBottomWidth: 2,
    paddingBottom: 10,
    paddingHorizontal: 0,
  },
  loginButton: {
    backgroundColor: "#1E3A8A",
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
  loginButtonDisabled: { backgroundColor: "#ccc" },
  loginButtonText: { color: "#fff", paddingBottom: 10, fontSize: 16 },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
  },
  cancelButtonPressed: { backgroundColor: "#e0e0e0" },
  cancelButtonText: { color: "#1E3A8A", fontWeight: "bold" },
  bottomContainer: { justifyContent: "flex-end", paddingHorizontal: 20 },
});

export default LoginScreen;
