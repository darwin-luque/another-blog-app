import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPostArtwork = () => (
  <div className="w-[300px] space-y-3">
    <Skeleton className="aspect-[4/3] h-[300px] w-[300px] " />
    <div className="space-y-1 text-sm">
      <Skeleton className="h-5 w-full" />
    </div>
  </div>
);

export default function LoadingMyBlogs() {
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array<undefined>(6)].map((_, i) => (
        <SkeletonPostArtwork key={i} />
      ))}
    </div>
  );
}
