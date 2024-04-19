import { PostsListLoader } from "@/components/posts/list/loader";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCategory() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-[400px]" />
          <Skeleton className="h-5 w-[500px]" />
        </div>
      </div>
      <Separator className="my-4" />
      <PostsListLoader />
    </main>
  );
}
