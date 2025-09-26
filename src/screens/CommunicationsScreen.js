import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Importa gli stili comuni

const CommunicationScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={styles.reportButtonImage}
        />
      </View>
      <Text style={{ fontSize: 30, color: "red" }}>ciao</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupa tutto lo schermo
  },
  reportButtonImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default CommunicationScreen;
