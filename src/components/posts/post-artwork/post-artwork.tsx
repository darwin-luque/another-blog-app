import Link from "next/link";
import Image from "next/image";
import type { HTMLAttributes, FC } from "react";
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
  // ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { fetchUser } from "../../../lib/fetch-user";
// import { PlusCircle } from "lucide-react";

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
          <ContextMenuItem>Add to Favorites</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Bookmark</ContextMenuSubTrigger>
            {/* <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent> */}
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
          <ContextMenuSeparator />
          <p className="text-sm text-blue-500">* TBI all in this menu</p>
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
