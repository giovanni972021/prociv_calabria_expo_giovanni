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

      {/* Prociv Calabria + bottone segnala */}
      <View style={commonstyles.headerMiddle}>
        <Text style={commonstyles.header2}>ProCiv Calabria</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateReportScreen")}
          style={commonstyles.buttonReport}
        >
          <Text style={commonstyles.headerButton}>Segnala</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Mappa / Lista */}
      <View style={commonstyles.containerTab}>
        <TouchableOpacity
          style={commonstyles.tab}
          onPress={() => navigation.navigate("EventsMapScreen")}
        >
          <Text
            style={[
              commonstyles.headerTab,
              activeTab === "Mappa" && commonstyles.headerTabActive,
            ]}
          >
            Mappa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={commonstyles.tab}
          onPress={() => navigation.navigate("EventsListScreen")}
        >
          <Text
            style={[
              commonstyles.headerTab,
              activeTab === "Lista" && commonstyles.headerTabActive,
            ]}
          >
            Lista
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default HeaderSection;
