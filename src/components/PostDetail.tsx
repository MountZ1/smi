import type { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function PostDetail({ post }: { post: Post }) {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-semibold capitalize leading-tight tracking-tight">
        {post.title}
      </h1>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {post.body ? (
        <p className="leading-relaxed">{post.body}</p>
      ) : (
        <p className="text-muted-foreground">Postingan ini tidak memiliki isi.</p>
      )}

      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>👍 {post.reactions?.likes ?? 0}</span>
        <span>👎 {post.reactions?.dislikes ?? 0}</span>
        <span>{post.views ?? 0} dilihat</span>
      </div>
    </article>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-9 w-4/5" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
