import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ADMIN_PASSCODE = process.env.EXPO_PUBLIC_ADMIN_CODE ?? "SSTGH2024!";
const ADMIN_STORAGE_KEY = "@sstgh_admin_session";

interface AdminContextValue {
  isAdmin: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ADMIN_STORAGE_KEY).then((val) => {
      if (val === "true") setIsAdmin(true);
    });
  }, []);

  const login = (code: string): boolean => {
    if (code === ADMIN_PASSCODE) {
      setIsAdmin(true);
      AsyncStorage.setItem(ADMIN_STORAGE_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    AsyncStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  return React.createElement(
    AdminContext.Provider,
    { value: { isAdmin, login, logout } },
    children
  );
}

export const useAdmin = () => useContext(AdminContext);
