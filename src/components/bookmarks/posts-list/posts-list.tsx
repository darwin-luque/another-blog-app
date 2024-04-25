import type { FC } from "react";
import { api } from "@/trpc/server";
import { PostsList } from "@/components/posts/list";

export type PostsListByBookmarkProps = {
  bookmarkId: string;
};

export const PostsListByBookmark: FC<PostsListByBookmarkProps> = async ({
  bookmarkId,
}) => {
  const data = await api.posts.listForBookmark({ bookmarkId });

  return <PostsList posts={data.items} />;
};
