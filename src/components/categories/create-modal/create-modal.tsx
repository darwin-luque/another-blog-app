"use client";

import type { FC } from "react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { CategoryForm } from "../form";
import { DialogContent } from "../../ui/dialog";

export const CreateCategoryModal: FC = () => {
  const { toast } = useToast();
  const apiUtils = api.useUtils();
  const createCategory = api.categories.create.useMutation({
    onError(val1, val2, val3) {
      console.log({
        val1,
        val2,
        val3,
      });
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Could not create category. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess(_, data) {
      toast({
        title: "Category created",
        description: (
          <div className="flex items-center space-x-1">
            <p>Category {data.name}</p>
            <DynamicIcon name={data.icon} />
            <p>has been created.</p>
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
        type="create"
        onSubmit={(values) => createCategory.mutate(values)}
      />
    </DialogContent>
  );
};
