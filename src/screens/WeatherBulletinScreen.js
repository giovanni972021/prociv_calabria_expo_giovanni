import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

import { commonstyles } from "../styles/commonstyles"; // Stili comuni
import HeaderSection from "../components/HeaderSection2"; // ✅ IMPORTA HEADER

export default function App() {
  return (
    <View style={commonstyles.container}>
      <HeaderSection />

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
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  webview: {
    flex: 1, // Occupa lo spazio rimanente
  },
});
