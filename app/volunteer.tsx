import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { id } from "@instantdb/react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { TempleColors } from "@/constants/Colors";
import { VOLUNTEER_INTERESTS } from "@/lib/templeData";

export default function VolunteerScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (!name.trim()) { Alert.alert("Required", "Please enter your name."); return; }
    if (!email.trim() || !email.includes("@")) { Alert.alert("Required", "Please enter a valid email."); return; }
    if (selected.length === 0) { Alert.alert("Required", "Please select at least one area of interest."); return; }

    setLoading(true);
    try {
      await db.transact(
        db.tx.volunteers[id()].update({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          interests: JSON.stringify(selected),
          message: message.trim(),
          submittedAt: Date.now(),
        })
      );
      setSubmitted(true);
    } catch {
      Alert.alert("Error", "Could not submit your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: TempleColors.warmWhite,
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
          gap: 16,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: TempleColors.openGreen + "20",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="checkmark-circle" size={44} color={TempleColors.openGreen} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "800", color: TempleColors.textPrimary, textAlign: "center" }}>
          Thank You!
        </Text>
        <Text style={{ fontSize: 14, color: TempleColors.textSecondary, textAlign: "center", lineHeight: 20 }}>
          Your volunteer application has been received. We will reach out to you soon.
        </Text>
      </View>
    );
  }

  return (
    <>
    <Stack.Screen options={{ title: "Volunteer" }} />
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            backgroundColor: TempleColors.deepRed,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 13, color: TempleColors.gold, fontWeight: "600", marginBottom: 4 }}>
            SERVE THE COMMUNITY
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff", lineHeight: 24 }}>
            Become a Volunteer
          </Text>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6, lineHeight: 18 }}>
            Join our family of dedicated volunteers who help make the temple a welcoming place for all.
          </Text>
        </View>

        <SectionHeader title="Your Details" />
        <Card>
          <InputField label="Full Name *" value={name} onChange={setName} placeholder="Your name" />
          <InputField label="Email *" value={email} onChange={setEmail} placeholder="your@email.com" keyboard="email-address" />
          <InputField label="Phone" value={phone} onChange={setPhone} placeholder="(optional)" keyboard="phone-pad" last />
        </Card>

        <SectionHeader title="Areas of Interest *" subtitle="Select all that apply" />
        <View style={{ paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {VOLUNTEER_INTERESTS.map((interest) => {
            const active = selected.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1.5,
                  borderColor: active ? TempleColors.saffron : TempleColors.border,
                  backgroundColor: active ? TempleColors.saffron + "15" : TempleColors.cardBg,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: active ? "600" : "400",
                    color: active ? TempleColors.saffron : TempleColors.textSecondary,
                  }}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <SectionHeader title="Message" subtitle="Optional — tell us more about yourself" />
        <Card>
          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            placeholder="Any additional information..."
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
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.85}
            style={{
              backgroundColor: loading ? TempleColors.border : TempleColors.saffron,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
              {loading ? "Submitting…" : "Submit Application"}
            </Text>
            {!loading && <Ionicons name="send" size={16} color="#fff" />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  keyboard,
  last,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  keyboard?: "email-address" | "phone-pad";
  last?: boolean;
}) {
  return (
    <View style={{ marginBottom: last ? 0 : 14 }}>
      <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 4 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={TempleColors.border}
        keyboardType={keyboard}
        autoCapitalize={keyboard === "email-address" ? "none" : "words"}
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
