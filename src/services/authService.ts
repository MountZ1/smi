import type { Session } from "@/types";
import { ApiError, isRecord, request } from "@/lib/http";

const STORAGE_KEY = "smi.session";
const TOKEN_LIFETIME_MINUTES = 60;

export async function login(username: string, password: string): Promise<Session> {
  const data = await request("/auth/login", {
    method: "POST",
    body: { username: username.trim(), password, expiresInMins: TOKEN_LIFETIME_MINUTES },
  });

  if (
    !isRecord(data) ||
    typeof data.accessToken !== "string" ||
    typeof data.id !== "number" ||
    typeof data.username !== "string"
  ) {
    throw new ApiError("Respons login dari server tidak sesuai.");
  }

  return {
    accessToken: data.accessToken,
    expiresAt: Date.now() + TOKEN_LIFETIME_MINUTES * 60 * 1000,
    user: {
      id: data.id,
      username: data.username,
      email: typeof data.email === "string" ? data.email : "",
      firstName: typeof data.firstName === "string" ? data.firstName : "",
      lastName: typeof data.lastName === "string" ? data.lastName : "",
      image: typeof data.image === "string" ? data.image : undefined,
    },
  };
}

function isSession(value: unknown): value is Session {
  return (
    isRecord(value) &&
    typeof value.accessToken === "string" &&
    typeof value.expiresAt === "number" &&
    isRecord(value.user) &&
    typeof value.user.id === "number"
  );
}

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isSession(parsed) || parsed.expiresAt <= Date.now()) {
      clearSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: Session): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch { }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { }
}
