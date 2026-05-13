import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_SEEN_KEY = "@sstgh_last_seen_news";

interface UnreadContextValue {
  lastSeenNews: number;
  markNewsAsRead: () => void;
}

const UnreadContext = createContext<UnreadContextValue>({
  lastSeenNews: 0,
  markNewsAsRead: () => {},
});

export function UnreadProvider({ children }: { children: React.ReactNode }) {
  const [lastSeenNews, setLastSeenNews] = useState<number>(0);

  useEffect(() => {
    AsyncStorage.getItem(LAST_SEEN_KEY).then((val) => {
      if (val) {
        setLastSeenNews(parseInt(val, 10));
      } else {
        // First install: treat all existing news as already seen so the badge
        // only fires for content added after the user installed the app.
        const now = Date.now();
        AsyncStorage.setItem(LAST_SEEN_KEY, now.toString());
        setLastSeenNews(now);
      }
    });
  }, []);

  const markNewsAsRead = () => {
    const now = Date.now();
    setLastSeenNews(now);
    AsyncStorage.setItem(LAST_SEEN_KEY, now.toString());
  };

  return (
    <UnreadContext.Provider value={{ lastSeenNews, markNewsAsRead }}>
      {children}
    </UnreadContext.Provider>
  );
}

export const useUnread = () => useContext(UnreadContext);
