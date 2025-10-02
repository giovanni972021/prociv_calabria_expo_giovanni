import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { commonstyles } from "../styles/commonstyles"; // Assicurati che esista
import { useNavigation } from "@react-navigation/native";

const HeaderSection = ({ activeTab = "Lista" }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={commonstyles.headerMiddle}>
        <Text style={commonstyles.header2}>ProCiv Calabria</Text>
      </View>
    </>
  );
};
export default HeaderSection;
