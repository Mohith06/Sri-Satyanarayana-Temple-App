import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { id } from "@instantdb/react-native";
import { db } from "@/lib/db";
import { TempleColors } from "@/constants/Colors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

function formatDate(text: string): string {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

export default function NewAnnouncementScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) { Alert.alert("Required", "Please enter a title."); return; }
    if (!body.trim()) { Alert.alert("Required", "Please enter the announcement body."); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Required", "Please enter a valid date in YYYY-MM-DD format."); return;
    }
    setSaving(true);
    try {
      await db.transact(
        db.tx.news[id()].update({
          title: title.trim(),
          date: date.trim(),
          body: body.trim(),
          createdAt: Date.now(),
        })
      );
      router.back();
    } catch {
      Alert.alert("Error", "Could not save announcement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Announcement Details" />
        <Card>
          <View style={{ marginBottom: 14 }}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Announcement headline"
              placeholderTextColor={TempleColors.border}
              style={{ borderWidth: 1, borderColor: TempleColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: TempleColors.textPrimary, backgroundColor: TempleColors.warmWhite }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>Date * (YYYY-MM-DD)</Text>
            <TextInput
              value={date}
              onChangeText={(text) => setDate(formatDate(text))}
              placeholder="2024-12-31"
              placeholderTextColor={TempleColors.border}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: TempleColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: TempleColors.textPrimary, backgroundColor: TempleColors.warmWhite }}
            />
          </View>
        </Card>

        <SectionHeader title="Body *" />
        <Card>
          <TextInput
            value={body}
            onChangeText={setBody}
            multiline
            placeholder="Write the full announcement here..."
            placeholderTextColor={TempleColors.textSecondary}
            style={{ fontSize: 14, color: TempleColors.textPrimary, minHeight: 160, textAlignVertical: "top", lineHeight: 22 }}
          />
        </Card>

        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 10 }}>
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            style={{ backgroundColor: saving ? TempleColors.border : TempleColors.saffron, borderRadius: 12, paddingVertical: 15, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>{saving ? "Publishing…" : "Publish Announcement"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={saving}
            style={{ borderRadius: 12, paddingVertical: 15, alignItems: "center", borderWidth: 1.5, borderColor: TempleColors.border }}
          >
            <Text style={{ color: TempleColors.textSecondary, fontWeight: "600", fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
