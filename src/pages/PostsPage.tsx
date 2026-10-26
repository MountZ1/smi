import { PaginatedList } from "@/components/PaginatedList";
import { PostCard, PostCardSkeleton } from "@/components/PostCard";
import { getPosts } from "@/services/postService";

export function PostsPage() {
  return (
    <PaginatedList
      title="Posts"
      description="Kumpulan postingan dari DummyJSON."
      searchPlaceholder="Cari postingan..."
      pageSize={9}
      fetcher={getPosts}
      renderItem={(post) => <PostCard post={post} />}
      renderSkeleton={() => <PostCardSkeleton />}
      gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    />
  );
}
