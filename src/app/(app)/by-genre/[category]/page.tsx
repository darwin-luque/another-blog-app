import { Suspense } from "react";
import { PostsListByCategory } from "@/components/categories/posts-list";
import { PostsListLoader } from "@/components/posts/list/loader";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await api.categories.getBySlug(params.category);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {category.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <Suspense fallback={<PostsListLoader />}>
        <PostsListByCategory categoryId={category.id} />
      </Suspense>
    </main>
  );
}
