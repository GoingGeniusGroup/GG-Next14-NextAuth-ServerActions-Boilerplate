"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/actions/userAndGuild";

// Define the context type
interface UsernameContextType {
  username: string | null;
  loading: boolean;
}

// Create context
const UsernameContext = createContext<UsernameContextType | null>(null);

// Create provider component
import { ReactNode } from "react";

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const user = await getCurrentUser();
        setUsername(user?.username || null);
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUsername();
  }, []);

  return (
    <UsernameContext.Provider value={{ username, loading }}>
      {children}
    </UsernameContext.Provider>
  );
}

// Custom hook to use the username
export function useUsername() {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}
