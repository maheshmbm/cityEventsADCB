import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, I18nManager, Text, View } from "react-native";
import { useProfile } from "../hooks/useProfile";
import profileStyles from "../styles/profileStyles";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const {
    userProfile,
    isBiometricEnabled,
    handleToggleBiometric,
    handleLogout,
  } = useProfile();

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.avatarContainer}>
        <MaterialIcons
          name="account-circle"
          size={80}
          color="#007AFF"
          style={profileStyles.avatar}
        />
      </View>
      <Text
        style={[
          profileStyles.title,
          {
            textAlign: "center",
            writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
          },
        ]}
      >
        {t("profile.title")}
      </Text>
      {userProfile ? (
        <View style={profileStyles.infoBox}>
          <Text
            style={[
              profileStyles.label,
              { textAlign: I18nManager.isRTL ? "right" : "left" },
            ]}
          >
            {t("profile.name")}
          </Text>
          <Text
            style={[
              profileStyles.value,
              { textAlign: I18nManager.isRTL ? "right" : "left" },
            ]}
          >
            {userProfile.displayName || t("profile.na")}
          </Text>
          <Text
            style={[
              profileStyles.label,
              { textAlign: I18nManager.isRTL ? "right" : "left" },
            ]}
          >
            {t("profile.email")}
          </Text>
          <Text
            style={[
              profileStyles.value,
              { textAlign: I18nManager.isRTL ? "right" : "left" },
            ]}
          >
            {userProfile.email}
          </Text>
          <View style={profileStyles.buttonBox}>
            <Button
              title={
                isBiometricEnabled
                  ? t("profile.disableBiometric")
                  : t("profile.enableBiometric")
              }
              onPress={handleToggleBiometric}
            />
          </View>
          <View style={profileStyles.buttonBox}>
            <Button
              title={t("profile.logout")}
              color="#e74c3c"
              onPress={handleLogout}
            />
          </View>
        </View>
      ) : (
        <Text>{t("profile.loading")}</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
