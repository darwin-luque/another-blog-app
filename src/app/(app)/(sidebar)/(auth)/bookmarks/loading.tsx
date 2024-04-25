import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBookmarks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array<undefined>(6)].map((_, i) => (
        <Skeleton key={i} className={buttonVariants({ variant: "ghost" })} />
      ))}
    </div>
  );
}
