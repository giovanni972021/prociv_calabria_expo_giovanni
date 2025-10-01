// components/HeaderSection.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { commonstyles } from "../styles/commonstyles"; // Assicurati che esista
import { useNavigation } from "@react-navigation/native";

const HeaderSection = ({ activeTab = "Lista" }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Protezione Civile | Regione Calabria + foto */}
      <View style={commonstyles.headerMiddle}>
        <Text style={commonstyles.header2}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={commonstyles.buttonReportImage}
        />
      </View>
    </>
  );
};
export default HeaderSection;
