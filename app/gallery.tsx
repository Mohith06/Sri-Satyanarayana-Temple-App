import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { db } from "@/lib/db";
import { TempleColors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const CELL_SIZE = (width - 48) / 3;

const CATEGORIES = ["All", "Festivals", "Pujas", "Temple", "Community"];

export default function GalleryScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data } = db.useQuery({
    gallery: { $: { order: { createdAt: "desc" } }, image: {} },
  });

  const allItems = (data?.gallery ?? []).filter((item) => item.image?.url);
  const cells = activeCategory === "All"
    ? allItems
    : allItems.filter((item) => item.category === activeCategory);

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
                  paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
                  backgroundColor: active ? TempleColors.saffron : TempleColors.cardBg,
                  borderWidth: 1, borderColor: active ? TempleColors.saffron : TempleColors.border,
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: "600", color: active ? "#fff" : TempleColors.textSecondary }}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid */}
        {cells.length === 0 ? (
          <Text style={{ textAlign: "center", fontSize: 13, color: TempleColors.textSecondary, marginTop: 40, paddingHorizontal: 32 }}>
            {activeCategory === "All"
              ? "Photo gallery coming soon. Check back for photos from our events and ceremonies."
              : `No ${activeCategory} photos yet. Check back soon!`}
          </Text>
        ) : (
          <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 8 }}>
            {cells.map((item) => (
              <Image
                key={item.id}
                source={{ uri: item.image!.url }}
                style={{ width: CELL_SIZE, height: CELL_SIZE, borderRadius: 10 }}
                contentFit="cover"
              />
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}
