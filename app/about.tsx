import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Stack } from "expo-router";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import { MANAGEMENT_TEAM } from "@/lib/templeData";
import { TEMPLE_FOUNDED_YEAR, TEMPLE_PRADISTA_DATE } from "@/constants/TempleInfo";

const HISTORY_MILESTONES = [
  { year: "2012", event: "Land donated by Krishna Bhat" },
  { year: "2013", event: "Temple incorporated in October" },
  { year: "2014", event: "Bhoomi Puja (ground-breaking) on November 2" },
  { year: "2019", event: "Construction began in March" },
  { year: "2020", event: "Initial phase completed" },
  { year: "2023", event: `Pradista (deity consecration) on ${TEMPLE_PRADISTA_DATE}` },
];

const GROUP_LABELS: Record<string, string> = {
  trustees: "Board of Trustees",
  directors: "Board of Directors",
  executive: "Executive Committee",
};

export default function AboutScreen() {
  const groups = ["trustees", "directors", "executive"] as const;

  return (
    <>
    <Stack.Screen options={{ title: "About" }} />
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Mission */}
      <View
        style={{
          backgroundColor: TempleColors.deepRed,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 13, color: TempleColors.gold, fontWeight: "600", marginBottom: 6 }}>
          OUR MISSION
        </Text>
        <Text style={{ fontSize: 16, color: "#fff", lineHeight: 24 }}>
          A Hindu house of worship emphasizing{" "}
          <Text style={{ fontWeight: "700" }}>kindness, openness and respect for all</Text>
          {" "}— focused on worship, prayer, community service, education, and family life.
        </Text>
      </View>

      <SectionHeader title="Our Story" />
      <Card>
        <Text style={{ fontSize: 14, color: TempleColors.textPrimary, lineHeight: 22 }}>
          Sri Satyanarayana Temple of Greater Houston was established to serve the Hindu community of the Greater Houston area. Founded in {TEMPLE_FOUNDED_YEAR} through the vision and generosity of the community, the temple has grown into a vibrant spiritual and cultural center.
        </Text>
        <Text style={{ fontSize: 14, color: TempleColors.textPrimary, lineHeight: 22, marginTop: 10 }}>
          On {TEMPLE_PRADISTA_DATE}, the temple reached a landmark milestone with the Pradista ceremony — the formal consecration of the deities — marking the fulfillment of years of dedicated community effort.
        </Text>
      </Card>

      <SectionHeader title="History" />
      <View style={{ paddingHorizontal: 16 }}>
        {HISTORY_MILESTONES.map((milestone, index) => (
          <View
            key={milestone.year}
            style={{
              flexDirection: "row",
              gap: 12,
              paddingBottom: index < HISTORY_MILESTONES.length - 1 ? 0 : 0,
            }}
          >
            <View style={{ alignItems: "center", width: 48 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: TempleColors.saffron + "20",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: "700", color: TempleColors.saffron }}>
                  {milestone.year}
                </Text>
              </View>
              {index < HISTORY_MILESTONES.length - 1 && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    backgroundColor: TempleColors.border,
                    marginVertical: 4,
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1, paddingTop: 8, paddingBottom: 16 }}>
              <Text style={{ fontSize: 14, color: TempleColors.textPrimary, lineHeight: 20 }}>
                {milestone.event}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {groups.map((group) => {
        const members = MANAGEMENT_TEAM.filter((m) => m.group === group);
        return (
          <View key={group}>
            <SectionHeader title={GROUP_LABELS[group]} />
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {members.map((member, idx) => (
                <View
                  key={member.name}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderTopWidth: idx > 0 ? 1 : 0,
                    borderTopColor: TempleColors.border,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary }}>
                    {member.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>
                    {member.role}
                  </Text>
                </View>
              ))}
            </Card>
          </View>
        );
      })}
    </ScrollView>
    </>
  );
}
