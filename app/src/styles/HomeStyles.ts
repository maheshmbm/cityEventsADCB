import { I18nManager, StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  errorText: {
    color: "red",
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    marginTop: 16,
  },
  row: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginBottom: 12,
  },
});

export default homeStyles;
