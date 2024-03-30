"use client";

import { type FC } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { api as serverApi } from "@/trpc/server";
import { api } from "@/trpc/react";
import { useToast } from "../../ui/use-toast";

export type DeleteCategoryModalProps = {
  category: Awaited<
    ReturnType<typeof serverApi.categories.list>
  >["items"][number];
};

export const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
  category,
}) => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const deleteCategory = api.categories.remove.useMutation({
    onSuccess() {
      toast({
        title: "Category deleted",
        description: `Category ${category.name} has been deleted`,
      });
    },
    onError(err) {
      toast({
        title: "Failed to delete category",
        description: err.message,
        variant: "destructive",
      });
    },
    onSettled() {
      return apiUtils.categories.list.invalidate();
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Warning 🫣</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the category {category.name}? This
          action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant="destructive"
            onClick={() => deleteCategory.mutate(category.id)}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
