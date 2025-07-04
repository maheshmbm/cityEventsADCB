import { I18nManager, StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    width: "100%",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  topRow: {
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: I18nManager.isRTL ? "flex-end" : "flex-start",
    alignItems: "center",
    width: "100%",
    position: "absolute",
  },
});
export default loginStyles;
