import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import {
  SQUARE_PUJA_BOOKING_URL,
  TEMPLE_WHATSAPP_URL,
  TEMPLE_PHONE,
} from "@/constants/TempleInfo";
import { SERVICES_LIST } from "@/lib/templeData";

// Pujas that can be individually booked or enquired about
const BOOKABLE_IDS = [
  "satyanarayana-puja",
  "satyanarayana-abhishekam",
  "hanuman-abhishekam",
  "ayyappan",
];

type ActionButton = {
  label: string;
  sublabel: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  onPress: () => void;
};

export default function PujaScreen() {
  const bookablePujas = SERVICES_LIST.filter((s) => BOOKABLE_IDS.includes(s.id));

  const actions: ActionButton[] = [
    {
      label: "Book Online",
      sublabel: "Via Square — quick & easy",
      icon: "globe-outline",
      color: TempleColors.saffron,
      onPress: () => Linking.openURL(SQUARE_PUJA_BOOKING_URL),
    },
    {
      label: "WhatsApp Us",
      sublabel: "Message the temple directly",
      icon: "logo-whatsapp",
      color: "#25D366",
      onPress: () => Linking.openURL(TEMPLE_WHATSAPP_URL),
    },
    {
      label: "Call Us",
      sublabel: TEMPLE_PHONE,
      icon: "call",
      color: TempleColors.deepRed,
      onPress: () =>
        Linking.openURL(`tel:${TEMPLE_PHONE.replace(/-/g, "")}`),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Book a Puja" }} />
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
          <Ionicons
            name="flower"
            size={38}
            color={TempleColors.gold}
            style={{ marginBottom: 10 }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#fff",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Book a Puja
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.78)",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Schedule a puja for marriages, graduations, new homes, job
            blessings, and more. Prasad can be mailed directly to your home.
          </Text>
        </View>

        {/* Action buttons */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 20,
            gap: 12,
          }}
        >
          {actions.map((action) => (
            <TouchableOpacity
              key={action.label}
              onPress={action.onPress}
              activeOpacity={0.85}
              style={{
                backgroundColor: action.color,
                borderRadius: 14,
                paddingVertical: 16,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                shadowColor: action.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name={action.icon} size={22} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
                >
                  {action.label}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.78)",
                    marginTop: 2,
                  }}
                >
                  {action.sublabel}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="rgba(255,255,255,0.6)"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom request note */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 16,
            padding: 14,
            backgroundColor: TempleColors.saffron + "12",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: TempleColors.saffron + "30",
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={TempleColors.saffron}
            style={{ marginTop: 1 }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              color: TempleColors.textSecondary,
              lineHeight: 18,
            }}
          >
            For custom puja requests or to schedule a home puja, please reach
            out via WhatsApp or call us directly — we are happy to help.
          </Text>
        </View>

        {/* Bookable pujas */}
        <SectionHeader
          title="Available Pujas"
          subtitle="Tap 'Book Online' above to schedule"
        />
        {bookablePujas.map((puja) => (
          <Card key={puja.id} style={{ marginVertical: 5 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: TempleColors.gold + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Ionicons name="flower" size={20} color={TempleColors.gold} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: TempleColors.textPrimary,
                    marginBottom: 2,
                  }}
                >
                  {puja.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    marginBottom: 5,
                  }}
                >
                  <Ionicons
                    name="time-outline"
                    size={11}
                    color={TempleColors.textSecondary}
                  />
                  <Text
                    style={{ fontSize: 12, color: TempleColors.textSecondary }}
                  >
                    {puja.schedule} · {puja.time}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: TempleColors.textSecondary,
                    lineHeight: 18,
                  }}
                >
                  {puja.description}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
