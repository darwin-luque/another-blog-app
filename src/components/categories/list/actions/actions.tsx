import { type FC } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { api as serverApi } from "@/trpc/server";
import { EditCategoryModal } from "../../edit-modal";

export type CategoryListElementActionsProps = {
  category: Awaited<
    ReturnType<typeof serverApi.categories.list>
  >["items"][number];
};

export const CategoryListElementActions: FC<
  CategoryListElementActionsProps
> = ({ category }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Button variant="ghost" className="w-full justify-start">
                Edit
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem asChild>
            <Button variant="ghost" className="w-full justify-start">
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCategoryModal category={category} />
    </Dialog>
  );
};
