import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon = "leaf-outline", title, subtitle }: EmptyStateProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        gap: 12,
        paddingBottom: 60,
      }}
    >
      <Ionicons name={icon} size={48} color={TempleColors.border} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: TempleColors.textSecondary,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            fontSize: 13,
            color: TempleColors.textSecondary,
            textAlign: "center",
            lineHeight: 18,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
