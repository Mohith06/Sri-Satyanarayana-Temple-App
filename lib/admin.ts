import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ADMIN_PASSCODE = process.env.EXPO_PUBLIC_ADMIN_CODE ?? "SSTGH2024!";
const ADMIN_STORAGE_KEY = "@sstgh_admin_session";

interface AdminContextValue {
  isAdmin: boolean;
  isLoading: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  isLoading: true,
  login: () => false,
  logout: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ADMIN_STORAGE_KEY).then((val) => {
      if (val === "true") setIsAdmin(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const login = (code: string): boolean => {
    if (code === ADMIN_PASSCODE) {
      setIsAdmin(true);
      AsyncStorage.setItem(ADMIN_STORAGE_KEY, "true").catch(() => {});
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    AsyncStorage.removeItem(ADMIN_STORAGE_KEY).catch(() => {});
  };

  return React.createElement(
    AdminContext.Provider,
    { value: { isAdmin, isLoading, login, logout } },
    children
  );
}

export const useAdmin = () => useContext(AdminContext);
