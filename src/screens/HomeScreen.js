import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { commonstyles } from "../styles/commonstyles";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <SafeAreaView style={[commonstyles.container, commonstyles.container2]}>
        <View style={commonstyles.viewHomeScreen}>
          <Text style={commonstyles.headerPiccolo}>Accesso</Text>
          <Text style={commonstyles.headerGrande}>
            Accedi ai servizi di{"\n"}ProCiv Calabria
          </Text>
          <Text style={commonstyles.headerTestoNormale}>
            Seleziona la modalità di accesso che preferisci
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[commonstyles.buttonAccessoBlu, commonstyles.button]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={commonstyles.headerButton}>
              Entra con le tue credenziali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={commonstyles.headerLink}>
              Non hai delle credenziali?
              <Text style={commonstyles.headerLink2}> Registrati.</Text>
            </Text>
          </TouchableOpacity>

          <View style={commonstyles.horizontalLine} />

          <TouchableOpacity
            style={[commonstyles.button2, commonstyles.button]}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={commonstyles.headerButton}>
              Entra in modalità anonima
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
