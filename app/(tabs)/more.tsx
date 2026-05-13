import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const SECTIONS: {
  title: string;
  items: { label: string; subtitle: string; icon: IoniconName; route: string; color: string }[];
}[] = [
  {
    title: "Temple",
    items: [
      { label: "Announcements", subtitle: "News and updates from the temple", icon: "newspaper-outline", route: "/news", color: TempleColors.saffron },
      { label: "Gallery", subtitle: "Photos from events and pujas", icon: "images-outline", route: "/gallery", color: "#7B6CF6" },
      { label: "Learn & Pray", subtitle: "Mantras, prayers, and their meanings", icon: "book-outline", route: "/education", color: TempleColors.deepRed },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Book a Puja", subtitle: "Schedule a puja or contact the pandit", icon: "flower-outline", route: "/puja", color: TempleColors.saffron },
      { label: "Volunteer", subtitle: "Sign up to help the temple", icon: "people-outline", route: "/volunteer", color: TempleColors.openGreen },
      { label: "Donate", subtitle: "Support our mission and campaigns", icon: "heart-outline", route: "/donate", color: TempleColors.closedRed },
    ],
  },
  {
    title: "About",
    items: [
      { label: "About the Temple", subtitle: "History, mission, and leadership", icon: "information-circle-outline", route: "/about", color: "#0078D4" },
      { label: "Community Projects", subtitle: "Outreach, charity, and cultural programs", icon: "globe-outline", route: "/community", color: "#2D7D46" },
      { label: "Contact Us", subtitle: "Address, phone, and directions", icon: "call-outline", route: "/contact", color: TempleColors.textSecondary },
    ],
  },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {SECTIONS.map((section) => (
        <View key={section.title} style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: TempleColors.textSecondary,
              letterSpacing: 1,
              textTransform: "uppercase",
              paddingHorizontal: 20,
              marginBottom: 6,
            }}
          >
            {section.title}
          </Text>
          <View
            style={{
              backgroundColor: TempleColors.cardBg,
              marginHorizontal: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: TempleColors.border,
              overflow: "hidden",
            }}
          >
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderTopWidth: idx > 0 ? 1 : 0,
                  borderTopColor: TempleColors.border,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: item.color + "18",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: TempleColors.textPrimary }}>
                    {item.label}
                  </Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 1 }}>
                    {item.subtitle}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={TempleColors.border} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
