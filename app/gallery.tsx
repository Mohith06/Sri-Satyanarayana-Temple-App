import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { TempleColors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const CELL_SIZE = (width - 48) / 3;

const CATEGORIES = ["All", "Festivals", "Pujas", "Temple", "Community"];

const PLACEHOLDER_COLORS: Record<string, string[]> = {
  Festivals: ["#E8833A", "#D4AF37", "#C0392B", "#8B1A1A", "#E8833A", "#D4AF37"],
  Pujas: ["#D4AF37", "#E8833A", "#8B1A1A", "#D4AF37", "#E8833A", "#C0392B"],
  Temple: ["#8B1A1A", "#E8833A", "#D4AF37", "#C0392B", "#8B1A1A", "#E8833A"],
  Community: ["#2D7D46", "#0078D4", "#7B6CF6", "#2D7D46", "#0078D4", "#7B6CF6"],
};

export default function GalleryScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = activeCategory === "All"
    ? Object.keys(PLACEHOLDER_COLORS)
    : [activeCategory];

  const cells = categories.flatMap((cat) =>
    (PLACEHOLDER_COLORS[cat] ?? []).map((color, i) => ({ cat, color, i }))
  );

  return (
    <>
    <Stack.Screen options={{ title: "Gallery" }} />
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
      >
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 20,
                backgroundColor: active ? TempleColors.saffron : TempleColors.cardBg,
                borderWidth: 1,
                borderColor: active ? TempleColors.saffron : TempleColors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: active ? "#fff" : TempleColors.textSecondary,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        {cells.map(({ cat, color, i }) => (
          <View
            key={`${cat}-${i}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRadius: 10,
              backgroundColor: color + "30",
              borderWidth: 1,
              borderColor: color + "40",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <View style={{ width: "60%", height: "60%", borderRadius: 8, backgroundColor: color + "60" }} />
          </View>
        ))}
      </View>

      {/* Coming soon note */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          color: TempleColors.textSecondary,
          marginTop: 16,
          paddingHorizontal: 32,
        }}
      >
        Photo gallery coming soon. Check back for photos from our events and ceremonies.
      </Text>
    </ScrollView>
    </>
  );
}
