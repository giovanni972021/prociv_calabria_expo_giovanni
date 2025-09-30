import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { commonstyles } from "../styles/commonstyles"; // Importa gli stili comuni
import HeaderSection from "../components/HeaderSection2"; // ✅ IMPORTA HEADER

const CommunicationScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={commonstyles.container}>
      <HeaderSection />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunicationScreen;
