import type { Paginated } from "@/types";
import { ApiError, isRecord } from "@/lib/http";

export function parsePaginated<T>(
  data: unknown,
  key: string,
  isItem: (value: unknown) => value is T,
): Paginated<T> {
  if (!isRecord(data) || !Array.isArray(data[key]) || typeof data.total !== "number") {
    throw new ApiError("Format data dari server tidak sesuai.");
  }

  return {
    items: (data[key] as unknown[]).filter(isItem),
    total: data.total,
    skip: typeof data.skip === "number" ? data.skip : 0,
    limit: typeof data.limit === "number" ? data.limit : 0,
  };
}
