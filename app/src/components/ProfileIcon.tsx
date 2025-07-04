import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ProfileHeaderIcon = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Profile")}
    style={{ marginRight: 16 }}
    accessibilityLabel="Profile"
  >
    <MaterialIcons name="account-circle" size={32} color="#007AFF" />
  </TouchableOpacity>
);
