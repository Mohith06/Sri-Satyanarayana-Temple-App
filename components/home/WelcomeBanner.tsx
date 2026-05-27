import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: TempleColors.deepRed,
        paddingTop: insets.top + 16,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      {/* Logo + title row */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 64, height: 64, borderRadius: 32 }}
          contentFit="contain"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: TempleColors.gold,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            ॐ नमः शिवाय
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#FFFFFF",
              lineHeight: 28,
            }}
          >
            {TEMPLE_NAME}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              marginTop: 2,
            }}
          >
            of Greater Houston
          </Text>
        </View>
      </View>

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
