import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Linking } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import { DONATE_CAMPAIGNS } from "@/lib/templeData";
import { SQUARE_DONATE_URL, TEMPLE_TAX_ID } from "@/constants/TempleInfo";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function DonateScreen() {
  return (
    <>
    <Stack.Screen options={{ title: "Support the Temple" }} />
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View
        style={{
          backgroundColor: TempleColors.deepRed,
          padding: 24,
          alignItems: "center",
        }}
      >
        <Ionicons name="heart" size={36} color={TempleColors.gold} style={{ marginBottom: 10 }} />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#fff",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Support the Temple
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          Your generous donation helps maintain the temple, fund religious programs, and serve the community.
        </Text>
      </View>

      {/* Main donate button */}
      <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(SQUARE_DONATE_URL)}
          activeOpacity={0.85}
          style={{
            backgroundColor: TempleColors.saffron,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            shadowColor: TempleColors.saffron,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Ionicons name="card" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Donate Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 11, color: TempleColors.textSecondary, textAlign: "center", marginTop: 6 }}>
          Secure payments powered by Square
        </Text>
      </View>

      <SectionHeader title="Donation Campaigns" />

      {DONATE_CAMPAIGNS.map((campaign) => (
        <Card key={campaign.id} style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: TempleColors.gold + "25",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Ionicons name={campaign.icon as IoniconName} size={20} color={TempleColors.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary, marginBottom: 4 }}>
                {campaign.title}
              </Text>
              <Text style={{ fontSize: 13, color: TempleColors.textSecondary, lineHeight: 18 }}>
                {campaign.description}
              </Text>
            </View>
          </View>
        </Card>
      ))}

      {/* Tax info */}
      <Card style={{ marginTop: 12, backgroundColor: TempleColors.warmWhite }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
          <Ionicons name="receipt-outline" size={18} color={TempleColors.textSecondary} style={{ marginTop: 1 }} />
          <Text style={{ flex: 1, fontSize: 12, color: TempleColors.textSecondary, lineHeight: 18 }}>
            Sri Satyanarayana Temple of Greater Houston is a registered 501(c)(3) non-profit organization. Tax ID: {TEMPLE_TAX_ID}. All donations are tax-deductible to the extent permitted by law.
          </Text>
        </View>
      </Card>
    </ScrollView>
    </>
  );
}
