import { Skeleton } from "@/components/ui/skeleton";

export const PostArtworkLoader = () => (
  <div className="w-full space-y-3">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="space-y-1 text-sm">
      <Skeleton className="h-5 w-full" />
    </div>
  </div>
);
