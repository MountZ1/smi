import { Link } from "react-router";
import type { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostCard({ post }: { post: Post }) {
  const tags = post.tags?.slice(0, 4) ?? [];

  return (
    <Link to={`/auth/posts/${post.id}`} className="block h-full rounded-xl">
      <Card className="h-full gap-3 p-5 transition-shadow hover:shadow-md">
        <h2 className="font-medium capitalize leading-snug">{post.title}</h2>

        {post.body && <p className="line-clamp-4 text-sm text-muted-foreground">{post.body}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-4 pt-2 text-xs text-muted-foreground">
          <span>👍 {post.reactions?.likes ?? 0}</span>
          <span>👎 {post.reactions?.dislikes ?? 0}</span>
          <span>{post.views ?? 0} dilihat</span>
        </div>
      </Card>
    </Link>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className="gap-3 p-5">
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </Card>
  );
}
