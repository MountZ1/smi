import { useFetch } from "@/hooks/useFetch";
import { getPostComments } from "@/services/postService";
import { DataState } from "@/components/DataState";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CommentList({ postId }: { postId: number }) {
  const { data, error, loading, retry } = useFetch(
    (signal) => getPostComments(postId, signal),
    [postId],
  );

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Komentar{data ? ` (${data.length})` : ""}</h2>

      <DataState
        loading={loading}
        error={error}
        isEmpty={!data || data.length === 0}
        onRetry={retry}
        loadingFallback={
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Card key={index} className="gap-2 p-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-full" />
              </Card>
            ))}
          </div>
        }
        emptyTitle="Belum ada komentar"
      >
        <ul className="space-y-3">
          {data?.map((comment) => (
            <li key={comment.id}>
              <Card className="gap-1 p-4">
                <p className="text-sm font-medium">
                  {comment.user?.fullName || comment.user?.username || "Anonim"}
                </p>
                <p className="text-sm text-muted-foreground">{comment.body}</p>
                <p className="pt-1 text-xs text-muted-foreground">👍 {comment.likes ?? 0}</p>
              </Card>
            </li>
          ))}
        </ul>
      </DataState>
    </section>
  );
}
