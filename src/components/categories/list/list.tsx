"use client";

import type { FC } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { CreateCategoryModal } from "../create-modal";
import { api } from "@/trpc/react";
import { CategoryListElementActions } from "./actions";

export const CategoryList: FC = () => {
  const { data } = api.categories.list.useQuery({
    limit: 100, // TODO: pagination
  });

  return (
    <Dialog>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <DialogTrigger>
          <div className="flex items-center justify-between rounded-md border p-4">
            <div className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <p className="text-sm font-medium leading-none">
                Create a Category
              </p>
            </div>
          </div>
        </DialogTrigger>
        {data?.items.map((category) => (
          <div
            className="flex items-center justify-between rounded-md border pl-4 pr-2"
            key={category.id}
          >
            <div className="flex items-center space-x-2">
              <DynamicIcon useLoader className="h-4 w-4" name={category.icon} />
              <p className="text-sm font-medium leading-none">
                {category.name}
              </p>
            </div>
            <CategoryListElementActions />
          </div>
        ))}
      </div>
      <CreateCategoryModal />
    </Dialog>
  );
};
