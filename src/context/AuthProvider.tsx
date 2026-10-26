import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@/types";
import {
  clearSession,
  loadSession,
  login as loginRequest,
  saveSession,
} from "@/services/authService";
import { AuthContext } from "@/context/auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(loadSession);

  const login = useCallback(async (username: string, password: string) => {
    const next = await loginRequest(username, password);
    saveSession(next);
    setSession(next);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  useEffect(() => {
    if (!session) return;

    const remaining = Math.max(session.expiresAt - Date.now(), 0);
    const timer = window.setTimeout(logout, remaining);
    return () => window.clearTimeout(timer);
  }, [session, logout]);

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout]);

  return <AuthContext value={value}>{children}</AuthContext>;
}
