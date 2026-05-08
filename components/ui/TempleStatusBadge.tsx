import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TEMPLE_HOURS_RAW } from "@/lib/templeData";
import { TempleColors } from "@/constants/Colors";

function isTempleOpen(date: Date): boolean {
  const day = date.getDay();
  const hours = TEMPLE_HOURS_RAW[day];
  const currentDecimal = date.getHours() + date.getMinutes() / 60;
  return (
    (currentDecimal >= hours.open && currentDecimal < hours.close1) ||
    (currentDecimal >= hours.reopen && currentDecimal < hours.close2)
  );
}

export function TempleStatusBadge() {
  const [open, setOpen] = useState(() => isTempleOpen(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(isTempleOpen(new Date()));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: open ? "#EAF7EE" : "#FDECEA",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
      }}
    >
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 4,
          backgroundColor: open ? TempleColors.openGreen : TempleColors.closedRed,
        }}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: open ? TempleColors.openGreen : TempleColors.closedRed,
        }}
      >
        {open ? "Open Now" : "Closed"}
      </Text>
    </View>
  );
}
