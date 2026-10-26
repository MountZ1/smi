import type { ListParams, Paginated, Recipe } from "@/types";
import { ApiError, buildListPath, isRecord, request } from "@/lib/http";
import { parsePaginated } from "@/lib/parse";

function isRecipe(value: unknown): value is Recipe {
  return isRecord(value) && typeof value.id === "number" && typeof value.name === "string";
}

export async function getRecipes(
  params: ListParams,
  signal?: AbortSignal,
): Promise<Paginated<Recipe>> {
  const data = await request(buildListPath("recipes", params), { signal });
  return parsePaginated(data, "recipes", isRecipe);
}

export async function getRecipeById(id: number, signal?: AbortSignal): Promise<Recipe> {
  const data = await request(`/recipes/${id}`, { signal });

  if (!isRecipe(data)) {
    throw new ApiError("Format data resep dari server tidak sesuai.");
  }

  return {
    ...data,
    ingredients: Array.isArray(data.ingredients)
      ? data.ingredients.filter((item) => typeof item === "string")
      : [],
    instructions: Array.isArray(data.instructions)
      ? data.instructions.filter((item) => typeof item === "string")
      : [],
  };
}
