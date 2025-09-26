//barre in alto protezione civile regione calabria e logo e Prociv calabria
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", marginTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  reportButtonImage: { width: 50, height: 50, resizeMode: "contain" },
  headerTitle: { color: "white", fontSize: 16 },
});
