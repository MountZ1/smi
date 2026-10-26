import { Link } from "react-router";
import type { Recipe } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalMinutes = (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0);
  const tags = recipe.tags?.slice(0, 3) ?? [];

  const meta = [
    recipe.cuisine,
    recipe.difficulty,
    totalMinutes > 0 ? `${totalMinutes} menit` : undefined,
  ].filter(Boolean);

  return (
    <Link to={`/auth/recipes/${recipe.id}`} className="block h-full rounded-xl">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            loading="lazy"
            className="aspect-[4/3] w-full bg-muted object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted text-sm text-muted-foreground">
            Tanpa gambar
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="space-y-1">
            <h2 className="font-medium leading-snug">{recipe.name}</h2>
            {meta.length > 0 && <p className="text-xs text-muted-foreground">{meta.join(" · ")}</p>}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>
              {typeof recipe.rating === "number"
                ? `★ ${recipe.rating.toFixed(1)}`
                : "Belum ada rating"}
              {typeof recipe.reviewCount === "number" && ` (${recipe.reviewCount})`}
            </span>
            {typeof recipe.caloriesPerServing === "number" && (
              <span>{recipe.caloriesPerServing} kkal/porsi</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function RecipeCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </Card>
  );
}
