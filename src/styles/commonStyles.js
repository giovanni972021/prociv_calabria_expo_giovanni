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

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  reportButtonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
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
  titolo1: {
    color: "#1E3A8A",
    fontWeight: "bold",
    fontSize: 34,
    textAlign: "center",
    marginTop: 10,
  },
  reportButtonImage: { width: 50, height: 50, resizeMode: "contain" },
  headerTitle: { color: "white", fontSize: 16 },
});
