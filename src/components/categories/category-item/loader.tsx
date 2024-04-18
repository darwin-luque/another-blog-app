import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryItemLoader: FC = () => {
  return (
    <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
      <Skeleton className="mt-px h-5 w-5" />
      <div className="space-y-1">
        <Skeleton className="h-5 w-full" />
        <div className="flex items-center text-sm">
          <Skeleton className="mr-1 h-3 w-3" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
};
