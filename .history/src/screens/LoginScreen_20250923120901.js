import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logica di login (verifica credenziali)
    console.log("Nome utente:", username);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accesso</Text>
      <Text style={styles.subHeader}>Entra con le tue credenziali</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Utente"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>
          Hai dimenticato le credenziali?
        </Text>
      </TouchableOpacity>

      <Button title="Continua" onPress={handleLogin} color="#004D99" />

      <TouchableOpacity>
        <Text style={styles.cancel}>Annullaaa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#003366",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#003366",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  forgotPassword: {
    color: "#003366",
    textAlign: "center",
    marginBottom: 30,
  },
  cancel: {
    color: "#003366",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
