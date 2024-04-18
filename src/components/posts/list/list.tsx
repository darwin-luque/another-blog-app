import type { FC } from "react";
import { type api } from "@/trpc/server";
import { PostArtwork } from "../post-artwork";

export type PostsListProps = {
  posts: Awaited<ReturnType<typeof api.posts.getById>>[];
};

export const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <PostArtwork key={post.id} post={post} aspectRatio="landscape" />
      ))}
    </div>
  );
};
