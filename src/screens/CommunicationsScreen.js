import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Importa gli stili comuni
import HeaderSection from "../components/HeaderSection2"; // ✅ IMPORTA HEADER

const CommunicationScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={commonStyles.container}>
      <HeaderSection />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunicationScreen;
