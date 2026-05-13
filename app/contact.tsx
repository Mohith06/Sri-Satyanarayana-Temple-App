import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import {
  TEMPLE_ADDRESS,
  TEMPLE_PHONE,
  TEMPLE_EMAIL,
  TEMPLE_FACEBOOK,
  GOOGLE_MAPS_URL,
  APPLE_MAPS_URL,
  TEMPLE_PRIVACY_POLICY_URL,
} from "@/constants/TempleInfo";
import { TEMPLE_HOURS } from "@/lib/templeData";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

function ContactRow({
  icon,
  label,
  value,
  onPress,
  color = TempleColors.saffron,
}: {
  icon: IoniconName;
  label: string;
  value: string;
  onPress?: () => void;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: color + "18",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 2 }}>
          {label}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: onPress ? TempleColors.saffron : TempleColors.textPrimary,
            fontWeight: onPress ? "600" : "400",
            lineHeight: 20,
          }}
        >
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  const openMaps = () => {
    if (Platform.OS === "ios") {
      Linking.openURL(APPLE_MAPS_URL);
    } else {
      Linking.openURL(GOOGLE_MAPS_URL);
    }
  };

  const days = [0, 1, 2, 3, 4, 5, 6];

  return (
    <>
    <Stack.Screen options={{ title: "Contact" }} />
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader title="Contact Information" />
      <Card>
        <ContactRow
          icon="location"
          label="ADDRESS"
          value={TEMPLE_ADDRESS}
          onPress={openMaps}
        />
        <ContactRow
          icon="call"
          label="PHONE"
          value={TEMPLE_PHONE}
          onPress={() => Linking.openURL(`tel:${TEMPLE_PHONE.replace(/-/g, "")}`)}
        />
        <ContactRow
          icon="mail"
          label="EMAIL"
          value={TEMPLE_EMAIL}
          onPress={() => Linking.openURL(`mailto:${TEMPLE_EMAIL}`)}
        />
        <ContactRow
          icon="logo-facebook"
          label="FACEBOOK"
          value="facebook.com/sstgh.org"
          onPress={() => Linking.openURL(TEMPLE_FACEBOOK)}
          color="#1877F2"
        />
      </Card>

      <SectionHeader title="Temple Hours" />
      <Card style={{ padding: 0, overflow: "hidden" }}>
        {days.map((day, idx) => {
          const h = TEMPLE_HOURS[day];
          const isToday = new Date().getDay() === day;
          return (
            <View
              key={day}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 11,
                borderTopWidth: idx > 0 ? 1 : 0,
                borderTopColor: TempleColors.border,
                backgroundColor: isToday ? TempleColors.saffron + "10" : "transparent",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                {isToday && (
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: TempleColors.saffron }} />
                )}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isToday ? "700" : "500",
                    color: isToday ? TempleColors.saffron : TempleColors.textPrimary,
                    marginLeft: isToday ? 0 : 14,
                  }}
                >
                  {h.label}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>
                {h.open}–{h.close1} · {h.reopen}–{h.close2}
              </Text>
            </View>
          );
        })}
      </Card>

      {/* Get Directions button */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <TouchableOpacity
          onPress={openMaps}
          activeOpacity={0.85}
          style={{
            backgroundColor: TempleColors.deepRed,
            borderRadius: 12,
            paddingVertical: 14,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Get Directions</Text>
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <SectionHeader title="Legal" />
      <Card>
        <ContactRow
          icon="document-text-outline"
          label="PRIVACY POLICY"
          value="View our privacy policy"
          onPress={() => Linking.openURL(TEMPLE_PRIVACY_POLICY_URL)}
          color={TempleColors.textSecondary}
        />
      </Card>
    </ScrollView>
    </>
  );
}
