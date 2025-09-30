import { StyleSheet } from "react-native";
const baseContainer = { flex: 1, backgroundColor: "#f8f9fa" };

const commonButtonStyles = {
  borderRadius: 12,
  paddingVertical: 15,
  alignItems: "center",
  justifyContent: "center",
};

export const commonstyles = StyleSheet.create({
  button: {
    ...commonButtonStyles,
  },
  button2: {
    backgroundColor: "#6B7280",
  },
  loginButton: {
    ...commonButtonStyles,
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
  },
  cancelButtonPressed: {
    backgroundColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },

  loginButtonText: {
    color: "#fff",
    paddingBottom: 10,
    fontSize: 16,
  },

  buttonAccessoBlu: {
    backgroundColor: "#2563EB",
    marginBottom: 15,
  },
  buttonReport: {
    backgroundColor: "#FF6B35",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "white",
    borderWidth: 3,
  },
  buttonReportImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  container: { ...baseContainer, marginTop: 20 },
  container2: {
    paddingHorizontal: 20,
    paddingTop: 9,
  },
  container3: {
    ...baseContainer,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },

  containerTab: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  forgotContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  commonText: {
    fontSize: 16,
    color: "#333",
  },
  commonText3: {
    fontSize: 17,
    color: "#333",
    textAlign: "center",
  },
  commonText2: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },

  inputContainer: {
    marginBottom: 20,
  },
  inputContainer2: { marginBottom: 20, marginTop: 20 },

  flex1: {
    flex: 1,
  },
  header2: { color: "white", fontSize: 16 },
  header5: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  headerButton: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  header99: {
    marginBottom: 40,
    paddingTop: 10,
  },

  headerGrande: {
    color: "#1E3A8A",
    fontWeight: "bold",
    fontSize: 34,
    textAlign: "left",
  },
  headerLink: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "left",
    marginTop: 7,
    marginBottom: 20,
  },
  headerLink2: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  headerMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0091D6",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerPiccolo: {
    color: "#1E3A8A",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  headerTab: {
    marginLeft: 8,
    color: "#666",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTabActive: {
    color: "blue",
    fontWeight: "bold",
  },
  headerTestoNormale: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 10,
    textAlign: "left",
  },
  headerTestoNormale2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 20,
  },
  headerTestoNormale3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
  },

  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    marginVertical: 10,
    marginBottom: 20,
  },
  commonInput: {
    fontSize: 20,
    color: "#333",
    borderBottomColor: "#333",
    fontWeight: "bold",
  },

  input: {
    height: 50,
    borderBottomWidth: 2,
    paddingBottom: 10,
    paddingHorizontal: 0,
  },
  label: {
    fontWeight: "600",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 0,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    height: 55,
  },
  eyeIconContainer: {
    paddingBottom: 4,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  viewHomeScreen: { marginBottom: 30 },
  a1514keyboardView: { flex: 1 },
  a1514scrollContent: { paddingHorizontal: 20, paddingVertical: 10 },
  a1514header: { marginBottom: 30 },
  a1514title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  a1514headerTestoNormale: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 50,
  },
  a1514header5: {
    fontSize: 20,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  a1514form: { flex: 1 },
  a1514label: { fontSize: 16, fontWeight: "600", color: "#333" },
  a1514inputContainer: { marginBottom: 10 },
  a1514input: {
    height: 50,
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    marginBottom: 20,
  },
  a1514dateButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    ...commonButtonStyles,
    marginBottom: 20,
    alignSelf: "center",
  },
  a1514dateButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  a1514selectedDateText: {
    fontSize: 24,
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 10,
  },
  a1514sessoContainer: { marginBottom: 10 },
  a1514sessoOptions: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  a1514radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  a1514radioCircle: {
    height: 20,
    width: 20,
    ...commonButtonStyles,
    borderWidth: 2,
    borderColor: "#333",
    marginRight: 10,
  },
  a1514selectedCircle: { backgroundColor: "#28a745" },
  a1514radioText: { fontSize: 16, color: "#333", paddingVertical: 15 },
  a1514registerButton: {
    backgroundColor: "#c8c8c8",
    paddingVertical: 15,
    ...commonButtonStyles,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
  a1514registerButton2: { marginTop: 150, marginBottom: 30 },
  a1514registerButtonDisabled: { backgroundColor: "#ccc" },
  a1514registerButtonText: {
    color: "#393939",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  a1514horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 30,
  },
  a1514emailReadonlyContainer: {
    marginTop: -10,
    marginBottom: 10,
  },

  a1514emailReadonlyText: {
    fontSize: 20,
    color: "blue",
    fontWeight: "500",
    textAlign: "center",
  },
  a1514cancelButton: { alignItems: "center", marginBottom: 14 },
  a1514cancelButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
  a1514bottomContainer: { justifyContent: "flex-end", paddingHorizontal: 20 },
});
