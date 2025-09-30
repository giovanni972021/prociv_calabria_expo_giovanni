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
} from "react-native";
import { commonstyles } from "../styles/commonstyles";

const LoginScreen = ({ navigation }) => {
  const [fiscalCode, setFiscalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <SafeAreaView style={commonstyles.container3}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={commonstyles.flex1}
      >
        <ScrollView contentContainerStyle={commonstyles.scrollContent}>
          <View>
            <Text style={commonstyles.headerTestoNormale3}>
              Recupera password
            </Text>
          </View>

          <InputField
            label="Nome Utente"
            value={fiscalCode}
            onChange={setFiscalCode}
            maxLength={16}
          />
        </ScrollView>

        <View style={commonstyles.bottomContainer}>
          <Button onPress={() => {}} loading={loading} text="Continua" />
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
      autoCapitalize="none"
      autoCorrect={false}
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

export default LoginScreen;
