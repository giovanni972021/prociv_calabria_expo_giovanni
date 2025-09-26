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

      <View style={styles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "left", // Questo assicura che il testo sia centrato
    alignItems: "left", // Centra verticalmente
    backgroundColor: "#0091D6",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  reportButtonImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default CommunicationScreen;
