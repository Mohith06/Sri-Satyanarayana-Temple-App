import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AdminProvider } from "@/lib/admin";
import { TempleColors } from "@/constants/Colors";

export default function RootLayout() {
  return (
    <AdminProvider>
      <StatusBar style="dark" backgroundColor={TempleColors.warmWhite} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: TempleColors.warmWhite },
          headerTintColor: TempleColors.deepRed,
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AdminProvider>
  );
}
