// components/HeaderSection.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Assicurati che esista
import { useNavigation } from "@react-navigation/native";

const HeaderSection = ({ activeTab = "Lista" }) => {
  const navigation = useNavigation();

  return (
    <>
      {/* Logo + Titolo */}
      <View style={styles.headerTop}>
        <Text style={commonStyles.headerTitle}>
          Protezione Civile | Regione Calabria
        </Text>
        <Image
          source={require("../components/Logo.png")}
          style={styles.reportButtonImage}
        />
      </View>

      {/* Titolo + Bottone Segnala */}
      <View style={styles.headerMiddle}>
        <Text style={commonStyles.headerTitle}>ProCiv Calabria</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateReportScreen")}
          style={styles.reportButton}
        >
          <Text style={styles.reportButtonText}>Segnala</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Mappa / Lista */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={commonStyles.tab}
          onPress={() => navigation.navigate("Main", { screen: "Eventi" })}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Mappa" && styles.activeTabText,
            ]}
          >
            Mappa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={commonStyles.tab}
          onPress={() => navigation.navigate("EventsList")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Lista" && styles.activeTabText,
            ]}
          >
            Lista
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reportButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 3,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reportButtonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabText: {
    marginLeft: 8,
    color: "#666",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTabText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default HeaderSection;
