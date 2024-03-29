"use client";

import type { FC } from "react";
import { api } from "@/trpc/react";
import type { api as serverApi } from "@/trpc/server";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { CategoryForm } from "../form";

export type EditCategoryModalProps = {
  category: Awaited<
    ReturnType<typeof serverApi.categories.list>
  >["items"][number];
};

export const EditCategoryModal: FC<EditCategoryModalProps> = ({ category }) => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const updateCategory = api.categories.update.useMutation({
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.message.substring(0, 100) ??
          `Could not update the category. Please try again.`,
        variant: "destructive",
      });
    },
    onSuccess(_, data) {
      toast({
        title: "Category updated",
        description: (
          <div className="flex items-center space-x-1">
            <p>Category {data.name}</p>
            <DynamicIcon name={data.icon ?? ""} />
            <p>has been updated.</p>
          </div>
        ),
      });
    },
    onSettled() {
      return apiUtils.categories.list.invalidate();
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <CategoryForm
        type="edit"
        initialValues={category}
        onSubmit={(values) => updateCategory.mutate({ ...category, ...values })}
      />
    </DialogContent>
  );
};
