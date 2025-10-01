import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { commonstyles } from "../styles/commonstyles"; // Importa gli stili comuni
import HeaderSection1 from "../components/HeaderSection1"; // ✅ IMPORTA HEADER
import HeaderSection1b2 from "../components/Headersection1b2"; // ✅ IMPORTA HEADER
const CommunicationScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={commonstyles.container}>
      <HeaderSection1 />
      <HeaderSection1b2 />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommunicationScreen;
