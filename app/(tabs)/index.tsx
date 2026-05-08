import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WelcomeBanner } from "@/components/home/WelcomeBanner";
import { TodaySchedule } from "@/components/home/TodaySchedule";
import { QuickLinks } from "@/components/home/QuickLinks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";
import { useAdmin } from "@/lib/admin";
import { TempleColors } from "@/constants/Colors";
import { TEMPLE_ADDRESS } from "@/constants/TempleInfo";

export default function HomeScreen() {
  const router = useRouter();
  const { isAdmin, logout } = useAdmin();
  const [loginVisible, setLoginVisible] = useState(false);

  const handleAdminPress = () => {
    if (isAdmin) {
      router.push("/admin" as any);
    } else {
      setLoginVisible(true);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <WelcomeBanner onAdminPress={handleAdminPress} />

      {/* Admin strip — shown when logged in */}
      {isAdmin ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: TempleColors.deepRed + "10",
            borderBottomWidth: 1,
            borderBottomColor: TempleColors.border,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/admin" as any)}
            activeOpacity={0.8}
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Ionicons name="settings" size={15} color={TempleColors.deepRed} />
            <Text style={{ color: TempleColors.deepRed, fontWeight: "700", fontSize: 13 }}>
              Open Admin Panel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text style={{ color: TempleColors.textSecondary, fontSize: 12 }}>Sign out</Text>
            <Ionicons name="log-out-outline" size={14} color={TempleColors.textSecondary} />
          </TouchableOpacity>
        </View>
      ) : null}

      <SectionHeader title="Today's Hours" />
      <Card>
        <TodaySchedule />
      </Card>

      <SectionHeader title="Quick Links" />
      <View style={{ paddingHorizontal: 4, marginTop: 4 }}>
        <QuickLinks />
      </View>

      <SectionHeader title="Visit Us" />
      <Card>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: TempleColors.saffron + "20",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Ionicons name="location" size={20} color={TempleColors.saffron} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary, marginBottom: 2 }}>
              Address
            </Text>
            <Text style={{ fontSize: 13, color: TempleColors.textSecondary, lineHeight: 18 }}>
              {TEMPLE_ADDRESS}
            </Text>
          </View>
        </View>
      </Card>

      <AdminLoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onSuccess={() => setLoginVisible(false)}
      />
    </ScrollView>
  );
}
