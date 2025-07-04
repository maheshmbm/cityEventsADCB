import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  infoBox: {
    width: "80%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonBox: {
    width: "100%",
    marginTop: 16,
  },
});

export default profileStyles;
