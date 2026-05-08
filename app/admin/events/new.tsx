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

const EVENT_TYPES = ["puja", "festival", "special", "class"];

export default function NewEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("puja");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

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
            onChange={setDate}
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

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            style={{
              backgroundColor: saving ? TempleColors.border : TempleColors.saffron,
              borderRadius: 12,
              paddingVertical: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
              {saving ? "Saving…" : "Create Event"}
            </Text>
          </TouchableOpacity>
        </View>
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
