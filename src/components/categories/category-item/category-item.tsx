import { type FC } from "react";
import { BookCopy } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { api } from "@/trpc/server";
import { parseBigNumber } from "@/lib/utils";
import Link from "next/link";

type CategoryItemProps = {
  category: Awaited<ReturnType<typeof api.categories.list>>["items"][number];
};

export const CategoryItem: FC<CategoryItemProps> = async ({ category }) => {
  const postCount = await api.categories.postsCount(category.id);

  return (
    <Link
      href={`/by-genre/${category.slug}`}
      className="flex items-start space-x-4 rounded-md border border-muted p-2 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
    >
      <DynamicIcon name={category.icon} className="mt-px h-5 w-5" />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{category.name}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <BookCopy className="mr-1 h-3 w-3" />
          {parseBigNumber(postCount)}
        </div>
      </div>
    </Link>
  );
};
