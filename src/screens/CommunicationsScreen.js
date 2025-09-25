import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { commonStyles } from "../styles/commonStyles"; // Importa gli stili comuni

const CommunicationScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Text style={{ fontSize: 30, color: "red" }}>ciao</Text>
    </View>
  );
};

export default CommunicationScreen;
