import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Linking } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";

const BHAJANS = [
  {
    id: "1",
    title: "Om Namo Narayanaya Chanting",
    description: "Sacred chanting of the Ashtakshara mantra",
    duration: "~60 min",
    url: "https://www.youtube.com/watch?v=lMPKHGCNR9Q&t=298s",
  },
  {
    id: "2",
    title: "Satyanarayan Aarti",
    description: "Devotional aarti for Lord Satyanarayana",
    duration: "~5 min",
    url: "https://www.youtube.com/watch?v=EG359dy7YIk",
  },
  {
    id: "3",
    title: "Hanuman Chalisa",
    description: "40 verses of devotion to Lord Hanuman",
    duration: "~8 min",
    url: "https://www.youtube.com/watch?v=v5rcvMTp6_4",
  },
];

export default function BhajansScreen() {
  const handlePlay = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Bhajans & Aarti" }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ backgroundColor: TempleColors.deepRed, padding: 20, marginBottom: 4 }}>
          <Text style={{ fontSize: 13, color: TempleColors.gold, fontWeight: "600", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>
            ॐ नमो नारायणाय
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#fff", marginBottom: 8, lineHeight: 26 }}>
            Bhajans & Aarti
          </Text>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 18 }}>
            Listen to sacred chants and devotional songs. Tap any track to open in YouTube.
          </Text>
        </View>

        {/* Track list */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 12 }}>
          {BHAJANS.map((bhajan, index) => (
            <TouchableOpacity
              key={bhajan.id}
              onPress={() => handlePlay(bhajan.url)}
              activeOpacity={0.8}
              style={{
                backgroundColor: TempleColors.cardBg,
                borderRadius: 14,
                padding: 16,
                borderWidth: 1,
                borderColor: TempleColors.border,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              {/* Track number / icon */}
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: TempleColors.deepRed + "15",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "800", color: TempleColors.deepRed }}>
                  {index + 1}
                </Text>
              </View>

              {/* Text */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary, marginBottom: 3 }}>
                  {bhajan.title}
                </Text>
                <Text style={{ fontSize: 12, color: TempleColors.textSecondary, lineHeight: 16 }}>
                  {bhajan.description}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
                  <Ionicons name="logo-youtube" size={13} color="#FF0000" />
                  <Text style={{ fontSize: 11, color: TempleColors.textSecondary }}>{bhajan.duration}</Text>
                </View>
              </View>

              {/* Play button */}
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: TempleColors.deepRed,
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Ionicons name="play" size={16} color="#fff" style={{ marginLeft: 2 }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* YouTube note */}
        <View style={{ marginHorizontal: 16, marginTop: 20, padding: 12, backgroundColor: TempleColors.saffron + "12", borderRadius: 10, borderWidth: 1, borderColor: TempleColors.saffron + "30", flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="logo-youtube" size={18} color="#FF0000" />
          <Text style={{ fontSize: 12, color: TempleColors.textSecondary, flex: 1, lineHeight: 17 }}>
            Tracks open in YouTube. You can continue listening with your screen off using YouTube Premium.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
