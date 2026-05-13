import "../global.css";
import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import { AdminProvider } from "@/lib/admin";
import { UnreadProvider } from "@/lib/unread";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TempleColors } from "@/constants/Colors";
import { usePushToken } from "@/hooks/usePushToken";

function AppSetup() {
  usePushToken();
  const router = useRouter();

  useEffect(() => {
    // Deep-link into the calendar when user taps an event notification
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as Record<string, unknown>;
      if (data?.type === "event") {
        router.push("/(tabs)/calendar" as any);
      } else if (data?.type === "news") {
        router.push("/news" as any);
      }
    });
    return () => sub.remove();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
    <AdminProvider>
      <UnreadProvider>
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
        <AppSetup />
      </UnreadProvider>
    </AdminProvider>
    </ErrorBoundary>
  );
}
