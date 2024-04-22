import type { FC } from "react";
import { Separator } from "@/components/ui/separator";
import type { api } from "@/trpc/server";
import { PostMetadata } from "./metadata";
import { PostReaderContent } from "./content";

export type PostReaderProps = {
  post: Awaited<ReturnType<typeof api.posts.mine>>[0];
};

export const PostReader: FC<PostReaderProps> = ({ post }) => {
  return (
    <div className="mt-4 space-y-4 flex flex-col items-center">
      <h2 className="text-2xl font-semibold tracking-tight">{post.title}</h2>
      <PostMetadata post={post} />
      <Separator />
      <PostReaderContent className="flex-1 flex" content={post.content} />
    </div>
  );
};
