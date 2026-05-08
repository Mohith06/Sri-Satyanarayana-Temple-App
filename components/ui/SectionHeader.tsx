import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { TempleColors } from "@/constants/Colors";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, subtitle, style }: SectionHeaderProps) {
  return (
    <View style={[{ paddingHorizontal: 16, marginTop: 20, marginBottom: 4 }, style]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            width: 4,
            height: 20,
            backgroundColor: TempleColors.saffron,
            borderRadius: 2,
          }}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: TempleColors.textPrimary,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </Text>
      </View>
      {subtitle ? (
        <Text
          style={{
            fontSize: 13,
            color: TempleColors.textSecondary,
            marginTop: 2,
            marginLeft: 12,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
