import type { FC } from "react";
import { format } from "date-fns";
import type { api } from "@/trpc/server";
import { fetchUser } from "@/lib/fetch-user";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryHoverCard } from "./category-hover-card";

export type PostMetadataProps = {
  post: Awaited<ReturnType<typeof api.posts.mine>>[0];
};

export const PostMetadata: FC<PostMetadataProps> = async ({ post }) => {
  const user = await fetchUser(post.createdBy);

  return (
    <div className="flex w-full space-x-4">
      <Avatar>
        <AvatarImage src={user?.image_url} alt={user?.username ?? "guest"} />
        <AvatarFallback>
          {user?.first_name?.[0] ?? "G"}
          {user?.last_name?.[0] ?? ""}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold">
          {user?.first_name ?? "Guest"}
          {user?.last_name ?? ""}
        </span>
        <div className="flex h-5 items-center space-x-2 text-xs">
          <p className="text-gray-500">
            <span>Classified as </span>
            <CategoryHoverCard category={post.category} />
          </p>
          <Separator orientation="vertical" />
          <p className="text-gray-500">
            {format(post.createdAt, "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};
