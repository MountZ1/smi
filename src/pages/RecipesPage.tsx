import { PaginatedList } from "@/components/PaginatedList";
import { RecipeCard, RecipeCardSkeleton } from "@/components/RecipeCard";
import { getRecipes } from "@/services/recipeService";

export function RecipesPage() {
  return (
    <PaginatedList
      title="Recipes"
      description="Kumpulan resep dari DummyJSON."
      searchPlaceholder="Cari resep..."
      pageSize={12}
      fetcher={getRecipes}
      renderItem={(recipe) => <RecipeCard recipe={recipe} />}
      renderSkeleton={() => <RecipeCardSkeleton />}
      gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    />
  );
}
