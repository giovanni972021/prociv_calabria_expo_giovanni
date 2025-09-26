import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { commonStyles } from "../styles/commonStyles"; // Importa gli stili comuni

const commonHeaderTitleStyle = {
  color: "white",
};

export default function App() {
  const [loading, setLoading] = useState(false);

  const formattedDate = new Date().toLocaleDateString("it-IT");

  const handleDownloadPress = () => {
    setLoading(true);
  };

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

      <View style={styles.header}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
      </View>

      <View style={styles.meteoContainer}>
        <Text style={styles.meteoTitle}>Bollettino Meteo</Text>
        <TouchableOpacity onPress={handleDownloadPress}>
          <Text style={styles.downloadButtonText}>
            Scarica il bollettino di criticità del {formattedDate}
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", marginTop: 20 },

  reportButtonImage: { width: 50, height: 50, resizeMode: "contain" },
  headerTitle: { ...commonHeaderTitleStyle, fontSize: 16 },
  meteoContainer: { padding: 20, borderRadius: 10, marginTop: -15 },
  meteoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
    marginBottom: 10,
    textAlign: "center",
  },
  downloadButtonText: {
    color: "blue",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  loader: {
    marginTop: 20,
  },
});
