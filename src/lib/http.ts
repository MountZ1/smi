import type { ListParams } from "@/types";

export const API_BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string;
  signal?: AbortSignal;
}

export async function request(path: string, options: RequestOptions = {}): Promise<unknown> {
  const { method = "GET", body, token, signal } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError("Tidak dapat terhubung ke server. Periksa koneksi internetmu.");
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    //
  }

  if (!response.ok) {
    const message =
      isRecord(payload) && typeof payload.message === "string"
        ? payload.message
        : `Permintaan gagal (status ${response.status}).`;
    throw new ApiError(message, response.status);
  }

  if (payload === null) {
    throw new ApiError("Respons dari server tidak valid.", response.status);
  }

  return payload;
}

export function buildListPath(resource: string, { limit, skip, q }: ListParams): string {
  const query = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  const term = q?.trim();

  if (term) {
    query.set("q", term);
    return `/${resource}/search?${query}`;
  }
  return `/${resource}?${query}`;
}
