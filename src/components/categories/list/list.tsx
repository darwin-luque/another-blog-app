"use client";

import { Plus } from "lucide-react";
import type { FC } from "react";
import { api } from "@/trpc/react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateCategoryModal } from "../create-modal";

export const CategoryList: FC = () => {
  const { data } = api.categories.list.useQuery({
    limit: 100, // TODO: pagination
  });

  return (
    <Dialog>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
            className="flex items-center justify-between rounded-md border p-4"
            key={category.id}
          >
            <div className="flex items-center space-x-2">
              <DynamicIcon className="h-4 w-4" name={category.icon} />
              <p className="text-sm font-medium leading-none">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <CreateCategoryModal />
    </Dialog>
  );
};
