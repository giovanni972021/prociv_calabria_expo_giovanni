import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

import { commonStyles } from "../styles/commonStyles"; // Stili comuni

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header superiore */}
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabriaaaaa
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={styles.reportButtonImage}
        />
      </View>

      {/* Barra centrale */}
      <View style={styles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
      </View>

      {/* WebView per il bollettino meteo */}
      <WebView
        source={{
          uri: "https://protezionecivilecalabria.it/bollettino-meteo/bollettino-meteo.php",
        }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    marginTop: 20,
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  reportButtonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  webview: {
    flex: 1, // Occupa lo spazio rimanente
  },
});
