import { BackLink } from "@/components/BackLink";
import { DataState } from "@/components/DataState";
import { RecipeDetail, RecipeDetailSkeleton } from "@/components/RecipeDetail";
import { useFetch } from "@/hooks/useFetch";
import { useIdParam } from "@/hooks/useIdParam";
import { ApiError } from "@/lib/http";
import { getRecipeById } from "@/services/recipeService";

export function RecipeDetailPage() {
  const id = useIdParam();

  const {
    data: recipe,
    error,
    loading,
    retry,
  } = useFetch(
    (signal) =>
      id === null
        ? Promise.reject(new ApiError("ID resep tidak valid."))
        : getRecipeById(id, signal),
    [id],
  );

  return (
    <div className="space-y-6">
      <BackLink fallback="/auth/recipes">Kembali ke daftar resep</BackLink>

      <DataState
        loading={loading}
        error={error}
        isEmpty={!recipe}
        onRetry={retry}
        loadingFallback={<RecipeDetailSkeleton />}
        emptyTitle="Resep tidak ditemukan"
      >
        {recipe && <RecipeDetail recipe={recipe} />}
      </DataState>
    </div>
  );
}
