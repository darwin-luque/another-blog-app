"use client";

import { Bookmark } from "lucide-react";
import type { FC, MouseEventHandler } from "react";
import type { api as serverApi } from "@/trpc/server";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export type BookmarksMenuSubItemProps = {
  bookmark: Awaited<ReturnType<typeof serverApi.bookmarks.list>>[number];
  post: Awaited<ReturnType<typeof serverApi.posts.getById>>;
};

export const BookmarksMenuSubItem: FC<BookmarksMenuSubItemProps> = async ({
  bookmark,
  post,
}) => {
  const { toast } = useToast();
  const addToBookmark = api.bookmarks.addPost.useMutation({
    onSuccess() {
      toast({
        title: "Post added to bookmark",
        description: `${post.title} has been added to ${bookmark.name}`,
        variant: "success",
      });
    },
    onError() {
      toast({
        title: "Failed to add post to bookmark",
        description: `Failed to add ${post.title} to ${bookmark.name}`,
        variant: "destructive",
      });
    },
  });
  const onAddToBookmark: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    addToBookmark.mutate({
      bookmarkId: bookmark.id,
      postId: post.id,
    });
  };

  return (
    <ContextMenuItem onClick={onAddToBookmark} key={bookmark.id} asChild>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 hover:cursor-pointer"
        size="sm"
      >
        <Bookmark className="h-4 w-4" />
        {bookmark.name}
      </Button>
    </ContextMenuItem>
  );
};
