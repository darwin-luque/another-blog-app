import { useState, type FC } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { api as serverApi } from "@/trpc/server";
import { EditCategoryModal } from "../../edit-modal";
import { DeleteCategoryModal } from "../../delete-modal";

export type CategoryListElementActionsProps = {
  category: Awaited<
    ReturnType<typeof serverApi.categories.list>
  >["items"][number];
};

export const CategoryListElementActions: FC<
  CategoryListElementActionsProps
> = ({ category }) => {
  const [type, setType] = useState<"edit" | "delete" | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setType(null);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
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
            <DropdownMenuItem asChild onClick={() => setType("edit")}>
              <Button variant="ghost" className="w-full justify-start">
                Edit
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem asChild onClick={() => setType("delete")}>
              <Button variant="ghost" className="w-full justify-start">
                Delete
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        {type === "edit" ? <EditCategoryModal category={category} /> : null}
        {type === "delete" ? <DeleteCategoryModal category={category} /> : null}
      </DialogContent>
    </Dialog>
  );
};
