import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TempleColors } from "@/constants/Colors";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const LINKS: { label: string; icon: IoniconName; route: string; color: string }[] = [
  { label: "News", icon: "newspaper-outline", route: "/news", color: "#E8833A" },
  { label: "Services", icon: "flower-outline", route: "/(tabs)/services", color: "#D4AF37" },
  { label: "Volunteer", icon: "people-outline", route: "/volunteer", color: "#2D7D46" },
  { label: "Donate", icon: "heart-outline", route: "/donate", color: "#C0392B" },
  { label: "Gallery", icon: "images-outline", route: "/gallery", color: "#7B6CF6" },
  { label: "About", icon: "information-circle-outline", route: "/about", color: "#0078D4" },
];

export function QuickLinks() {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
        gap: 8,
      }}
    >
      {LINKS.map((link) => (
        <TouchableOpacity
          key={link.label}
          onPress={() => router.push(link.route as any)}
          style={{
            width: "30%",
            flexGrow: 1,
            alignItems: "center",
            backgroundColor: TempleColors.cardBg,
            borderRadius: 12,
            paddingVertical: 14,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: TempleColors.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
          activeOpacity={0.7}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: link.color + "18",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <Ionicons name={link.icon} size={20} color={link.color} />
          </View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: TempleColors.textPrimary,
              textAlign: "center",
            }}
          >
            {link.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
