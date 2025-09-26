import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Importa gli stili comuni
import { HeaderSection } from "../components/HeaderSection";

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
    flex: 1, // Occupa tutto lo schermo
    marginTop: 20,
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reportButtonImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default CommunicationScreen;
