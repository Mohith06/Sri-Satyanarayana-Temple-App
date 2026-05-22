import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS } from "@/lib/templeData";

interface EventCardProps {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  type?: string;
  description?: string;
}

export function EventCard({ title, date, time, location, type, description }: EventCardProps) {
  const handleShare = () => {
    const parts = [title];
    if (date) {
      try {
        parts.push(new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
      } catch { parts.push(date); }
    }
    if (time) parts.push(`Time: ${time}`);
    if (location) parts.push(`Location: ${location}`);
    parts.push("Sri Satyanarayana Temple of Greater Houston");
    Share.share({ message: parts.join("\n") });
  };
  const typeColor = EVENT_TYPE_COLORS[type ?? "default"] ?? EVENT_TYPE_COLORS.default;
  const typeLabel = EVENT_TYPE_LABELS[type ?? ""] ?? type ?? "";

  return (
    <View
      style={{
        backgroundColor: TempleColors.cardBg,
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: typeColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: TempleColors.border,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: TempleColors.textPrimary,
            flex: 1,
            marginRight: 8,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {typeLabel ? (
            <View
              style={{
                backgroundColor: typeColor + "20",
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "600", color: typeColor }}>
                {typeLabel}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity onPress={handleShare} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="share-outline" size={16} color={TempleColors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {time ? (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6, gap: 4 }}>
          <Ionicons name="time-outline" size={13} color={TempleColors.textSecondary} />
          <Text style={{ fontSize: 13, color: TempleColors.textSecondary }}>{time}</Text>
        </View>
      ) : null}

      {location ? (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 }}>
          <Ionicons name="location-outline" size={13} color={TempleColors.textSecondary} />
          <Text style={{ fontSize: 13, color: TempleColors.textSecondary }}>{location}</Text>
        </View>
      ) : null}

      {description ? (
        <Text
          style={{
            fontSize: 13,
            color: TempleColors.textSecondary,
            marginTop: 8,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}
