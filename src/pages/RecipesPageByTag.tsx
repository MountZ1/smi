import { Navigate, useParams } from "react-router";
import { RecipeCard, RecipeCardSkeleton } from "@/components/RecipeCard";
import { getRecipesByTag } from "@/services/recipeService";
import { PaginatedList } from "@/components/PaginatedList";

export function RecipesPageByTag() {
  const { tag } = useParams<{ tag: string }>();

  if (!tag) return <Navigate to="/auth/recipes" replace />;

  return (
    <PaginatedList
      key={tag}
      title={`Recipes: ${tag}`}
      description="Kumpulan resep dari DummyJSON."
      searchPlaceholder="Cari resep..."
      pageSize={12}
      fetcher={(params, signal) => getRecipesByTag(tag, params, signal)}
      renderItem={(recipe) => <RecipeCard recipe={recipe} />}
      renderSkeleton={() => <RecipeCardSkeleton />}
      gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    />
  );
}
