import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";

interface NewsCardProps {
  id: string;
  title: string;
  body: string;
  date: string;
  isNew?: boolean;
}

export function NewsCard({ id, title, body, date, isNew = false }: NewsCardProps) {
  const router = useRouter();
  const preview = body.length > 120 ? body.slice(0, 120).trim() + "…" : body;

  const formatted = (() => {
    try {
      return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return date;
    }
  })();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/news/${id}` as any)}
      activeOpacity={0.75}
      style={{
        backgroundColor: TempleColors.cardBg,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: isNew ? TempleColors.saffron : TempleColors.border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: TempleColors.saffron,
            }}
          />
          <Text style={{ fontSize: 11, color: TempleColors.textSecondary, fontWeight: "500" }}>
            {formatted}
          </Text>
        </View>
        {isNew && (
          <View
            style={{
              backgroundColor: TempleColors.deepRed,
              borderRadius: 6,
              paddingHorizontal: 7,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#fff", letterSpacing: 0.5 }}>
              NEW
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: TempleColors.textPrimary,
          marginBottom: 6,
          lineHeight: 20,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 13, color: TempleColors.textSecondary, lineHeight: 18 }}>
        {preview}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 4 }}>
        <Text style={{ fontSize: 12, color: TempleColors.saffron, fontWeight: "600" }}>
          Read more
        </Text>
        <Ionicons name="chevron-forward" size={12} color={TempleColors.saffron} />
      </View>
    </TouchableOpacity>
  );
}
