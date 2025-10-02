// components/HeaderSection.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { commonstyles } from "../styles/commonstyles"; // Assicurati che esista
import { useNavigation } from "@react-navigation/native";

const HeaderSection = ({ activeTab = "Lista" }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Prociv Calabria + bottone segnala */}
      <View style={commonstyles.headerMiddle}>
        <Text style={commonstyles.header3}>ProCiv Calabria</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateReportScreen")}
          style={commonstyles.buttonReport}
        >
          <Text style={commonstyles.headerButton}>Segnala</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default HeaderSection;
