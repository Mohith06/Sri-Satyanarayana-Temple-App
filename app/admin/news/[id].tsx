import React, { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { db } from "@/lib/db";
import { TempleColors } from "@/constants/Colors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function EditAnnouncementScreen() {
  const router = useRouter();
  const { id: newsId } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = db.useQuery({
    news: { $: { where: { id: newsId } } },
  });

  const item = data?.news?.[0];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title ?? "");
      setDate(item.date ?? "");
      setBody(item.body ?? "");
    }
  }, [item?.id]);

  if (isLoading) return <LoadingScreen />;

  if (!item) {
    return (
      <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: TempleColors.textSecondary }}>Announcement not found.</Text>
      </View>
    );
  }

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) { Alert.alert("Required", "Title and body are required."); return; }
    setSaving(true);
    try {
      await db.transact(db.tx.news[newsId].update({ title: title.trim(), date: date.trim(), body: body.trim() }));
      router.back();
    } catch {
      Alert.alert("Error", "Could not update announcement.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Announcement", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => { await db.transact(db.tx.news[newsId].delete()); router.back(); },
      },
    ]);
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
            <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>Date (YYYY-MM-DD)</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="2024-12-31"
              placeholderTextColor={TempleColors.border}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: TempleColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: TempleColors.textPrimary, backgroundColor: TempleColors.warmWhite }}
            />
          </View>
        </Card>

        <SectionHeader title="Body" />
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
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>{saving ? "Saving…" : "Save Changes"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={{ backgroundColor: TempleColors.closedRed + "15", borderRadius: 12, paddingVertical: 15, alignItems: "center", borderWidth: 1, borderColor: TempleColors.closedRed + "40" }}
          >
            <Text style={{ color: TempleColors.closedRed, fontWeight: "700", fontSize: 15 }}>Delete Announcement</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
