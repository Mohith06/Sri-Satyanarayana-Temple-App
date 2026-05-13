import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useRouter, Stack, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { NewsCard } from "@/components/news/NewsCard";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { TempleColors } from "@/constants/Colors";
import { useAdmin } from "@/lib/admin";
import { useUnread } from "@/lib/unread";

export default function NewsScreen() {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const { lastSeenNews, markNewsAsRead } = useUnread();

  // Clear the badge as soon as the user lands on this screen
  useFocusEffect(
    useCallback(() => {
      markNewsAsRead();
    }, [])
  );

  const { data, isLoading } = db.useQuery({
    news: {
      $: { order: { createdAt: "desc" } },
    },
  });

  if (isLoading) return <LoadingScreen message="Loading announcements..." />;

  const items = data?.news ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}>
      <Stack.Screen options={{ title: "Announcements" }} />
      {items.length === 0 ? (
        <EmptyState
          icon="newspaper-outline"
          title="No announcements yet"
          subtitle="Check back later for news and updates from the temple."
        />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
              date={item.date}
              isNew={(item.createdAt ?? 0) > lastSeenNews}
            />
          ))}
        </ScrollView>
      )}

      {/* Admin FAB */}
      {isAdmin && (
        <TouchableOpacity
          onPress={() => router.push("/admin/news/new" as any)}
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
