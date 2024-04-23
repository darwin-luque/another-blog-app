"use client";

import type { FC, FormEventHandler } from "react";
import {
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useToast } from "../../ui/use-toast";

export const CreateBookmarkModal: FC = () => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const createBookmark = api.bookmarks.create.useMutation({
    onSuccess() {
      toast({
        title: "Bookmark created.",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Failed to create bookmark.",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled() {
      void utils.bookmarks.list.invalidate();
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name as unknown as
      | HTMLInputElement
      | null
      | undefined;

    if (!name?.value) {
      return toast({
        title: "The name field is required.",
        description: "Please fill out the name field to create a bookmark.",
        variant: "info",
      });
    }

    createBookmark.mutate({
      name: name.value,
    });
  };

  return (
    <DialogContent className="sm:max-w-[400px]">
      <form onSubmit={onSubmit} autoComplete="off">
        <DialogHeader>
          <DialogTitle>Create a New Bookmark</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              required
              id="name"
              placeholder="Read Later"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
