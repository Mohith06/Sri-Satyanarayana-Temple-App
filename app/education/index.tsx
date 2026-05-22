import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import { EDUCATION_CATEGORIES } from "@/lib/educationData";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function EducationScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const filteredCategories = query
    ? EDUCATION_CATEGORIES.filter(
        (c) => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)
      )
    : EDUCATION_CATEGORIES;
  const showBhajans = !query || "bhajans".includes(query) || "aarti".includes(query) || "chants".includes(query);

  return (
    <>
      <Stack.Screen options={{ title: "Learn & Pray" }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: TempleColors.deepRed,
            padding: 20,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: TempleColors.gold,
              fontWeight: "600",
              marginBottom: 4,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            ॐ नमः शिवाय
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#fff",
              marginBottom: 8,
              lineHeight: 26,
            }}
          >
            Mantras, Prayers & Their Meanings
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 18,
            }}
          >
            Explore sacred texts with Sanskrit, transliteration, and English translations to deepen your practice.
          </Text>
        </View>

        {/* Search bar */}
        <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 2 }}>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: TempleColors.cardBg, borderRadius: 10, borderWidth: 1, borderColor: TempleColors.border, paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}>
            <Ionicons name="search-outline" size={16} color={TempleColors.textSecondary} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search prayers & mantras…"
              placeholderTextColor={TempleColors.border}
              style={{ flex: 1, fontSize: 14, color: TempleColors.textPrimary }}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* Category cards */}
        <View style={{ paddingHorizontal: 16, paddingTop: 12, gap: 12 }}>
          {/* Bhajans card */}
          {showBhajans ? (
            <TouchableOpacity
              onPress={() => router.push("/education/bhajans" as any)}
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
              <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#B0000018", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                <Ionicons name="musical-notes" size={24} color={TempleColors.deepRed} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary, marginBottom: 3 }}>Bhajans & Aarti</Text>
                <Text style={{ fontSize: 12, color: TempleColors.textSecondary, lineHeight: 16 }}>Sacred chants and devotional songs</Text>
                <Text style={{ fontSize: 11, color: TempleColors.deepRed, fontWeight: "600", marginTop: 4 }}>3 tracks · YouTube</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={TempleColors.border} />
            </TouchableOpacity>
          ) : null}

          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => router.push(`/education/${category.id}` as any)}
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
              {/* Icon circle */}
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: category.color + "18",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Ionicons
                  name={category.icon as IoniconName}
                  size={24}
                  color={category.color}
                />
              </View>

              {/* Text */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: TempleColors.textPrimary,
                    marginBottom: 3,
                  }}
                >
                  {category.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: TempleColors.textSecondary,
                    lineHeight: 16,
                  }}
                >
                  {category.subtitle}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: category.color,
                    fontWeight: "600",
                    marginTop: 4,
                  }}
                >
                  {category.verses.length} {category.verses.length === 1 ? "verse" : "verses"}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={16} color={TempleColors.border} />
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
    </>
  );
}
