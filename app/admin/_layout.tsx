import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAdmin } from "@/lib/admin";
import { TempleColors } from "@/constants/Colors";

function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, padding: 4 }}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

export default function AdminLayout() {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();

  if (!isAdmin) return <Redirect href="/" />;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: TempleColors.deepRed },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => { logout(); router.replace("/"); }}
            style={{ marginRight: 4 }}
          >
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Sign out</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Admin Panel", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="events/new" options={{ title: "New Event", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="events/[id]" options={{ title: "Edit Event", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="news/new" options={{ title: "New Announcement", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="news/[id]" options={{ title: "Edit Announcement", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="volunteers/index" options={{ title: "Volunteer Applications", headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
