import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import { useAdmin } from "@/lib/admin";
import { TempleColors } from "@/constants/Colors";

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
      <Stack.Screen name="index" options={{ title: "Admin Panel", headerLeft: () => null }} />
      <Stack.Screen name="events/new" options={{ title: "New Event" }} />
      <Stack.Screen name="events/[id]" options={{ title: "Edit Event" }} />
      <Stack.Screen name="news/new" options={{ title: "New Announcement" }} />
      <Stack.Screen name="news/[id]" options={{ title: "Edit Announcement" }} />
      <Stack.Screen name="volunteers/index" options={{ title: "Volunteer Applications" }} />
    </Stack>
  );
}
