import { BackLink } from "@/components/BackLink";
import { CommentList } from "@/components/CommentList";
import { DataState } from "@/components/DataState";
import { PostDetail, PostDetailSkeleton } from "@/components/PostDetail";
import { useFetch } from "@/hooks/useFetch";
import { useIdParam } from "@/hooks/useIdParam";
import { ApiError } from "@/lib/http";
import { getPostById } from "@/services/postService";

export function PostDetailPage() {
  const id = useIdParam();

  const {
    data: post,
    error,
    loading,
    retry,
  } = useFetch(
    (signal) =>
      id === null
        ? Promise.reject(new ApiError("ID postingan tidak valid."))
        : getPostById(id, signal),
    [id],
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <BackLink fallback="/auth/posts">Kembali ke daftar postingan</BackLink>

      <DataState
        loading={loading}
        error={error}
        isEmpty={!post}
        onRetry={retry}
        loadingFallback={<PostDetailSkeleton />}
        emptyTitle="Postingan tidak ditemukan"
      >
        {post && (
          <>
            <PostDetail post={post} />
            <CommentList postId={post.id} />
          </>
        )}
      </DataState>
    </div>
  );
}
