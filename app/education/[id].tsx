import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import { EDUCATION_CATEGORIES, type EducationVerse } from "@/lib/educationData";

type Tab = "Sanskrit" | "Transliteration" | "Meaning";
const TABS: Tab[] = ["Sanskrit", "Transliteration", "Meaning"];

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function EducationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("Sanskrit");

  const category = EDUCATION_CATEGORIES.find((c) => c.id === id);

  if (!category) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: TempleColors.warmWhite,
        }}
      >
        <Text style={{ color: TempleColors.textSecondary }}>Not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: category.title }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View
          style={{
            backgroundColor: TempleColors.deepRed,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "rgba(255,255,255,0.15)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={category.icon as IoniconName}
                size={22}
                color={category.color === TempleColors.deepRed ? "#fff" : category.color}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: "#fff",
                  lineHeight: 24,
                }}
              >
                {category.title}
              </Text>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                {category.subtitle}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 20,
            }}
          >
            {category.overview}
          </Text>
        </View>

        {/* Tab switcher */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: TempleColors.deepRed + "10",
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 10,
            padding: 3,
          }}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 9,
                alignItems: "center",
                borderRadius: 8,
                backgroundColor:
                  activeTab === tab ? TempleColors.deepRed : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color:
                    activeTab === tab ? "#fff" : TempleColors.textSecondary,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Verses */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 14 }}>
          {category.verses.map((verse, index) => (
            <VerseCard
              key={index}
              index={index}
              verse={verse}
              activeTab={activeTab}
              accentColor={category.color}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

function VerseCard({
  index,
  verse,
  activeTab,
  accentColor,
}: {
  index: number;
  verse: EducationVerse;
  activeTab: Tab;
  accentColor: string;
}) {
  const content =
    activeTab === "Sanskrit"
      ? verse.sanskrit
      : activeTab === "Transliteration"
      ? verse.transliteration
      : verse.meaning;

  const isSanskrit = activeTab === "Sanskrit";

  return (
    <View
      style={{
        backgroundColor: TempleColors.cardBg,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: TempleColors.border,
        borderLeftWidth: 4,
        borderLeftColor: accentColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Verse number */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: accentColor + "20",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              color: accentColor,
            }}
          >
            {index + 1}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: TempleColors.textSecondary,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {activeTab === "Sanskrit"
            ? "Sanskrit"
            : activeTab === "Transliteration"
            ? "Transliteration"
            : "English Meaning"}
        </Text>
      </View>

      {/* Content */}
      <Text
        style={{
          fontSize: isSanskrit ? 18 : 15,
          color: TempleColors.textPrimary,
          lineHeight: isSanskrit ? 30 : 24,
          fontWeight: isSanskrit ? "500" : "400",
          letterSpacing: isSanskrit ? 0.3 : 0,
        }}
      >
        {content}
      </Text>

      {/* Show all three below in smaller text when on Meaning tab */}
      {activeTab === "Meaning" && (
        <View
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTopWidth: 1,
            borderTopColor: TempleColors.border,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: TempleColors.textSecondary,
              fontWeight: "600",
              marginBottom: 2,
            }}
          >
            Sanskrit
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: TempleColors.textPrimary,
              lineHeight: 26,
              fontWeight: "500",
            }}
          >
            {verse.sanskrit}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: TempleColors.textSecondary,
              fontStyle: "italic",
              lineHeight: 18,
              marginTop: 4,
            }}
          >
            {verse.transliteration}
          </Text>
        </View>
      )}
    </View>
  );
}
