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
import { useRouter } from "expo-router";
import { id } from "@instantdb/react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { TempleColors } from "@/constants/Colors";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { sendPushNotifications } from "@/lib/notifications";
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS } from "@/lib/templeData";

const EVENT_TYPES = ["puja", "festival", "special", "class"];

function formatDate(text: string): string {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

export default function NewEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("puja");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const formattedPreviewDate = (() => {
    try { return new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
    catch { return date; }
  })();

  const handleSharePreview = () => {
    const parts = [`🗓️ PREVIEW — Temple Event\n\n${title.trim()}`];
    if (date) parts.push(formattedPreviewDate);
    if (time) parts.push(`Time: ${time}`);
    if (location) parts.push(`Location: ${location}`);
    if (type) parts.push(`Type: ${EVENT_TYPE_LABELS[type] ?? type}`);
    if (description) parts.push(`\n${description.trim()}`);
    parts.push("\nSri Satyanarayana Temple of Greater Houston");
    Share.share({ message: parts.join("\n") });
  };

  const { data: tokenData } = db.useQuery({ pushTokens: {} });

  const handleSave = async () => {
    if (!title.trim()) { Alert.alert("Required", "Please enter an event title."); return; }
    if (!date.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Required", "Please enter a valid date in YYYY-MM-DD format."); return;
    }
    setSaving(true);
    try {
      await db.transact(
        db.tx.events[id()].update({
          title: title.trim(),
          date: date.trim(),
          time: time.trim(),
          type,
          location: location.trim(),
          description: description.trim(),
          createdAt: Date.now(),
        })
      );
      const tokens = (tokenData?.pushTokens ?? []).map((t) => t.token);
      await sendPushNotifications(
        tokens,
        "New Event Added 🙏",
        `${title.trim()}${time.trim() ? ` · ${time.trim()}` : ""}`,
        { type: "event" }
      );
      router.back();
    } catch {
      Alert.alert("Error", "Could not save event. Please try again.");
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
        <SectionHeader title="Event Details" />
        <Card>
          <FormField label="Title *" value={title} onChange={setTitle} placeholder="Event name" />
          <FormField
            label="Date * (YYYY-MM-DD)"
            value={date}
            onChange={(text) => setDate(formatDate(text))}
            placeholder="2024-12-31"
            keyboard="numeric"
          />
          <FormField label="Time" value={time} onChange={setTime} placeholder="e.g. 10:00 AM" />
          <FormField label="Location" value={location} onChange={setLocation} placeholder="e.g. Main Hall" last />
        </Card>

        <SectionHeader title="Event Type" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 8 }}>
          {EVENT_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: type === t ? TempleColors.saffron : TempleColors.border,
                backgroundColor: type === t ? TempleColors.saffron + "15" : TempleColors.cardBg,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: type === t ? TempleColors.saffron : TempleColors.textSecondary,
                  textTransform: "capitalize",
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title="Description" />
        <Card>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholder="Additional details about the event..."
            placeholderTextColor={TempleColors.textSecondary}
            style={{
              fontSize: 14,
              color: TempleColors.textPrimary,
              minHeight: 90,
              textAlignVertical: "top",
              lineHeight: 20,
            }}
          />
        </Card>

        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              if (!title.trim() || !date.trim()) { Alert.alert("Fill in fields", "Add a title and date to preview."); return; }
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
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>{saving ? "Saving…" : "Create Event"}</Text>
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
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
              <View style={{
                backgroundColor: TempleColors.cardBg, borderRadius: 12, padding: 14,
                borderLeftWidth: 4, borderLeftColor: EVENT_TYPE_COLORS[type] ?? EVENT_TYPE_COLORS.default,
                borderWidth: 1, borderColor: TempleColors.border,
              }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary, flex: 1, marginRight: 8 }}>{title || "Untitled Event"}</Text>
                  {type ? (
                    <View style={{ backgroundColor: (EVENT_TYPE_COLORS[type] ?? EVENT_TYPE_COLORS.default) + "20", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ fontSize: 11, fontWeight: "600", color: EVENT_TYPE_COLORS[type] ?? EVENT_TYPE_COLORS.default }}>{EVENT_TYPE_LABELS[type] ?? type}</Text>
                    </View>
                  ) : null}
                </View>
                {date ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Ionicons name="calendar-outline" size={13} color={TempleColors.textSecondary} />
                    <Text style={{ fontSize: 13, color: TempleColors.textSecondary }}>{formattedPreviewDate}</Text>
                  </View>
                ) : null}
                {time ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Ionicons name="time-outline" size={13} color={TempleColors.textSecondary} />
                    <Text style={{ fontSize: 13, color: TempleColors.textSecondary }}>{time}</Text>
                  </View>
                ) : null}
                {location ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Ionicons name="location-outline" size={13} color={TempleColors.textSecondary} />
                    <Text style={{ fontSize: 13, color: TempleColors.textSecondary }}>{location}</Text>
                  </View>
                ) : null}
                {description ? (
                  <Text style={{ fontSize: 13, color: TempleColors.textSecondary, marginTop: 8, lineHeight: 18 }}>{description}</Text>
                ) : null}
              </View>
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

function FormField({
  label, value, onChange, placeholder, keyboard, last,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; keyboard?: "numeric"; last?: boolean;
}) {
  return (
    <View style={{ marginBottom: last ? 0 : 14 }}>
      <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={TempleColors.border}
        keyboardType={keyboard}
        style={{
          borderWidth: 1,
          borderColor: TempleColors.border,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 14,
          color: TempleColors.textPrimary,
          backgroundColor: TempleColors.warmWhite,
        }}
      />
    </View>
  );
}
