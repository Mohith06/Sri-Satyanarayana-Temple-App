import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { db } from "@/lib/db";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { TempleColors } from "@/constants/Colors";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = db.useQuery({
    news: { $: { where: { id } } },
  });

  if (isLoading) return <LoadingScreen />;

  const item = data?.news?.[0];

  if (!item) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: TempleColors.textSecondary }}>Announcement not found.</Text>
        </View>
      </>
    );
  }

  const formatted = (() => {
    try {
      return new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      });
    } catch {
      return item.date;
    }
  })();

  return (
    <>
      <Stack.Screen options={{ title: item.title.length > 30 ? item.title.slice(0, 30) + "…" : item.title }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: TempleColors.saffron }} />
          <Text style={{ fontSize: 12, color: TempleColors.textSecondary, fontWeight: "500" }}>
            {formatted}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 22, fontWeight: "800", color: TempleColors.textPrimary,
            lineHeight: 30, marginBottom: 16,
          }}
        >
          {item.title}
        </Text>
        <View style={{ height: 2, backgroundColor: TempleColors.border, marginBottom: 16 }} />
        <Text style={{ fontSize: 15, color: TempleColors.textPrimary, lineHeight: 24 }}>
          {item.body}
        </Text>
      </ScrollView>
    </>
  );
}
