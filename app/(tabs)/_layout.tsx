import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";
import { db } from "@/lib/db";
import { useUnread } from "@/lib/unread";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, color, size }: { name: IoniconName; color: string; size: number }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  const { lastSeenNews } = useUnread();
  const { data } = db.useQuery({ news: {} });
  const unreadCount = (data?.news ?? []).filter(
    (item) => (item.createdAt ?? 0) > lastSeenNews
  ).length;
  const badge = unreadCount > 0 ? (unreadCount > 99 ? "99+" : unreadCount) : undefined;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TempleColors.saffron,
        tabBarInactiveTintColor: TempleColors.textSecondary,
        tabBarStyle: {
          backgroundColor: TempleColors.tabBarBg,
          borderTopColor: TempleColors.border,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        headerStyle: { backgroundColor: TempleColors.warmWhite },
        headerTintColor: TempleColors.deepRed,
        headerTitleStyle: { fontWeight: "700", fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="calendar" color={color} size={size} />
          ),
          headerTitle: "Events Calendar",
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="flower" color={color} size={size} />
          ),
          headerTitle: "Puja Services",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="menu" color={color} size={size} />
          ),
          headerTitle: "More",
          tabBarBadge: badge,
          tabBarBadgeStyle: {
            backgroundColor: TempleColors.deepRed,
            color: "#fff",
            fontSize: 10,
          },
        }}
      />
    </Tabs>
  );
}
