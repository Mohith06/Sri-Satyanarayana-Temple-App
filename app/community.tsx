import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import {
  COMMUNITY_PROJECTS,
  STATUS_LABELS,
  STATUS_COLORS,
  type CommunityProject,
} from "@/lib/communityData";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function CommunityScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Community Projects" }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View
          style={{
            backgroundColor: TempleColors.deepRed,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: TempleColors.gold,
              fontWeight: "600",
              marginBottom: 4,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Serving the Community
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#fff",
              marginBottom: 8,
              lineHeight: 26,
            }}
          >
            Beyond the Temple Walls
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 18,
            }}
          >
            Sri Satyanarayana Temple is committed to serving not just our
            devotees, but the entire Greater Houston community through
            charitable programs, cultural events, and outreach initiatives.
          </Text>
        </View>

        {/* Project cards */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 14 }}>
          {COMMUNITY_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>

        {/* Get involved CTA */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            padding: 18,
            backgroundColor: TempleColors.saffron + "12",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: TempleColors.saffron + "30",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Ionicons
            name="people-outline"
            size={28}
            color={TempleColors.saffron}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: TempleColors.textPrimary,
              textAlign: "center",
            }}
          >
            Want to help?
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: TempleColors.textSecondary,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Our community programs run on the dedication of volunteers. Head to
            the Volunteer section in the More menu to sign up.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

function ProjectCard({ project }: { project: CommunityProject }) {
  const statusColor = STATUS_COLORS[project.status];
  const statusLabel = STATUS_LABELS[project.status];

  return (
    <View
      style={{
        backgroundColor: TempleColors.cardBg,
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: TempleColors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Header row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: project.color + "18",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Ionicons
            name={project.icon as IoniconName}
            size={22}
            color={project.color}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: TempleColors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                flex: 1,
                marginRight: 8,
              }}
            >
              {project.category}
            </Text>
            {/* Status badge */}
            <View
              style={{
                backgroundColor: statusColor + "18",
                borderRadius: 6,
                paddingHorizontal: 7,
                paddingVertical: 2,
                borderWidth: 1,
                borderColor: statusColor + "40",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: statusColor,
                  letterSpacing: 0.3,
                }}
              >
                {statusLabel}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: TempleColors.textPrimary,
              lineHeight: 20,
            }}
          >
            {project.title}
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text
        style={{
          fontSize: 13,
          color: TempleColors.textSecondary,
          lineHeight: 20,
          marginBottom: 12,
        }}
      >
        {project.description}
      </Text>

      {/* Impact bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 8,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: TempleColors.border,
        }}
      >
        <Ionicons
          name="sparkles"
          size={14}
          color={project.color}
          style={{ marginTop: 1 }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: TempleColors.textPrimary,
            fontWeight: "600",
            lineHeight: 17,
          }}
        >
          {project.impact}
        </Text>
      </View>
    </View>
  );
}
