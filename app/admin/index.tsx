import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { id } from "@instantdb/react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { db } from "@/lib/db";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { TempleColors } from "@/constants/Colors";
import { EVENT_TYPE_LABELS } from "@/lib/templeData";

const SEGMENTS = ["Events", "News", "Volunteers", "Gallery"] as const;
type Segment = (typeof SEGMENTS)[number];

const GALLERY_CATEGORIES = ["Festivals", "Pujas", "Temple", "Community"];
const CELL = Math.floor((Dimensions.get("window").width - 40) / 3);

export default function AdminDashboard() {
  const router = useRouter();
  const [segment, setSegment] = useState<Segment>("Events");
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("Festivals");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = db.useQuery({
    events: { $: { order: { date: "asc" } } },
    news: { $: { order: { createdAt: "desc" } } },
    volunteers: { $: { order: { submittedAt: "desc" } } },
    gallery: { $: { order: { createdAt: "desc" } }, image: {} },
  });

  if (isLoading) return <LoadingScreen />;

  const deleteEvent = (eid: string) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => db.transact(db.tx.events[eid].delete()) },
    ]);
  };

  const deleteNews = (nid: string) => {
    Alert.alert("Delete Announcement", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => db.transact(db.tx.news[nid].delete()) },
    ]);
  };

  const deleteVolunteer = (vid: string) => {
    Alert.alert("Delete Application", "Remove this volunteer application?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => db.transact(db.tx.volunteers[vid].delete()) },
    ]);
  };

  const deletePhoto = (gid: string) => {
    Alert.alert("Delete Photo", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => db.transact(db.tx.gallery[gid].delete()) },
    ]);
  };

  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow access to your photo library to upload images.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];
    setUploading(true);
    try {
      const galleryId = id();
      const ext = asset.uri.split(".").pop() ?? "jpg";
      const path = `gallery/${galleryId}.${ext}`;
      const response = await fetch(asset.uri);
      const blob = await response.blob();
      const { data: fileData } = await db.storage.uploadFile(path, blob);
      await db.transact(
        db.tx.gallery[galleryId].update({
          category: uploadCategory,
          caption: uploadCaption.trim(),
          createdAt: Date.now(),
        }).link({ image: fileData.id })
      );
      setShowAddForm(false);
      setUploadCaption("");
    } catch {
      Alert.alert("Error", "Could not upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: TempleColors.warmWhite }}>
      {/* Segment control */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: TempleColors.deepRed + "10",
          marginHorizontal: 16,
          marginVertical: 12,
          borderRadius: 10,
          padding: 3,
        }}
      >
        {SEGMENTS.map((seg) => (
          <TouchableOpacity
            key={seg}
            onPress={() => { setSegment(seg); setShowAddForm(false); }}
            style={{
              flex: 1,
              paddingVertical: 8,
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: segment === seg ? TempleColors.deepRed : "transparent",
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "600", color: segment === seg ? "#fff" : TempleColors.textSecondary }}>
              {seg}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events */}
      {segment === "Events" && (
        <>
          <TouchableOpacity
            onPress={() => router.push("/admin/events/new" as any)}
            style={{
              flexDirection: "row", alignItems: "center", gap: 6,
              marginHorizontal: 16, marginBottom: 8,
              backgroundColor: TempleColors.saffron,
              paddingVertical: 10, paddingHorizontal: 14,
              borderRadius: 8, alignSelf: "flex-start",
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Add Event</Text>
          </TouchableOpacity>
          <FlatList
            data={data?.events ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
            ListEmptyComponent={<EmptyState icon="calendar-outline" title="No events yet" subtitle="Tap 'Add Event' to create one." />}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: TempleColors.cardBg, borderRadius: 10, padding: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: TempleColors.border }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 2 }}>
                    {item.date}{item.time ? ` · ${item.time}` : ""}{item.type ? ` · ${EVENT_TYPE_LABELS[item.type] ?? item.type}` : ""}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push(`/admin/events/${item.id}` as any)} style={{ padding: 6 }}>
                  <Ionicons name="pencil" size={16} color={TempleColors.saffron} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteEvent(item.id)} style={{ padding: 6 }}>
                  <Ionicons name="trash" size={16} color={TempleColors.closedRed} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {/* News */}
      {segment === "News" && (
        <>
          <TouchableOpacity
            onPress={() => router.push("/admin/news/new" as any)}
            style={{
              flexDirection: "row", alignItems: "center", gap: 6,
              marginHorizontal: 16, marginBottom: 8,
              backgroundColor: TempleColors.saffron,
              paddingVertical: 10, paddingHorizontal: 14,
              borderRadius: 8, alignSelf: "flex-start",
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Add Announcement</Text>
          </TouchableOpacity>
          <FlatList
            data={data?.news ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
            ListEmptyComponent={<EmptyState icon="newspaper-outline" title="No announcements yet" subtitle="Tap 'Add Announcement' to create one." />}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: TempleColors.cardBg, borderRadius: 10, padding: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: TempleColors.border }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: TempleColors.textPrimary }} numberOfLines={1}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 2 }}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(`/admin/news/${item.id}` as any)} style={{ padding: 6 }}>
                  <Ionicons name="pencil" size={16} color={TempleColors.saffron} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNews(item.id)} style={{ padding: 6 }}>
                  <Ionicons name="trash" size={16} color={TempleColors.closedRed} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {/* Volunteers */}
      {segment === "Volunteers" && (
        <FlatList
          data={data?.volunteers ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 }}
          ListEmptyComponent={<EmptyState icon="people-outline" title="No applications yet" />}
          renderItem={({ item }) => {
            const interests = (() => { try { return JSON.parse(item.interests) as string[]; } catch { return []; } })();
            const date = new Date(item.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            return (
              <View style={{ backgroundColor: TempleColors.cardBg, borderRadius: 10, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: TempleColors.border }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: TempleColors.textPrimary }}>{item.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={{ fontSize: 11, color: TempleColors.textSecondary }}>{date}</Text>
                    <TouchableOpacity onPress={() => deleteVolunteer(item.id)} style={{ padding: 4 }}>
                      <Ionicons name="trash" size={16} color={TempleColors.closedRed} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{ fontSize: 13, color: TempleColors.saffron, marginBottom: 2 }}>{item.email}</Text>
                {item.phone ? <Text style={{ fontSize: 12, color: TempleColors.textSecondary }}>{item.phone}</Text> : null}
                {interests.length > 0 && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                    {interests.map((i) => (
                      <View key={i} style={{ backgroundColor: TempleColors.saffron + "15", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 }}>
                        <Text style={{ fontSize: 11, color: TempleColors.saffron }}>{i}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {item.message ? (
                  <Text style={{ fontSize: 12, color: TempleColors.textSecondary, marginTop: 6, fontStyle: "italic" }}>"{item.message}"</Text>
                ) : null}
              </View>
            );
          }}
        />
      )}

      {/* Gallery */}
      {segment === "Gallery" && (
        <>
          {showAddForm ? (
            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: TempleColors.textSecondary, marginBottom: 8 }}>Category</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {GALLERY_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setUploadCategory(cat)}
                    style={{
                      paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
                      backgroundColor: uploadCategory === cat ? TempleColors.saffron : TempleColors.cardBg,
                      borderWidth: 1, borderColor: uploadCategory === cat ? TempleColors.saffron : TempleColors.border,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "600", color: uploadCategory === cat ? "#fff" : TempleColors.textSecondary }}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                value={uploadCaption}
                onChangeText={setUploadCaption}
                placeholder="Caption (optional)"
                placeholderTextColor={TempleColors.border}
                style={{ borderWidth: 1, borderColor: TempleColors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: TempleColors.textPrimary, marginBottom: 12, backgroundColor: TempleColors.warmWhite }}
              />
              <TouchableOpacity
                onPress={handleUploadPhoto}
                disabled={uploading}
                style={{ backgroundColor: uploading ? TempleColors.border : TempleColors.saffron, borderRadius: 10, paddingVertical: 13, alignItems: "center", marginBottom: 8 }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>{uploading ? "Uploading…" : "Choose Photo & Upload"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAddForm(false)} style={{ alignItems: "center", paddingVertical: 8 }}>
                <Text style={{ color: TempleColors.textSecondary, fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setShowAddForm(true)}
              style={{
                flexDirection: "row", alignItems: "center", gap: 6,
                marginHorizontal: 16, marginBottom: 12,
                backgroundColor: TempleColors.saffron,
                paddingVertical: 10, paddingHorizontal: 14,
                borderRadius: 8, alignSelf: "flex-start",
              }}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Add Photo</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={data?.gallery ?? []}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 32, flexGrow: 1 }}
            columnWrapperStyle={{ gap: 4, marginBottom: 4 }}
            ListEmptyComponent={
              <EmptyState icon="images-outline" title="No photos yet" subtitle="Tap 'Add Photo' to upload one." />
            }
            renderItem={({ item }) => (
              <View style={{ width: CELL, height: CELL, borderRadius: 8, overflow: "hidden" }}>
                {item.image?.url ? (
                  <Image source={{ uri: item.image.url }} style={{ width: CELL, height: CELL }} contentFit="cover" />
                ) : (
                  <View style={{ width: CELL, height: CELL, backgroundColor: TempleColors.border }} />
                )}
                <TouchableOpacity
                  onPress={() => deletePhoto(item.id)}
                  style={{ position: "absolute", top: 4, right: 4, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 10, padding: 4 }}
                >
                  <Ionicons name="trash" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
