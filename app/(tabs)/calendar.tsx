import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { EventCard } from "@/components/calendar/EventCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TempleColors } from "@/constants/Colors";
import { EVENT_TYPE_COLORS } from "@/lib/templeData";
import { useAdmin } from "@/lib/admin";

type MarkedDates = Record<string, { marked: boolean; dotColor: string; selected?: boolean; selectedColor?: string }>;

export default function CalendarScreen() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { isAdmin } = useAdmin();
  const router = useRouter();

  const { data, isLoading } = db.useQuery({
    events: {
      $: { order: { createdAt: "asc" } },
    },
  });

  if (isLoading) return <LoadingScreen message="Loading events..." />;

  const events = data?.events ?? [];

  const markedDates = events.reduce<MarkedDates>((acc, event) => {
    const color = EVENT_TYPE_COLORS[event.type ?? "default"] ?? EVENT_TYPE_COLORS.default;
    acc[event.date] = {
      marked: true,
      dotColor: color,
      ...(event.date === selectedDate ? { selected: true, selectedColor: TempleColors.saffron } : {}),
    };
    return acc;
  }, {});

  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = { marked: false, dotColor: "", selected: true, selectedColor: TempleColors.saffron };
  } else if (selectedDate && markedDates[selectedDate]) {
    markedDates[selectedDate] = { ...markedDates[selectedDate], selected: true, selectedColor: TempleColors.saffron };
  }

  const dayEvents = events.filter((e) => e.date === selectedDate);

  const formatted = (() => {
    try {
      return new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    } catch {
      return selectedDate;
    }
  })();

  return (
    <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: TempleColors.warmWhite,
          calendarBackground: TempleColors.cardBg,
          textSectionTitleColor: TempleColors.textSecondary,
          selectedDayBackgroundColor: TempleColors.saffron,
          selectedDayTextColor: "#fff",
          todayTextColor: TempleColors.saffron,
          dayTextColor: TempleColors.textPrimary,
          textDisabledColor: TempleColors.border,
          dotColor: TempleColors.saffron,
          selectedDotColor: "#fff",
          arrowColor: TempleColors.saffron,
          monthTextColor: TempleColors.deepRed,
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
          textDayFontSize: 14,
          textMonthFontSize: 16,
        }}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: TempleColors.border,
        }}
      />

      <SectionHeader
        title={formatted}
        subtitle={dayEvents.length === 0 ? "No events" : `${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`}
      />

      {dayEvents.length === 0 ? (
        <View style={{ paddingTop: 24, paddingHorizontal: 16 }}>
          <EmptyState
            icon="calendar-outline"
            title="No events on this day"
            subtitle="Check other dates or ask the temple admin for the latest schedule."
          />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          {dayEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              type={event.type}
              description={event.description}
            />
          ))}
        </View>
      )}

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          paddingHorizontal: 16,
          marginTop: 16,
        }}
      >
        {Object.entries(EVENT_TYPE_COLORS).filter(([k]) => k !== "default").map(([type, color]) => (
          <View key={type} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
            <Text style={{ fontSize: 11, color: TempleColors.textSecondary, textTransform: "capitalize" }}>{type}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

    {/* Admin FAB */}

    {isAdmin && (
      <TouchableOpacity
        onPress={() => router.push("/admin/events/new" as any)}
        activeOpacity={0.85}
        style={{
          position: "absolute",
          bottom: 24,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: TempleColors.saffron,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: TempleColors.saffron,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    )}
    </View>
  );
}
