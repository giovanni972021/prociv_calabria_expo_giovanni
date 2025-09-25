import React from "react";
import { View, Text, Image } from "react-native"; // Aggiungi le importazioni mancanti
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator"; // Assicurati che il percorso sia corretto

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#FF6B35" />

      {/* Navigator dell'app */}
      <AppNavigator />
    </>
  );
}
