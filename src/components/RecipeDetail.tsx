import type { Recipe } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const stats = [
    { label: "Persiapan", value: formatMinutes(recipe.prepTimeMinutes) },
    { label: "Memasak", value: formatMinutes(recipe.cookTimeMinutes) },
    { label: "Porsi", value: recipe.servings?.toString() },
    {
      label: "Kalori",
      value:
        typeof recipe.caloriesPerServing === "number"
          ? `${recipe.caloriesPerServing} kkal`
          : undefined,
    },
    {
      label: "Rating",
      value:
        typeof recipe.rating === "number"
          ? `★ ${recipe.rating.toFixed(1)}${typeof recipe.reviewCount === "number" ? ` (${recipe.reviewCount})` : ""
          }`
          : undefined,
    },
  ].filter((stat) => stat.value !== undefined);

  const badges = [recipe.cuisine, recipe.difficulty, ...(recipe.mealType ?? [])].filter(Boolean);
  const ingredients = recipe.ingredients ?? [];
  const instructions = recipe.instructions ?? [];

  return (
    <article className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="aspect-[4/3] w-full rounded-xl bg-muted object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
            Tanpa gambar
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">{recipe.name}</h1>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-3">
              {stats.map(({ label, value }) => (
                <div key={label} className="rounded-lg border p-3">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Bahan</h2>
          {ingredients.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {ingredients.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Data bahan tidak tersedia.</p>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Langkah memasak</h2>
          {instructions.length > 0 ? (
            <ol className="list-decimal space-y-2 pl-5 text-sm">
              {instructions.map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">Langkah memasak tidak tersedia.</p>
          )}
        </section>
      </div>
    </article>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
      <Card className="gap-3 p-5">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </Card>
    </div>
  );
}

function formatMinutes(value?: number): string | undefined {
  return typeof value === "number" ? `${value} menit` : undefined;
}
