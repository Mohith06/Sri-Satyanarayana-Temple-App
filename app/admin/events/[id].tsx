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

const EVENT_TYPES = ["puja", "festival", "special", "class"];

function formatDate(text: string): string {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

export default function EditEventScreen() {
  const router = useRouter();
  const { id: eventId } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = db.useQuery({
    events: { $: { where: { id: eventId } } },
  });

  const event = data?.events?.[0];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("puja");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title ?? "");
      setDate(event.date ?? "");
      setTime(event.time ?? "");
      setType(event.type ?? "puja");
      setLocation(event.location ?? "");
      setDescription(event.description ?? "");
    }
  }, [event?.id]);

  if (isLoading) return <LoadingScreen />;

  if (!event) {
    return (
      <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: TempleColors.textSecondary }}>Event not found.</Text>
      </View>
    );
  }

  const handleSave = async () => {
    if (!title.trim()) { Alert.alert("Required", "Please enter an event title."); return; }
    if (!date.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Required", "Please enter a valid date in YYYY-MM-DD format."); return;
    }
    setSaving(true);
    try {
      await db.transact(
        db.tx.events[eventId].update({
          title: title.trim(),
          date: date.trim(),
          time: time.trim(),
          type,
          location: location.trim(),
          description: description.trim(),
        })
      );
      router.back();
    } catch {
      Alert.alert("Error", "Could not update event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          await db.transact(db.tx.events[eventId].delete());
          router.back();
        },
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
        <SectionHeader title="Event Details" />
        <Card>
          <FieldRow label="Title *" value={title} onChange={setTitle} placeholder="Event name" />
          <FieldRow label="Date * (YYYY-MM-DD)" value={date} onChange={(text) => setDate(formatDate(text))} placeholder="2024-12-31" keyboard="numeric" />
          <FieldRow label="Time" value={time} onChange={setTime} placeholder="e.g. 10:00 AM" />
          <FieldRow label="Location" value={location} onChange={setLocation} placeholder="e.g. Main Hall" last />
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
              <Text style={{ fontSize: 13, fontWeight: "600", color: type === t ? TempleColors.saffron : TempleColors.textSecondary, textTransform: "capitalize" }}>
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
            placeholder="Additional details..."
            placeholderTextColor={TempleColors.textSecondary}
            style={{ fontSize: 14, color: TempleColors.textPrimary, minHeight: 90, textAlignVertical: "top", lineHeight: 20 }}
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
            <Text style={{ color: TempleColors.closedRed, fontWeight: "700", fontSize: 15 }}>Delete Event</Text>
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

function FieldRow({ label, value, onChange, placeholder, keyboard, last }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; keyboard?: "numeric"; last?: boolean }) {
  return (
    <View style={{ marginBottom: last ? 0 : 14 }}>
      <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={TempleColors.border}
        keyboardType={keyboard}
        style={{ borderWidth: 1, borderColor: TempleColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: TempleColors.textPrimary, backgroundColor: TempleColors.warmWhite }}
      />
    </View>
  );
}
