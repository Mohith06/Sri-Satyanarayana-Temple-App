import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import { SERVICES_LIST, type Service } from "@/lib/templeData";
import { SQUARE_PUJA_BOOKING_URL } from "@/constants/TempleInfo";

export default function ServicesScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Book a puja hero */}
      <View
        style={{
          backgroundColor: TempleColors.deepRed,
          padding: 20,
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 13, color: TempleColors.gold, fontWeight: "600", marginBottom: 4 }}>
          BOOK A PUJA
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 8 }}>
          Sri Satyanarayana Puja &amp; More
        </Text>
        <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 14, lineHeight: 18 }}>
          Schedule a puja for marriages, graduations, new jobs, home purchases, and more. Prasad can be mailed to your home.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(SQUARE_PUJA_BOOKING_URL)}
          activeOpacity={0.85}
          style={{
            backgroundColor: TempleColors.saffron,
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>Book Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <SectionHeader title="Regular Services" subtitle="Weekly and daily worship schedule" />

      {SERVICES_LIST.map((service) => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </ScrollView>
  );
}

function ServiceItem({ service }: { service: Service }) {
  return (
    <Card style={{ marginVertical: 5 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: TempleColors.saffron + "18",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Ionicons name="flower" size={20} color={TempleColors.saffron} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary, marginBottom: 2 }}>
            {service.name}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="calendar-outline" size={12} color={TempleColors.textSecondary} />
              <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>{service.schedule}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="time-outline" size={12} color={TempleColors.textSecondary} />
              <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>{service.time}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, color: TempleColors.textSecondary, lineHeight: 18 }}>
            {service.description}
          </Text>
        </View>
      </View>
    </Card>
  );
}
