import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { id } from "@instantdb/react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { TempleColors } from "@/constants/Colors";
import { EVENT_TYPE_LABELS } from "@/lib/templeData";

const SEGMENTS = ["Events", "News", "Volunteers"] as const;
type Segment = (typeof SEGMENTS)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [segment, setSegment] = useState<Segment>("Events");

  const { data, isLoading } = db.useQuery({
    events: { $: { order: { date: "asc" } } },
    news: { $: { order: { createdAt: "desc" } } },
    volunteers: { $: { order: { submittedAt: "desc" } } },
  });

  if (isLoading) return <LoadingScreen />;

  const deleteEvent = (eid: string) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: () => db.transact(db.tx.events[eid].delete()),
      },
    ]);
  };

  const deleteNews = (nid: string) => {
    Alert.alert("Delete Announcement", "Are you sure you want to delete this announcement?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: () => db.transact(db.tx.news[nid].delete()),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}>
      {/* Segment control */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: TempleColors.deepRed + "10",
          marginHorizontal: 16,
          marginVertical: 12,
          borderRadius: 10,
          padding: 3,
        }}
      >
        {SEGMENTS.map((seg) => (
          <TouchableOpacity
            key={seg}
            onPress={() => setSegment(seg)}
            style={{
              flex: 1,
              paddingVertical: 8,
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: segment === seg ? TempleColors.deepRed : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: segment === seg ? "#fff" : TempleColors.textSecondary,
              }}
            >
              {seg}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {segment === "Events" && (
        <>
          <TouchableOpacity
            onPress={() => router.push("/admin/events/new" as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginHorizontal: 16,
              marginBottom: 8,
              backgroundColor: TempleColors.saffron,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 8,
              alignSelf: "flex-start",
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Add Event</Text>
          </TouchableOpacity>
          <FlatList
            data={data?.events ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
            ListEmptyComponent={<EmptyState icon="calendar-outline" title="No events yet" subtitle="Tap 'Add Event' to create one." />}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: TempleColors.cardBg,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: TempleColors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 2 }}>
                    {item.date}{item.time ? ` · ${item.time}` : ""}
                    {item.type ? ` · ${EVENT_TYPE_LABELS[item.type] ?? item.type}` : ""}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/admin/events/${item.id}` as any)}
                  style={{ padding: 6 }}
                >
                  <Ionicons name="pencil" size={16} color={TempleColors.saffron} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteEvent(item.id)} style={{ padding: 6 }}>
                  <Ionicons name="trash" size={16} color={TempleColors.closedRed} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {segment === "News" && (
        <>
          <TouchableOpacity
            onPress={() => router.push("/admin/news/new" as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginHorizontal: 16,
              marginBottom: 8,
              backgroundColor: TempleColors.saffron,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 8,
              alignSelf: "flex-start",
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Add Announcement</Text>
          </TouchableOpacity>
          <FlatList
            data={data?.news ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
            ListEmptyComponent={<EmptyState icon="newspaper-outline" title="No announcements yet" subtitle="Tap 'Add Announcement' to create one." />}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: TempleColors.cardBg,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: TempleColors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary }} numberOfLines={1}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 2 }}>{item.date}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push(`/admin/news/${item.id}` as any)}
                  style={{ padding: 6 }}
                >
                  <Ionicons name="pencil" size={16} color={TempleColors.saffron} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNews(item.id)} style={{ padding: 6 }}>
                  <Ionicons name="trash" size={16} color={TempleColors.closedRed} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {segment === "Volunteers" && (
        <FlatList
          data={data?.volunteers ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
          ListEmptyComponent={<EmptyState icon="people-outline" title="No applications yet" />}
          renderItem={({ item }) => {
            const interests = (() => {
              try { return JSON.parse(item.interests) as string[]; } catch { return []; }
            })();
            const date = new Date(item.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            return (
              <View
                style={{
                  backgroundColor: TempleColors.cardBg,
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: TempleColors.border,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary }}>{item.name}</Text>
                  <Text style={{ fontSize: 11, color: TempleColors.textSecondary }}>{date}</Text>
                </View>
                <Text style={{ fontSize: 13, color: TempleColors.saffron, marginBottom: 2 }}>{item.email}</Text>
                {item.phone ? <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>{item.phone}</Text> : null}
                {interests.length > 0 && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                    {interests.map((i) => (
                      <View
                        key={i}
                        style={{
                          backgroundColor: TempleColors.saffron + "15",
                          borderRadius: 6,
                          paddingHorizontal: 7,
                          paddingVertical: 3,
                        }}
                      >
                        <Text style={{ fontSize: 11, color: TempleColors.saffron }}>{i}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {item.message ? (
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 6, fontStyle: "italic" }}>
                    "{item.message}"
                  </Text>
                ) : null}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
