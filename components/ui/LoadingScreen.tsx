import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { TempleColors } from "@/constants/Colors";

export function LoadingScreen({ message }: { message?: string }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: TempleColors.warmWhite,
        gap: 12,
      }}
    >
      <ActivityIndicator size="large" color={TempleColors.saffron} />
      {message ? (
        <Text style={{ color: TempleColors.textSecondary, fontSize: 14 }}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}
