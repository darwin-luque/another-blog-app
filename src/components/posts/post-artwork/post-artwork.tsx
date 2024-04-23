import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { type HTMLAttributes, type FC, Suspense } from "react";
import { fetchUser } from "@/lib/fetch-user";
import type { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuSub,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { BookmarksList } from "./bookmarks-list";

export type PostArtworkProps = HTMLAttributes<HTMLAnchorElement> & {
  post: Awaited<ReturnType<typeof api.posts.mine>>[0];
  aspectRatio?: "portrait" | "square" | "landscape";
  width?: number;
  height?: number;
};

export const PostArtwork: FC<PostArtworkProps> = async ({
  post,
  aspectRatio = "square",
  height = 300,
  width = 300,
  className,
  ...props
}) => {
  const user = await fetchUser(post.createdBy);

  let aspectRatioClass = "aspect-square";
  if (aspectRatio === "portrait") {
    aspectRatioClass = "aspect-[3/4]";
  } else if (aspectRatio === "landscape") {
    aspectRatioClass = "aspect-[4/3]";
  }

  return (
    <Link
      {...props}
      href={`/${post.id}`}
      className={cn("max-w-[300px] space-y-3", className)}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative overflow-hidden rounded-md">
            <Badge
              className="group group absolute left-0 top-0 z-50 space-x-2 px-1 transition-all"
              variant="secondary"
            >
              <DynamicIcon
                name={post.category.icon}
                width={16}
                height={16}
                useLoader
              />
              <p className="hidden text-xs group-hover:[display:initial]">
                {post.category.name}
              </p>
            </Badge>
            <Image
              alt={post.title}
              height={height}
              width={width}
              src={post.preview.url}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatioClass,
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Bookmark</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
                <BookmarksList post={post} />
              </Suspense>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{post.title}</h3>
        {!!user ? (
          <p className="text-xs text-muted-foreground">
            {user.first_name} {user.last_name}
          </p>
        ) : null}
      </div>
    </Link>
  );
};
