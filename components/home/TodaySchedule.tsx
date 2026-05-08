import React from "react";
import { View, Text } from "react-native";
import { TEMPLE_HOURS } from "@/lib/templeData";
import { TempleColors } from "@/constants/Colors";

export function TodaySchedule() {
  const today = new Date().getDay();
  const hours = TEMPLE_HOURS[today];

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "600", color: TempleColors.textSecondary }}>
          Today — {hours.label}
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <SessionRow
          label="Morning Session"
          time={`${hours.open} – ${hours.close1}`}
        />
        <SessionRow
          label="Evening Session"
          time={`${hours.reopen} – ${hours.close2}`}
        />
      </View>
    </View>
  );
}

function SessionRow({ label, time }: { label: string; time: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: TempleColors.warmWhite,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: TempleColors.saffron,
          }}
        />
        <Text style={{ fontSize: 13, color: TempleColors.textPrimary, fontWeight: "500" }}>
          {label}
        </Text>
      </View>
      <Text style={{ fontSize: 13, color: TempleColors.textSecondary, fontWeight: "500" }}>
        {time}
      </Text>
    </View>
  );
}
