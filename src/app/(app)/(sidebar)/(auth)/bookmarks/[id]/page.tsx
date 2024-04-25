import Link from "next/link";
import { Suspense } from "react";
import { api } from "@/trpc/server";
import { PostsListLoader } from "@/components/posts/list/loader";
import { PostsListByBookmark } from "@/components/bookmarks/posts-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type BookmarkByIdPageProps = {
  params: {
    id: string;
  };
};

export default async function BookmarkByIdPage({
  params,
}: BookmarkByIdPageProps) {
  const bookmark = await api.bookmarks.getById(params.id);
  const bookmarks = await api.bookmarks.list().catch(() => [bookmark]);

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/bookmarks">My Bookmarks</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {bookmark.name}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {bookmarks.map((bookmark) => (
                  <DropdownMenuItem key={bookmark.id} asChild>
                    <Link href={`/bookmarks/${bookmark.id}`}>
                      {bookmark.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<PostsListLoader />}>
        <PostsListByBookmark bookmarkId={bookmark.id} />
      </Suspense>
    </div>
  );
}
