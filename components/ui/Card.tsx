import React from "react";
import { View, ViewStyle } from "react-native";
import { TempleColors } from "@/constants/Colors";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: TempleColors.cardBg,
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 16,
          marginVertical: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.07,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: TempleColors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
