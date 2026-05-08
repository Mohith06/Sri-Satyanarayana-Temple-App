import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import { TEMPLE_NAME } from "@/constants/TempleInfo";
import { TempleStatusBadge } from "@/components/ui/TempleStatusBadge";
import { useAdmin } from "@/lib/admin";

interface WelcomeBannerProps {
  onAdminPress: () => void;
}

export function WelcomeBanner({ onAdminPress }: WelcomeBannerProps) {
  const { isAdmin } = useAdmin();

  return (
    <View
      style={{
        backgroundColor: TempleColors.deepRed,
        paddingTop: 56,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: TempleColors.gold,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        ॐ नमः शिवाय
      </Text>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "800",
          color: "#FFFFFF",
          lineHeight: 32,
          marginBottom: 12,
        }}
      >
        {TEMPLE_NAME}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.75)",
          marginBottom: 16,
        }}
      >
        of Greater Houston
      </Text>

      {/* Bottom row: status badge left, admin button right */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TempleStatusBadge />

        <TouchableOpacity
          onPress={onAdminPress}
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: isAdmin ? TempleColors.gold + "25" : "rgba(255,255,255,0.12)",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Ionicons
            name={isAdmin ? "settings" : "lock-closed"}
            size={13}
            color={isAdmin ? TempleColors.gold : "rgba(255,255,255,0.6)"}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: isAdmin ? TempleColors.gold : "rgba(255,255,255,0.6)",
            }}
          >
            {isAdmin ? "Admin Panel" : "Admin Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
