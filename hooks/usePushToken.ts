import { useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { id } from "@instantdb/react-native";
import { db } from "@/lib/db";
import { registerForPushNotificationsAsync } from "@/lib/notifications";

// Stable device ID — generated once per install and reused forever.
// Using this as the pushTokens entity ID means re-registering updates the
// existing record instead of creating a duplicate.
const DEVICE_ID_KEY = "@sstgh_device_id";

async function getOrCreateDeviceId(): Promise<string> {
  let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = id();
    await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function usePushToken(): void {
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      if (!token) return;
      const deviceId = await getOrCreateDeviceId();
      try {
        await db.transact(
          db.tx.pushTokens[deviceId].update({
            token,
            platform: Platform.OS,
            createdAt: Date.now(),
          })
        );
      } catch {
        // Token already stored — no action needed
      }
    })();
  }, []);
}
