import type { ListParams, Paginated, Post, PostComment } from "@/types";
import { ApiError, buildListPath, isRecord, request } from "@/lib/http";
import { parsePaginated } from "@/lib/parse";

function isPost(value: unknown): value is Post {
  return isRecord(value) && typeof value.id === "number" && typeof value.title === "string";
}

function isComment(value: unknown): value is PostComment {
  return isRecord(value) && typeof value.id === "number" && typeof value.body === "string";
}

export async function getPosts(params: ListParams, signal?: AbortSignal): Promise<Paginated<Post>> {
  const data = await request(buildListPath("posts", params), { signal });
  return parsePaginated(data, "posts", isPost);
}

export async function getPostById(id: number, signal?: AbortSignal): Promise<Post> {
  const data = await request(`/posts/${id}`, { signal });

  if (!isPost(data)) {
    throw new ApiError("Format data postingan dari server tidak sesuai.");
  }
  return data;
}

export async function getPostComments(
  postId: number,
  signal?: AbortSignal,
): Promise<PostComment[]> {
  const data = await request(`/posts/${postId}/comments`, { signal });
  return parsePaginated(data, "comments", isComment).items;
}
