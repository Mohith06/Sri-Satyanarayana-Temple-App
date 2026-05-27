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
  Modal,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { id } from "@instantdb/react-native";
import { db } from "@/lib/db";
import { TempleColors } from "@/constants/Colors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { sendPushNotifications } from "@/lib/notifications";

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
  const [previewVisible, setPreviewVisible] = useState(false);

  const formattedPreviewDate = (() => {
    try {
      return new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    } catch { return date; }
  })();

  const handleSharePreview = () => {
    Share.share({ message: `📢 PREVIEW — Temple Announcement\n\n${title.trim()}\n${formattedPreviewDate}\n\n${body.trim()}\n\nSri Satyanarayana Temple of Greater Houston` });
  };

  const { data: tokenData } = db.useQuery({ pushTokens: {} });

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
      const tokens = (tokenData?.pushTokens ?? []).map((t) => t.token);
      await sendPushNotifications(
        tokens,
        "Temple Announcement 📢",
        title.trim(),
        { type: "news" }
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
            onPress={() => {
              if (!title.trim() || !body.trim()) { Alert.alert("Fill in fields", "Add a title and body to preview."); return; }
              setPreviewVisible(true);
            }}
            style={{ backgroundColor: TempleColors.deepRed + "12", borderRadius: 12, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: TempleColors.deepRed + "30" }}
          >
            <Ionicons name="eye-outline" size={18} color={TempleColors.deepRed} />
            <Text style={{ color: TempleColors.deepRed, fontWeight: "700", fontSize: 15 }}>Preview & Share</Text>
          </TouchableOpacity>
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

        {/* Preview Modal */}
        <Modal visible={previewVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setPreviewVisible(false)}>
          <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: TempleColors.border }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: TempleColors.textPrimary }}>Preview</Text>
              <TouchableOpacity onPress={() => setPreviewVisible(false)}>
                <Ionicons name="close" size={24} color={TempleColors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: TempleColors.saffron }} />
                <Text style={{ fontSize: 12, color: TempleColors.textSecondary, fontWeight: "500" }}>{formattedPreviewDate}</Text>
              </View>
              <Text style={{ fontSize: 22, fontWeight: "800", color: TempleColors.textPrimary, lineHeight: 30, marginBottom: 16 }}>{title || "Untitled"}</Text>
              <View style={{ height: 2, backgroundColor: TempleColors.border, marginBottom: 16 }} />
              <Text style={{ fontSize: 15, color: TempleColors.textPrimary, lineHeight: 24 }}>{body || "No body yet."}</Text>
            </ScrollView>
            <View style={{ padding: 16, gap: 10, borderTopWidth: 1, borderTopColor: TempleColors.border }}>
              <TouchableOpacity
                onPress={handleSharePreview}
                style={{ backgroundColor: TempleColors.saffron, borderRadius: 12, paddingVertical: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }}
              >
                <Ionicons name="share-outline" size={18} color="#fff" />
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Share Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={{ borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1.5, borderColor: TempleColors.border }}
              >
                <Text style={{ color: TempleColors.textSecondary, fontWeight: "600", fontSize: 15 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
