import { I18nManager, StyleSheet } from "react-native";

const eventDetailStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  loadingText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  venueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  venueAddress: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: I18nManager.isRTL ? "right" : "left",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  favoriteIcon: {
    position: "absolute",
    top: 16,
    // Flip icon position for RTL
    right: I18nManager.isRTL ? undefined : 16,
    left: I18nManager.isRTL ? 16 : undefined,
    zIndex: 1,
  },
  selectSeatLink: {
    marginTop: 32,
    alignItems: "center",
  },
  selectSeatLinkText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  dateTime: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
});

export default eventDetailStyles;
