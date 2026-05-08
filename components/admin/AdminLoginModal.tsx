import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAdmin } from "@/lib/admin";
import { TempleColors } from "@/constants/Colors";

interface AdminLoginModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ visible, onClose, onSuccess }: AdminLoginModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = () => {
    const success = login(code);
    if (success) {
      setCode("");
      setError("");
      onSuccess();
    } else {
      setError("Incorrect passcode. Please try again.");
      shake();
      setCode("");
    }
  };

  const handleClose = () => {
    setCode("");
    setError("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <Animated.View
              style={{
                backgroundColor: TempleColors.cardBg,
                borderRadius: 16,
                padding: 24,
                width: "100%",
                maxWidth: 360,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 10,
                transform: [{ translateX: shakeAnim }],
              }}
            >
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: TempleColors.deepRed + "15",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Ionicons name="lock-closed" size={24} color={TempleColors.deepRed} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "700", color: TempleColors.textPrimary }}>
                  Admin Access
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: TempleColors.textSecondary,
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  Enter the admin passcode to continue
                </Text>
              </View>

              <TextInput
                value={code}
                onChangeText={(t) => { setCode(t); setError(""); }}
                secureTextEntry
                placeholder="Passcode"
                placeholderTextColor={TempleColors.textSecondary}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
                style={{
                  borderWidth: 1.5,
                  borderColor: error ? TempleColors.closedRed : TempleColors.border,
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  fontSize: 16,
                  color: TempleColors.textPrimary,
                  backgroundColor: TempleColors.warmWhite,
                  letterSpacing: 4,
                  marginBottom: 8,
                }}
              />

              {error ? (
                <Text style={{ fontSize: 12, color: TempleColors.closedRed, marginBottom: 12 }}>
                  {error}
                </Text>
              ) : (
                <View style={{ height: 20 }} />
              )}

              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.85}
                style={{
                  backgroundColor: TempleColors.deepRed,
                  borderRadius: 10,
                  paddingVertical: 13,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleClose} style={{ alignItems: "center", paddingVertical: 6 }}>
                <Text style={{ color: TempleColors.textSecondary, fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
