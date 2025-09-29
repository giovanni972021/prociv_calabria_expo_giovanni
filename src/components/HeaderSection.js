// components/HeaderSection.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Assicurati che esista
import { useNavigation } from "@react-navigation/native";

const HeaderSection = ({ activeTab = "Lista" }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Protezione Civile | Regione Calabria + foto */}
      <View style={commonStyles.headerTop}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={commonStyles.reportButtonImage}
        />
      </View>

      {/* Prociv Calabria + bottone segnala */}
      <View style={commonStyles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateReportScreen")}
          style={commonStyles.reportButton}
        >
          <Text style={commonStyles.reportButtonText}>Segnala</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Mappa / Lista */}
      <View style={commonStyles.tabContainer}>
        <TouchableOpacity
          style={commonStyles.tab}
          onPress={() => navigation.navigate("EventsMapScreen")}
        >
          <Text
            style={[
              commonStyles.tabText,
              activeTab === "Mappa" && commonStyles.activeTabText,
            ]}
          >
            Mappa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={commonStyles.tab}
          onPress={() => navigation.navigate("EventsListScreen")}
        >
          <Text
            style={[
              commonStyles.tabText,
              activeTab === "Lista" && commonStyles.activeTabText,
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
